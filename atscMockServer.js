const { Server: WebSocketServer } = require('ws');

const PORT = 8889;

const methodToResponseMap = {
  'org.atsc.subscribe': {
    jsonrpc: '2.0',
    id: 1,
    result: {
      msgType: [
        'serviceChange',
        'serviceGuideChange',
        'MPDChange',
        'rmpPlaybackStateChange',
        'rmpPlaybackRateChange',
        'rmpMediaTimeChange',
      ],
    },
  },
  'org.atsc.query.deviceInfo': {
    jsonrpc: '2.0',
    id: 2,
    result: {
      advertisingId: '1d4edccd-1641-472b-ab3d-7a13332850b5',
      deviceId: 'eb4e83d9-b84f-48c3-8f79-ccca5d850ae2',
      deviceInfo: { numberOfTuners: 1, yearOfMfr: 2019 },
      deviceInput: {
        ArrowDown: 40,
        ArrowLeft: 37,
        ArrowRight: 39,
        ArrowUp: 38,
        Back: 461,
        Select: 13,
        arrowDown: 40,
        arrowLeft: 37,
        arrowRight: 39,
        arrowUp: 38,
        back: 461,
        select: 13,
      },
      deviceMake: 'samsung',
      deviceModel: 'SM-G9750',
    },
  },
  'org.atsc.query.service': { jsonrpc: '2.0', id: 3, result: { service: '::localStation:' } },

  'org.atsc.scale-position': { jsonrpc: '2.0', id: 4, result: {} },

  'org.atsc.request.keys': { jsonrpc: '2.0', id: 6, result: { accepted: [] } },

  'org.atsc.query.languages': {
    jsonrpc: '2.0',
    id: 6,
    result: { preferredAudioLang: 'en', preferredUiLang: 'en', preferredCaptionSubtitleLang: 'en' },
  },

  'org.atsc.query.rmpPlaybackState': { jsonrpc: '2.0', id: 6, result: { playbackState: 0 } },

  'org.atsc.relinquish.keys': { jsonrpc: '2.0', id: 6, result: {} },
};

const wsServerConnectionHandler = ws => {
  ws.on('close', () => console.log('BA ws client disconnected'));

  ws.on('message', incomingMessageStr => {
    console.log('received: ' + incomingMessageStr);

    const incomingMessage = JSON.parse(incomingMessageStr);
    let response = methodToResponseMap[incomingMessage.method];

    if (!response) {
      console.log(`UNKNOWN INPUT: ${incomingMessage}, responding with default empty result`);

      response = { jsonrpc: '2.0', id: 6, result: {} };
    }

    response.id = incomingMessage.id;
    ws.send(JSON.stringify(response));

    console.log('sent: ' + JSON.stringify(response));
  });
};

const atscMockServer = new WebSocketServer({ port: PORT, noServer: true });
atscMockServer.on('connection', wsServerConnectionHandler);

console.log(`Listening on port ${PORT}`);
