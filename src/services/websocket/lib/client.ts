/*
 * Copyright © 2022 Sinclair Broadcast Group
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventEmitter } from 'events';
import {
  format,
  InvalidRequest,
  JsonRpcPayload,
  JsonRpcPayloadError,
  JsonRpcPayloadNotification,
  JsonRpcPayloadRequest,
  JsonRpcPayloadResponse,
  MethodNotFound,
  parse,
} from 'json-rpc-protocol';
import { ClientOptions, ReconnectOptions } from './client.types';
import { InternalError, MaxReconnectAttemptsExceedError } from './errors';

const RESERVED_EVENTS = [
  'error',
  'open',
  'close',
  'message',
  'unexpected-response',
  'upgrade',
  'reopen',
  'protocol:error',
  'protocol:response',
  'protocol:request',
];

export class Client extends EventEmitter {
  private client?: WebSocket;

  private options: ClientOptions;

  private reconnect: ReconnectOptions;

  private requestId = 0;

  onReOpen?: () => void = undefined;

  constructor(public endpoint: string, options?: ClientOptions) {
    super();

    this.options = {
      callTimeout: 5000,
      reconnectTimeout: 5000,
      reconnectAttempts: Infinity,
      waitConnectionTimeout: 5000,
      ...options,
    };

    this.reconnect = {
      attempted: 0,
      timeoutId: null,
    };

    this.open();
  }

  open() {
    if (this.client) {
      this.emit('error', new InternalError("Client exists, can't open a new websocket connection"));

      return;
    }

    this.client = new WebSocket(this.endpoint);

    this.client.addEventListener('error', (error) => this.onError(error));
    this.client.addEventListener('open', () => this.onOpen());

    this.client.addEventListener('close', ({ code, reason }) => this.onClose(code, reason));

    this.client.addEventListener('message', (message) => this.onMessage(message));
  }

  close(code?: number, reason?: string) {
    this.cleanupReconnect();

    if (!this.client) {
      this.emit('error', new InternalError("Client missing, can't close websocket connection"));

      return;
    }

    this.client.close(code, reason);
  }

  isOpen() {
    return !!(this.client && this.client.readyState === this.client.OPEN);
  }

  call(method: string, params?: any) {
    this.requestId += 1;

    const id = this.requestId;
    let message: string;

    try {
      message = format.request(id, method, params);
    } catch (error) {
      this.emit('error', error);

      return Promise.reject(error);
    }

    return this.waitConnection().then(
      () =>
        new Promise((resolve, reject) => {
          this.client?.send(message);

          const timeout = window.setTimeout(() => {
            reject(new InternalError(`Call on method '${method}' timed out`));
          }, this.options.callTimeout);

          const protocolResponseHandler = (receivedId: number, result: any) => {
            if (receivedId === id) {
              cleanupCallEvents();
              resolve(result);
            }
          };

          const protocolErrorHandler = (receivedId: number, protocolError: any) => {
            if (receivedId === id) {
              cleanupCallEvents();
              reject(protocolError);
            }
          };

          const closeHandler = () => {
            const closeError = new InternalError(
              `Call on method ${method} failed, broken connection`
            );

            cleanupCallEvents();
            reject(closeError);
          };

          const cleanupCallEvents = () => {
            clearTimeout(timeout);

            this.removeListener('protocol:response', protocolResponseHandler);
            this.removeListener('protocol:error', protocolErrorHandler);

            this.removeListener('close', closeHandler);
          };

          this.on('protocol:response', protocolResponseHandler);
          this.on('protocol:error', protocolErrorHandler);

          this.on('close', closeHandler);
        })
    );
  }

  private waitConnection(): Promise<void> {
    if (this.isOpen()) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const handler = () => {
        clearTimeout(timeoutId);
        this.removeListener('open', handler);

        if (this.isOpen()) {
          resolve();
        } else {
          reject(new InternalError(`Client gone, can't request`));
        }
      };

      const timeoutId = window.setTimeout(handler, this.options.waitConnectionTimeout);

      this.once('open', handler);
    });
  }

  /* Client events */
  private onError(error: Event) {
    this.emit('error', error);
  }

  private onOpen() {
    this.cleanupReconnect();
    if (this.onReOpen) this.onReOpen();
    this.emit('open');
  }

  private onClose(code?: number, reason?: string) {
    delete this.client;
    this.emit('close', code, reason);
    this.performReconnect();
  }

  private onMessage(message: MessageEvent) {
    let parsedMessage;

    try {
      parsedMessage = parse(message.data);
    } catch (error) {
      this.emit('error', error);

      return;
    }

    this.handleMessage(parsedMessage as JsonRpcPayload);
  }

  /* Reconnect */

  private performReconnect() {
    if (this.reconnect.attempted >= this.options?.reconnectAttempts) {
      this.emit(
        'error',
        new MaxReconnectAttemptsExceedError('Too many failed connection attempts')
      );

      return;
    }

    this.reconnect.timeoutId = window.setTimeout(() => {
      this.reconnect.attempted += 1;

      this.emit('reopen', this.options.reconnectAttempts, this.reconnect.attempted);

      this.open();
    }, this.options.reconnectTimeout);
  }

  /* Protocol */

  private cleanupReconnect() {
    if (this.reconnect.timeoutId) {
      clearTimeout(this.reconnect.timeoutId);
    }

    this.reconnect = {
      attempted: 0,
      timeoutId: null,
    };
  }

  private handleMessage(payload: JsonRpcPayload) {
    if ('method' in payload && RESERVED_EVENTS.includes(payload.method)) {
      this.emit('error', new MethodNotFound(`Reserved method call: ${payload.method}`));

      return;
    }

    if ('method' in payload && payload.method === 'org.atsc.notify') {
      const { method, params } = payload as JsonRpcPayloadNotification;

      this.emit(method, params);

      return;
    }

    const { type } = payload;

    switch (type) {
      case 'error': {
        const { id, error } = payload as JsonRpcPayloadError;

        this.emit('protocol:error', id, error);
        break;
      }

      case 'response': {
        const { id, result } = payload as JsonRpcPayloadResponse;

        this.emit('protocol:response', id, result);
        break;
      }

      case 'request': {
        const { method, id, params } = payload as JsonRpcPayloadRequest;

        this.emit('protocol:request', method, id, params);
        break;
      }

      case 'notification': {
        const { method, params } = payload as JsonRpcPayloadNotification;

        this.emit(method, params);
        break;
      }

      default:
        this.emit('error', new InvalidRequest(`Unknown protocol message type: ${type}`));

        break;
    }
  }
}
