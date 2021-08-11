import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Alert = {
  id: Scalars['ID'];
  alertBarTitle: Scalars['String'];
  menuTitle: Scalars['String'];
  expire: Scalars['Int'];
  latestPublishTime: Scalars['Int'];
  priority: Priority;
  targets: Array<Scalars['String']>;
  pages: Array<Page>;
  eventCode: Scalars['String'];
  iconPath: Scalars['String'];
  bgColor: Scalars['String'];
};

export type AppConfig = {
  id: Scalars['ID'];
  googleAnalyticAccount?: Maybe<Scalars['String']>;
  endpoints: Endpoints;
  featureFlags: FeatureFlags;
  theme: Theme;
  privacyPolicy: Scalars['String'];
  dmaConfig: DmaConfig;
};

export type CtaTheme = {
  id: Scalars['ID'];
  activeButtonColor: Scalars['String'];
  passiveButtonColor: Scalars['String'];
  borderColor: Scalars['String'];
  backgroundColor: Scalars['String'];
  textColor: Scalars['String'];
};

export type DeviceInfo = {
  id: Scalars['ID'];
  serviceId: Scalars['String'];
  station: Scalars['String'];
  isInternetConnected: Scalars['Boolean'];
  deviceId: Scalars['String'];
  buildVersion: Scalars['String'];
  appVersion: Scalars['String'];
  deviceMake: DeviceMake;
};

export enum DeviceMake {
  Lg = 'LG',
  Default = 'DEFAULT'
}

export type DmaConfig = {
  id: Scalars['ID'];
  zipToFipsMap: Array<Maybe<ZipToFips>>;
};

export type Endpoints = {
  id: Scalars['ID'];
  latestweathercastUrl?: Maybe<Scalars['String']>;
  sevenDayForecastUrl?: Maybe<Scalars['String']>;
  feedProviderUrl?: Maybe<Scalars['String']>;
  flashChannelUrl?: Maybe<Scalars['String']>;
  newsOnDemandUrl?: Maybe<Scalars['String']>;
};

export type FeatureFlags = {
  id: Scalars['ID'];
  menuItemsDisabled: Array<Scalars['String']>;
  flashChannelEnabled?: Maybe<Scalars['Boolean']>;
  preferAEATMessages?: Maybe<Scalars['Boolean']>;
  disableAlerts?: Maybe<Scalars['Boolean']>;
};

export type FlashChannel = {
  id: Scalars['ID'];
  channelId: Scalars['String'];
  isLive: Scalars['Boolean'];
  title: Scalars['String'];
  videoUrl: Scalars['String'];
  thumbnail: Scalars['String'];
  expireTime: Scalars['Int'];
};

export type HideAlertInput = {
  latestPublishTime: Scalars['Int'];
};

export type HideFlashChannelInput = {
  channelId: Scalars['String'];
};

export type Menu = {
  id: Scalars['ID'];
  titleImage?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  titleHidden?: Maybe<Scalars['Boolean']>;
  subTitle?: Maybe<Scalars['String']>;
  showTime?: Maybe<Scalars['Boolean']>;
  headerImage?: Maybe<Scalars['String']>;
  footerImage?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  widget?: Maybe<Widget>;
  items?: Maybe<Array<Menu>>;
  selected?: Maybe<Scalars['Boolean']>;
  noItemsText?: Maybe<Scalars['String']>;
  hidden?: Maybe<Scalars['Boolean']>;
};

export type MenuTheme = {
  id: Scalars['ID'];
  backgroundColor: Scalars['String'];
  borderColor: Scalars['String'];
  selectedItemColor: Scalars['String'];
  disabledItemColor: Scalars['String'];
};

export type Metric = {
  page: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  hideAlert?: Maybe<Alert>;
  hideFlashChannel?: Maybe<FlashChannel>;
  updatePriority?: Maybe<Priority>;
  updateZip?: Maybe<Scalars['String']>;
  setChannelToReturn?: Maybe<Scalars['String']>;
  setWidget?: Maybe<Widget>;
  setMenuIsVisible?: Maybe<Scalars['Boolean']>;
  setMenuIsDisable?: Maybe<Scalars['Boolean']>;
  selectMenu?: Maybe<Menu>;
  unselectMenu?: Maybe<Menu>;
  unselectMenuItems?: Maybe<Menu>;
  selectMenuPrevious?: Maybe<Menu>;
  selectMenuNext?: Maybe<Menu>;
  selectMenuParent?: Maybe<Menu>;
  selectMenuChild?: Maybe<Menu>;
};


export type MutationHideAlertArgs = {
  alert: HideAlertInput;
};


export type MutationHideFlashChannelArgs = {
  flashChannel: HideFlashChannelInput;
};


export type MutationUpdatePriorityArgs = {
  priority: Priority;
};


export type MutationUpdateZipArgs = {
  zip?: Maybe<Scalars['String']>;
};


export type MutationSetChannelToReturnArgs = {
  station?: Maybe<Scalars['String']>;
};


export type MutationSetWidgetArgs = {
  widget?: Maybe<WidgetInput>;
};


export type MutationSetMenuIsVisibleArgs = {
  menuIsVisible?: Maybe<Scalars['Boolean']>;
};


export type MutationSetMenuIsDisableArgs = {
  menuIsDisable?: Maybe<Scalars['Boolean']>;
};


export type MutationSelectMenuArgs = {
  menuId: Scalars['ID'];
};


export type MutationUnselectMenuArgs = {
  menuId: Scalars['ID'];
};

export type Page = {
  id: Scalars['ID'];
  title: Scalars['String'];
  story: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
};

export enum Priority {
  Diagnostic = 'DIAGNOSTIC',
  NoAlerts = 'NO_ALERTS',
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
  Emergency = 'EMERGENCY'
}

/**
 * /*
 * * Copyright 2021 OpenBA-NextGenTV Contributors (https://OpenBA-NextGenTV.tech)
 * * Copyright 2021 Sinclair Broadcast Group, Inc.
 * *
 * * Licensed under the Apache License, Version 2.0 (the "License");
 * * you may not use this file except in compliance with the License.
 * * You may obtain a copy of the License at
 * *
 * *     http://www.apache.org/licenses/LICENSE-2.0
 * *
 * * Unless required by applicable law or agreed to in writing, software
 * * distributed under the License is distributed on an "AS IS" BASIS,
 * * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * * See the License for the specific language governing permissions and
 * * limitations under the License.
 * *\/
 */
export type Query = {
  zip: Scalars['String'];
  priority: Priority;
  flashChannel: FlashChannel;
  hiddenFlashChannel: Scalars['String'];
  alerts: Array<Alert>;
  hiddenAlert: Scalars['Int'];
  menu: Menu;
  menuIsVisible: Scalars['Boolean'];
  menuIsDisable: Scalars['Boolean'];
  widget?: Maybe<Widget>;
  deviceInfo: DeviceInfo;
  appConfig: AppConfig;
  stationIdToReturn: Scalars['String'];
};

export type Theme = {
  id: Scalars['ID'];
  menu: MenuTheme;
  cta: CtaTheme;
};

export type Widget = {
  id: Scalars['ID'];
  type: Scalars['String'];
  payload?: Maybe<Scalars['String']>;
  metric?: Maybe<Metric>;
};

export type WidgetInput = {
  type: Scalars['String'];
  payload?: Maybe<Scalars['String']>;
};

export type ZipToFips = {
  id: Scalars['ID'];
  fips: Scalars['String'];
};

export type GetAlertsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlertsQuery = { alerts: Array<(
    Pick<Alert, 'id' | 'alertBarTitle' | 'menuTitle' | 'expire' | 'latestPublishTime' | 'priority' | 'targets' | 'eventCode' | 'iconPath' | 'bgColor'>
    & { pages: Array<Pick<Page, 'id' | 'title' | 'story' | 'imageUrl'>> }
  )> };

export type GetHiddenAlertQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHiddenAlertQuery = Pick<Query, 'hiddenAlert'>;

export type HideAlertMutationVariables = Exact<{
  alert: HideAlertInput;
}>;


export type HideAlertMutation = { hideAlert?: Maybe<{ __typename: 'Alert' }> };

export type GetAppConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppConfigQuery = { appConfig: (
    Pick<AppConfig, 'googleAnalyticAccount' | 'privacyPolicy'>
    & { endpoints: Pick<Endpoints, 'latestweathercastUrl' | 'sevenDayForecastUrl' | 'feedProviderUrl' | 'flashChannelUrl' | 'newsOnDemandUrl'>, featureFlags: Pick<FeatureFlags, 'menuItemsDisabled' | 'preferAEATMessages' | 'disableAlerts' | 'flashChannelEnabled'>, theme: { menu: Pick<MenuTheme, 'backgroundColor' | 'borderColor' | 'selectedItemColor' | 'disabledItemColor'>, cta: Pick<CtaTheme, 'activeButtonColor' | 'passiveButtonColor' | 'borderColor' | 'backgroundColor' | 'textColor'> }, dmaConfig: { zipToFipsMap: Array<Maybe<Pick<ZipToFips, 'id' | 'fips'>>> } }
  ) };

export type GetDeviceInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeviceInfoQuery = { deviceInfo: Pick<DeviceInfo, 'id' | 'deviceId' | 'serviceId' | 'station' | 'isInternetConnected' | 'buildVersion' | 'appVersion' | 'deviceMake'> };

export type GetFlashChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFlashChannelQuery = { flashChannel: Pick<FlashChannel, 'id' | 'channelId' | 'isLive' | 'title' | 'videoUrl' | 'thumbnail' | 'expireTime'> };

export type GetHiddenFlashChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHiddenFlashChannelQuery = Pick<Query, 'hiddenFlashChannel'>;

export type HideFlashChannelMutationVariables = Exact<{
  flashChannel: HideFlashChannelInput;
}>;


export type HideFlashChannelMutation = { hideFlashChannel?: Maybe<{ __typename: 'FlashChannel' }> };

export type SetMenuIsVisibleMutationVariables = Exact<{
  menuIsVisible?: Maybe<Scalars['Boolean']>;
}>;


export type SetMenuIsVisibleMutation = Pick<Mutation, 'setMenuIsVisible'>;

export type GetMenuIsVisibleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuIsVisibleQuery = Pick<Query, 'menuIsVisible'>;

export type SetMenuIsDisableMutationVariables = Exact<{
  menuIsDisable?: Maybe<Scalars['Boolean']>;
}>;


export type SetMenuIsDisableMutation = Pick<Mutation, 'setMenuIsDisable'>;

export type GetMenuIsDisableQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuIsDisableQuery = Pick<Query, 'menuIsDisable'>;

export type GetMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuQuery = { menu: (
    Pick<Menu, 'id' | 'titleImage' | 'title' | 'titleHidden' | 'subTitle' | 'showTime' | 'headerImage' | 'footerImage' | 'thumbnail' | 'selected' | 'hidden'>
    & { widget?: Maybe<(
      Pick<Widget, 'id' | 'type' | 'payload'>
      & { metric?: Maybe<Pick<Metric, 'page' | 'title'>> }
    )>, items?: Maybe<Array<(
      Pick<Menu, 'id' | 'titleImage' | 'title' | 'titleHidden' | 'subTitle' | 'showTime' | 'headerImage' | 'footerImage' | 'thumbnail' | 'noItemsText' | 'selected' | 'hidden'>
      & { widget?: Maybe<(
        Pick<Widget, 'id' | 'type' | 'payload'>
        & { metric?: Maybe<Pick<Metric, 'page' | 'title'>> }
      )>, items?: Maybe<Array<(
        Pick<Menu, 'id' | 'titleImage' | 'title' | 'titleHidden' | 'subTitle' | 'showTime' | 'headerImage' | 'footerImage' | 'thumbnail' | 'selected' | 'hidden'>
        & { widget?: Maybe<(
          Pick<Widget, 'id' | 'type' | 'payload'>
          & { metric?: Maybe<Pick<Metric, 'page' | 'title'>> }
        )>, items?: Maybe<Array<(
          Pick<Menu, 'id' | 'titleImage' | 'title' | 'titleHidden' | 'subTitle' | 'showTime' | 'headerImage' | 'footerImage' | 'thumbnail' | 'selected' | 'hidden'>
          & { widget?: Maybe<(
            Pick<Widget, 'id' | 'type' | 'payload'>
            & { metric?: Maybe<Pick<Metric, 'page' | 'title'>> }
          )> }
        )>> }
      )>> }
    )>> }
  ) };

export type SelectMenuMutationVariables = Exact<{
  menuId: Scalars['ID'];
}>;


export type SelectMenuMutation = { selectMenu?: Maybe<{ __typename: 'Menu' }> };

export type UnselectMenuMutationVariables = Exact<{
  menuId: Scalars['ID'];
}>;


export type UnselectMenuMutation = { unselectMenu?: Maybe<{ __typename: 'Menu' }> };

export type UnselectMenuItemsMutationVariables = Exact<{ [key: string]: never; }>;


export type UnselectMenuItemsMutation = { unselectMenuItems?: Maybe<{ __typename: 'Menu' }> };

export type SelectMenuNextMutationVariables = Exact<{ [key: string]: never; }>;


export type SelectMenuNextMutation = { selectMenuNext?: Maybe<{ __typename: 'Menu' }> };

export type SelectMenuPreviousMutationVariables = Exact<{ [key: string]: never; }>;


export type SelectMenuPreviousMutation = { selectMenuPrevious?: Maybe<{ __typename: 'Menu' }> };

export type SelectMenuParentMutationVariables = Exact<{ [key: string]: never; }>;


export type SelectMenuParentMutation = { selectMenuParent?: Maybe<{ __typename: 'Menu' }> };

export type SelectMenuChildMutationVariables = Exact<{ [key: string]: never; }>;


export type SelectMenuChildMutation = { selectMenuChild?: Maybe<{ __typename: 'Menu' }> };

export type GetOtaRadioQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOtaRadioQuery = Pick<Query, 'stationIdToReturn'>;

export type SetStationMutationVariables = Exact<{
  station: Scalars['String'];
}>;


export type SetStationMutation = Pick<Mutation, 'setChannelToReturn'>;

export type GetPriorityQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriorityQuery = Pick<Query, 'priority'>;

export type UpdatePriorityMutationVariables = Exact<{
  priority: Priority;
}>;


export type UpdatePriorityMutation = Pick<Mutation, 'updatePriority'>;

export type GetWidgetQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWidgetQuery = { widget?: Maybe<(
    Pick<Widget, 'id' | 'type' | 'payload'>
    & { metric?: Maybe<Pick<Metric, 'page' | 'title'>> }
  )> };

export type GetNowWatchingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNowWatchingQuery = (
  Pick<Query, 'menuIsVisible'>
  & { widget?: Maybe<Pick<Widget, 'type' | 'payload'>> }
);

export type SetWidgetMutationVariables = Exact<{
  widget?: Maybe<WidgetInput>;
}>;


export type SetWidgetMutation = { setWidget?: Maybe<{ __typename: 'Widget' }> };

export type ZipQueryVariables = Exact<{ [key: string]: never; }>;


export type ZipQuery = Pick<Query, 'zip'>;

export type UpdateZipMutationVariables = Exact<{
  zip?: Maybe<Scalars['String']>;
}>;


export type UpdateZipMutation = Pick<Mutation, 'updateZip'>;


export const GetAlertsDocument = gql`
    query getAlerts {
  alerts @client {
    id
    alertBarTitle
    menuTitle
    expire
    latestPublishTime
    priority
    targets
    eventCode
    iconPath
    bgColor
    pages {
      id
      title
      story
      imageUrl
    }
  }
}
    `;

/**
 * __useGetAlertsQuery__
 *
 * To run a query within a React component, call `useGetAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlertsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAlertsQuery(baseOptions?: Apollo.QueryHookOptions<GetAlertsQuery, GetAlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlertsQuery, GetAlertsQueryVariables>(GetAlertsDocument, options);
      }
export function useGetAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlertsQuery, GetAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlertsQuery, GetAlertsQueryVariables>(GetAlertsDocument, options);
        }
export type GetAlertsQueryHookResult = ReturnType<typeof useGetAlertsQuery>;
export type GetAlertsLazyQueryHookResult = ReturnType<typeof useGetAlertsLazyQuery>;
export type GetAlertsQueryResult = Apollo.QueryResult<GetAlertsQuery, GetAlertsQueryVariables>;
export const GetHiddenAlertDocument = gql`
    query getHiddenAlert {
  hiddenAlert @client
}
    `;

/**
 * __useGetHiddenAlertQuery__
 *
 * To run a query within a React component, call `useGetHiddenAlertQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHiddenAlertQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHiddenAlertQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHiddenAlertQuery(baseOptions?: Apollo.QueryHookOptions<GetHiddenAlertQuery, GetHiddenAlertQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHiddenAlertQuery, GetHiddenAlertQueryVariables>(GetHiddenAlertDocument, options);
      }
export function useGetHiddenAlertLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHiddenAlertQuery, GetHiddenAlertQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHiddenAlertQuery, GetHiddenAlertQueryVariables>(GetHiddenAlertDocument, options);
        }
export type GetHiddenAlertQueryHookResult = ReturnType<typeof useGetHiddenAlertQuery>;
export type GetHiddenAlertLazyQueryHookResult = ReturnType<typeof useGetHiddenAlertLazyQuery>;
export type GetHiddenAlertQueryResult = Apollo.QueryResult<GetHiddenAlertQuery, GetHiddenAlertQueryVariables>;
export const HideAlertDocument = gql`
    mutation hideAlert($alert: HideAlertInput!) {
  hideAlert(alert: $alert) @client {
    __typename
  }
}
    `;
export type HideAlertMutationFn = Apollo.MutationFunction<HideAlertMutation, HideAlertMutationVariables>;

/**
 * __useHideAlertMutation__
 *
 * To run a mutation, you first call `useHideAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHideAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hideAlertMutation, { data, loading, error }] = useHideAlertMutation({
 *   variables: {
 *      alert: // value for 'alert'
 *   },
 * });
 */
export function useHideAlertMutation(baseOptions?: Apollo.MutationHookOptions<HideAlertMutation, HideAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HideAlertMutation, HideAlertMutationVariables>(HideAlertDocument, options);
      }
export type HideAlertMutationHookResult = ReturnType<typeof useHideAlertMutation>;
export type HideAlertMutationResult = Apollo.MutationResult<HideAlertMutation>;
export type HideAlertMutationOptions = Apollo.BaseMutationOptions<HideAlertMutation, HideAlertMutationVariables>;
export const GetAppConfigDocument = gql`
    query getAppConfig {
  appConfig @client {
    googleAnalyticAccount
    endpoints {
      latestweathercastUrl
      sevenDayForecastUrl
      feedProviderUrl
      flashChannelUrl
      newsOnDemandUrl
    }
    featureFlags {
      menuItemsDisabled
      preferAEATMessages
      disableAlerts
      flashChannelEnabled
    }
    theme {
      menu {
        backgroundColor
        borderColor
        selectedItemColor
        disabledItemColor
      }
      cta {
        activeButtonColor
        passiveButtonColor
        borderColor
        backgroundColor
        textColor
      }
    }
    privacyPolicy
    dmaConfig {
      zipToFipsMap {
        id
        fips
      }
    }
  }
}
    `;

/**
 * __useGetAppConfigQuery__
 *
 * To run a query within a React component, call `useGetAppConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppConfigQuery(baseOptions?: Apollo.QueryHookOptions<GetAppConfigQuery, GetAppConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppConfigQuery, GetAppConfigQueryVariables>(GetAppConfigDocument, options);
      }
export function useGetAppConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppConfigQuery, GetAppConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppConfigQuery, GetAppConfigQueryVariables>(GetAppConfigDocument, options);
        }
export type GetAppConfigQueryHookResult = ReturnType<typeof useGetAppConfigQuery>;
export type GetAppConfigLazyQueryHookResult = ReturnType<typeof useGetAppConfigLazyQuery>;
export type GetAppConfigQueryResult = Apollo.QueryResult<GetAppConfigQuery, GetAppConfigQueryVariables>;
export const GetDeviceInfoDocument = gql`
    query getDeviceInfo {
  deviceInfo @client {
    id
    deviceId
    serviceId
    station
    isInternetConnected
    buildVersion
    appVersion
    deviceMake
  }
}
    `;

/**
 * __useGetDeviceInfoQuery__
 *
 * To run a query within a React component, call `useGetDeviceInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeviceInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetDeviceInfoQuery, GetDeviceInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceInfoQuery, GetDeviceInfoQueryVariables>(GetDeviceInfoDocument, options);
      }
export function useGetDeviceInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceInfoQuery, GetDeviceInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceInfoQuery, GetDeviceInfoQueryVariables>(GetDeviceInfoDocument, options);
        }
export type GetDeviceInfoQueryHookResult = ReturnType<typeof useGetDeviceInfoQuery>;
export type GetDeviceInfoLazyQueryHookResult = ReturnType<typeof useGetDeviceInfoLazyQuery>;
export type GetDeviceInfoQueryResult = Apollo.QueryResult<GetDeviceInfoQuery, GetDeviceInfoQueryVariables>;
export const GetFlashChannelDocument = gql`
    query getFlashChannel {
  flashChannel @client {
    id
    channelId
    isLive
    title
    videoUrl
    thumbnail
    expireTime
  }
}
    `;

/**
 * __useGetFlashChannelQuery__
 *
 * To run a query within a React component, call `useGetFlashChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlashChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlashChannelQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFlashChannelQuery(baseOptions?: Apollo.QueryHookOptions<GetFlashChannelQuery, GetFlashChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFlashChannelQuery, GetFlashChannelQueryVariables>(GetFlashChannelDocument, options);
      }
export function useGetFlashChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFlashChannelQuery, GetFlashChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFlashChannelQuery, GetFlashChannelQueryVariables>(GetFlashChannelDocument, options);
        }
export type GetFlashChannelQueryHookResult = ReturnType<typeof useGetFlashChannelQuery>;
export type GetFlashChannelLazyQueryHookResult = ReturnType<typeof useGetFlashChannelLazyQuery>;
export type GetFlashChannelQueryResult = Apollo.QueryResult<GetFlashChannelQuery, GetFlashChannelQueryVariables>;
export const GetHiddenFlashChannelDocument = gql`
    query getHiddenFlashChannel {
  hiddenFlashChannel @client
}
    `;

/**
 * __useGetHiddenFlashChannelQuery__
 *
 * To run a query within a React component, call `useGetHiddenFlashChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHiddenFlashChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHiddenFlashChannelQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHiddenFlashChannelQuery(baseOptions?: Apollo.QueryHookOptions<GetHiddenFlashChannelQuery, GetHiddenFlashChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHiddenFlashChannelQuery, GetHiddenFlashChannelQueryVariables>(GetHiddenFlashChannelDocument, options);
      }
export function useGetHiddenFlashChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHiddenFlashChannelQuery, GetHiddenFlashChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHiddenFlashChannelQuery, GetHiddenFlashChannelQueryVariables>(GetHiddenFlashChannelDocument, options);
        }
export type GetHiddenFlashChannelQueryHookResult = ReturnType<typeof useGetHiddenFlashChannelQuery>;
export type GetHiddenFlashChannelLazyQueryHookResult = ReturnType<typeof useGetHiddenFlashChannelLazyQuery>;
export type GetHiddenFlashChannelQueryResult = Apollo.QueryResult<GetHiddenFlashChannelQuery, GetHiddenFlashChannelQueryVariables>;
export const HideFlashChannelDocument = gql`
    mutation hideFlashChannel($flashChannel: HideFlashChannelInput!) {
  hideFlashChannel(flashChannel: $flashChannel) @client {
    __typename
  }
}
    `;
export type HideFlashChannelMutationFn = Apollo.MutationFunction<HideFlashChannelMutation, HideFlashChannelMutationVariables>;

/**
 * __useHideFlashChannelMutation__
 *
 * To run a mutation, you first call `useHideFlashChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHideFlashChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hideFlashChannelMutation, { data, loading, error }] = useHideFlashChannelMutation({
 *   variables: {
 *      flashChannel: // value for 'flashChannel'
 *   },
 * });
 */
export function useHideFlashChannelMutation(baseOptions?: Apollo.MutationHookOptions<HideFlashChannelMutation, HideFlashChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HideFlashChannelMutation, HideFlashChannelMutationVariables>(HideFlashChannelDocument, options);
      }
export type HideFlashChannelMutationHookResult = ReturnType<typeof useHideFlashChannelMutation>;
export type HideFlashChannelMutationResult = Apollo.MutationResult<HideFlashChannelMutation>;
export type HideFlashChannelMutationOptions = Apollo.BaseMutationOptions<HideFlashChannelMutation, HideFlashChannelMutationVariables>;
export const SetMenuIsVisibleDocument = gql`
    mutation setMenuIsVisible($menuIsVisible: Boolean) {
  setMenuIsVisible(menuIsVisible: $menuIsVisible) @client
}
    `;
export type SetMenuIsVisibleMutationFn = Apollo.MutationFunction<SetMenuIsVisibleMutation, SetMenuIsVisibleMutationVariables>;

/**
 * __useSetMenuIsVisibleMutation__
 *
 * To run a mutation, you first call `useSetMenuIsVisibleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMenuIsVisibleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMenuIsVisibleMutation, { data, loading, error }] = useSetMenuIsVisibleMutation({
 *   variables: {
 *      menuIsVisible: // value for 'menuIsVisible'
 *   },
 * });
 */
export function useSetMenuIsVisibleMutation(baseOptions?: Apollo.MutationHookOptions<SetMenuIsVisibleMutation, SetMenuIsVisibleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetMenuIsVisibleMutation, SetMenuIsVisibleMutationVariables>(SetMenuIsVisibleDocument, options);
      }
export type SetMenuIsVisibleMutationHookResult = ReturnType<typeof useSetMenuIsVisibleMutation>;
export type SetMenuIsVisibleMutationResult = Apollo.MutationResult<SetMenuIsVisibleMutation>;
export type SetMenuIsVisibleMutationOptions = Apollo.BaseMutationOptions<SetMenuIsVisibleMutation, SetMenuIsVisibleMutationVariables>;
export const GetMenuIsVisibleDocument = gql`
    query getMenuIsVisible {
  menuIsVisible @client
}
    `;

/**
 * __useGetMenuIsVisibleQuery__
 *
 * To run a query within a React component, call `useGetMenuIsVisibleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuIsVisibleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuIsVisibleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenuIsVisibleQuery(baseOptions?: Apollo.QueryHookOptions<GetMenuIsVisibleQuery, GetMenuIsVisibleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuIsVisibleQuery, GetMenuIsVisibleQueryVariables>(GetMenuIsVisibleDocument, options);
      }
export function useGetMenuIsVisibleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuIsVisibleQuery, GetMenuIsVisibleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuIsVisibleQuery, GetMenuIsVisibleQueryVariables>(GetMenuIsVisibleDocument, options);
        }
export type GetMenuIsVisibleQueryHookResult = ReturnType<typeof useGetMenuIsVisibleQuery>;
export type GetMenuIsVisibleLazyQueryHookResult = ReturnType<typeof useGetMenuIsVisibleLazyQuery>;
export type GetMenuIsVisibleQueryResult = Apollo.QueryResult<GetMenuIsVisibleQuery, GetMenuIsVisibleQueryVariables>;
export const SetMenuIsDisableDocument = gql`
    mutation setMenuIsDisable($menuIsDisable: Boolean) {
  setMenuIsDisable(menuIsDisable: $menuIsDisable) @client
}
    `;
export type SetMenuIsDisableMutationFn = Apollo.MutationFunction<SetMenuIsDisableMutation, SetMenuIsDisableMutationVariables>;

/**
 * __useSetMenuIsDisableMutation__
 *
 * To run a mutation, you first call `useSetMenuIsDisableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMenuIsDisableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMenuIsDisableMutation, { data, loading, error }] = useSetMenuIsDisableMutation({
 *   variables: {
 *      menuIsDisable: // value for 'menuIsDisable'
 *   },
 * });
 */
export function useSetMenuIsDisableMutation(baseOptions?: Apollo.MutationHookOptions<SetMenuIsDisableMutation, SetMenuIsDisableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetMenuIsDisableMutation, SetMenuIsDisableMutationVariables>(SetMenuIsDisableDocument, options);
      }
export type SetMenuIsDisableMutationHookResult = ReturnType<typeof useSetMenuIsDisableMutation>;
export type SetMenuIsDisableMutationResult = Apollo.MutationResult<SetMenuIsDisableMutation>;
export type SetMenuIsDisableMutationOptions = Apollo.BaseMutationOptions<SetMenuIsDisableMutation, SetMenuIsDisableMutationVariables>;
export const GetMenuIsDisableDocument = gql`
    query getMenuIsDisable {
  menuIsDisable @client
}
    `;

/**
 * __useGetMenuIsDisableQuery__
 *
 * To run a query within a React component, call `useGetMenuIsDisableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuIsDisableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuIsDisableQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenuIsDisableQuery(baseOptions?: Apollo.QueryHookOptions<GetMenuIsDisableQuery, GetMenuIsDisableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuIsDisableQuery, GetMenuIsDisableQueryVariables>(GetMenuIsDisableDocument, options);
      }
export function useGetMenuIsDisableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuIsDisableQuery, GetMenuIsDisableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuIsDisableQuery, GetMenuIsDisableQueryVariables>(GetMenuIsDisableDocument, options);
        }
export type GetMenuIsDisableQueryHookResult = ReturnType<typeof useGetMenuIsDisableQuery>;
export type GetMenuIsDisableLazyQueryHookResult = ReturnType<typeof useGetMenuIsDisableLazyQuery>;
export type GetMenuIsDisableQueryResult = Apollo.QueryResult<GetMenuIsDisableQuery, GetMenuIsDisableQueryVariables>;
export const GetMenuDocument = gql`
    query getMenu {
  menu @client {
    id
    titleImage
    title
    titleHidden
    subTitle
    showTime
    headerImage
    footerImage
    thumbnail
    widget {
      id
      type
      payload
      metric {
        page
        title
      }
    }
    selected
    hidden
    items {
      id
      titleImage
      title
      titleHidden
      subTitle
      showTime
      headerImage
      footerImage
      thumbnail
      noItemsText
      widget {
        id
        type
        payload
        metric {
          page
          title
        }
      }
      selected
      hidden
      items {
        id
        titleImage
        title
        titleHidden
        subTitle
        showTime
        headerImage
        footerImage
        thumbnail
        widget {
          id
          type
          payload
          metric {
            page
            title
          }
        }
        selected
        hidden
        items {
          id
          titleImage
          title
          titleHidden
          subTitle
          showTime
          headerImage
          footerImage
          thumbnail
          widget {
            id
            type
            payload
            metric {
              page
              title
            }
          }
          selected
          hidden
        }
      }
    }
  }
}
    `;

/**
 * __useGetMenuQuery__
 *
 * To run a query within a React component, call `useGetMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenuQuery(baseOptions?: Apollo.QueryHookOptions<GetMenuQuery, GetMenuQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, options);
      }
export function useGetMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuQuery, GetMenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, options);
        }
export type GetMenuQueryHookResult = ReturnType<typeof useGetMenuQuery>;
export type GetMenuLazyQueryHookResult = ReturnType<typeof useGetMenuLazyQuery>;
export type GetMenuQueryResult = Apollo.QueryResult<GetMenuQuery, GetMenuQueryVariables>;
export const SelectMenuDocument = gql`
    mutation selectMenu($menuId: ID!) {
  selectMenu(menuId: $menuId) @client {
    __typename
  }
}
    `;
export type SelectMenuMutationFn = Apollo.MutationFunction<SelectMenuMutation, SelectMenuMutationVariables>;

/**
 * __useSelectMenuMutation__
 *
 * To run a mutation, you first call `useSelectMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectMenuMutation, { data, loading, error }] = useSelectMenuMutation({
 *   variables: {
 *      menuId: // value for 'menuId'
 *   },
 * });
 */
export function useSelectMenuMutation(baseOptions?: Apollo.MutationHookOptions<SelectMenuMutation, SelectMenuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SelectMenuMutation, SelectMenuMutationVariables>(SelectMenuDocument, options);
      }
export type SelectMenuMutationHookResult = ReturnType<typeof useSelectMenuMutation>;
export type SelectMenuMutationResult = Apollo.MutationResult<SelectMenuMutation>;
export type SelectMenuMutationOptions = Apollo.BaseMutationOptions<SelectMenuMutation, SelectMenuMutationVariables>;
export const UnselectMenuDocument = gql`
    mutation unselectMenu($menuId: ID!) {
  unselectMenu(menuId: $menuId) @client {
    __typename
  }
}
    `;
export type UnselectMenuMutationFn = Apollo.MutationFunction<UnselectMenuMutation, UnselectMenuMutationVariables>;

/**
 * __useUnselectMenuMutation__
 *
 * To run a mutation, you first call `useUnselectMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnselectMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unselectMenuMutation, { data, loading, error }] = useUnselectMenuMutation({
 *   variables: {
 *      menuId: // value for 'menuId'
 *   },
 * });
 */
export function useUnselectMenuMutation(baseOptions?: Apollo.MutationHookOptions<UnselectMenuMutation, UnselectMenuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnselectMenuMutation, UnselectMenuMutationVariables>(UnselectMenuDocument, options);
      }
export type UnselectMenuMutationHookResult = ReturnType<typeof useUnselectMenuMutation>;
export type UnselectMenuMutationResult = Apollo.MutationResult<UnselectMenuMutation>;
export type UnselectMenuMutationOptions = Apollo.BaseMutationOptions<UnselectMenuMutation, UnselectMenuMutationVariables>;
export const UnselectMenuItemsDocument = gql`
    mutation unselectMenuItems {
  unselectMenuItems @client {
    __typename
  }
}
    `;
export type UnselectMenuItemsMutationFn = Apollo.MutationFunction<UnselectMenuItemsMutation, UnselectMenuItemsMutationVariables>;

/**
 * __useUnselectMenuItemsMutation__
 *
 * To run a mutation, you first call `useUnselectMenuItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnselectMenuItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unselectMenuItemsMutation, { data, loading, error }] = useUnselectMenuItemsMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnselectMenuItemsMutation(baseOptions?: Apollo.MutationHookOptions<UnselectMenuItemsMutation, UnselectMenuItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnselectMenuItemsMutation, UnselectMenuItemsMutationVariables>(UnselectMenuItemsDocument, options);
      }
export type UnselectMenuItemsMutationHookResult = ReturnType<typeof useUnselectMenuItemsMutation>;
export type UnselectMenuItemsMutationResult = Apollo.MutationResult<UnselectMenuItemsMutation>;
export type UnselectMenuItemsMutationOptions = Apollo.BaseMutationOptions<UnselectMenuItemsMutation, UnselectMenuItemsMutationVariables>;
export const SelectMenuNextDocument = gql`
    mutation selectMenuNext {
  selectMenuNext @client {
    __typename
  }
}
    `;
export type SelectMenuNextMutationFn = Apollo.MutationFunction<SelectMenuNextMutation, SelectMenuNextMutationVariables>;

/**
 * __useSelectMenuNextMutation__
 *
 * To run a mutation, you first call `useSelectMenuNextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectMenuNextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectMenuNextMutation, { data, loading, error }] = useSelectMenuNextMutation({
 *   variables: {
 *   },
 * });
 */
export function useSelectMenuNextMutation(baseOptions?: Apollo.MutationHookOptions<SelectMenuNextMutation, SelectMenuNextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SelectMenuNextMutation, SelectMenuNextMutationVariables>(SelectMenuNextDocument, options);
      }
export type SelectMenuNextMutationHookResult = ReturnType<typeof useSelectMenuNextMutation>;
export type SelectMenuNextMutationResult = Apollo.MutationResult<SelectMenuNextMutation>;
export type SelectMenuNextMutationOptions = Apollo.BaseMutationOptions<SelectMenuNextMutation, SelectMenuNextMutationVariables>;
export const SelectMenuPreviousDocument = gql`
    mutation selectMenuPrevious {
  selectMenuPrevious @client {
    __typename
  }
}
    `;
export type SelectMenuPreviousMutationFn = Apollo.MutationFunction<SelectMenuPreviousMutation, SelectMenuPreviousMutationVariables>;

/**
 * __useSelectMenuPreviousMutation__
 *
 * To run a mutation, you first call `useSelectMenuPreviousMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectMenuPreviousMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectMenuPreviousMutation, { data, loading, error }] = useSelectMenuPreviousMutation({
 *   variables: {
 *   },
 * });
 */
export function useSelectMenuPreviousMutation(baseOptions?: Apollo.MutationHookOptions<SelectMenuPreviousMutation, SelectMenuPreviousMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SelectMenuPreviousMutation, SelectMenuPreviousMutationVariables>(SelectMenuPreviousDocument, options);
      }
export type SelectMenuPreviousMutationHookResult = ReturnType<typeof useSelectMenuPreviousMutation>;
export type SelectMenuPreviousMutationResult = Apollo.MutationResult<SelectMenuPreviousMutation>;
export type SelectMenuPreviousMutationOptions = Apollo.BaseMutationOptions<SelectMenuPreviousMutation, SelectMenuPreviousMutationVariables>;
export const SelectMenuParentDocument = gql`
    mutation selectMenuParent {
  selectMenuParent @client {
    __typename
  }
}
    `;
export type SelectMenuParentMutationFn = Apollo.MutationFunction<SelectMenuParentMutation, SelectMenuParentMutationVariables>;

/**
 * __useSelectMenuParentMutation__
 *
 * To run a mutation, you first call `useSelectMenuParentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectMenuParentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectMenuParentMutation, { data, loading, error }] = useSelectMenuParentMutation({
 *   variables: {
 *   },
 * });
 */
export function useSelectMenuParentMutation(baseOptions?: Apollo.MutationHookOptions<SelectMenuParentMutation, SelectMenuParentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SelectMenuParentMutation, SelectMenuParentMutationVariables>(SelectMenuParentDocument, options);
      }
export type SelectMenuParentMutationHookResult = ReturnType<typeof useSelectMenuParentMutation>;
export type SelectMenuParentMutationResult = Apollo.MutationResult<SelectMenuParentMutation>;
export type SelectMenuParentMutationOptions = Apollo.BaseMutationOptions<SelectMenuParentMutation, SelectMenuParentMutationVariables>;
export const SelectMenuChildDocument = gql`
    mutation selectMenuChild {
  selectMenuChild @client {
    __typename
  }
}
    `;
export type SelectMenuChildMutationFn = Apollo.MutationFunction<SelectMenuChildMutation, SelectMenuChildMutationVariables>;

/**
 * __useSelectMenuChildMutation__
 *
 * To run a mutation, you first call `useSelectMenuChildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectMenuChildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectMenuChildMutation, { data, loading, error }] = useSelectMenuChildMutation({
 *   variables: {
 *   },
 * });
 */
export function useSelectMenuChildMutation(baseOptions?: Apollo.MutationHookOptions<SelectMenuChildMutation, SelectMenuChildMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SelectMenuChildMutation, SelectMenuChildMutationVariables>(SelectMenuChildDocument, options);
      }
export type SelectMenuChildMutationHookResult = ReturnType<typeof useSelectMenuChildMutation>;
export type SelectMenuChildMutationResult = Apollo.MutationResult<SelectMenuChildMutation>;
export type SelectMenuChildMutationOptions = Apollo.BaseMutationOptions<SelectMenuChildMutation, SelectMenuChildMutationVariables>;
export const GetOtaRadioDocument = gql`
    query getOtaRadio {
  stationIdToReturn @client
}
    `;

/**
 * __useGetOtaRadioQuery__
 *
 * To run a query within a React component, call `useGetOtaRadioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOtaRadioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOtaRadioQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOtaRadioQuery(baseOptions?: Apollo.QueryHookOptions<GetOtaRadioQuery, GetOtaRadioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOtaRadioQuery, GetOtaRadioQueryVariables>(GetOtaRadioDocument, options);
      }
export function useGetOtaRadioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOtaRadioQuery, GetOtaRadioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOtaRadioQuery, GetOtaRadioQueryVariables>(GetOtaRadioDocument, options);
        }
export type GetOtaRadioQueryHookResult = ReturnType<typeof useGetOtaRadioQuery>;
export type GetOtaRadioLazyQueryHookResult = ReturnType<typeof useGetOtaRadioLazyQuery>;
export type GetOtaRadioQueryResult = Apollo.QueryResult<GetOtaRadioQuery, GetOtaRadioQueryVariables>;
export const SetStationDocument = gql`
    mutation setStation($station: String!) {
  setChannelToReturn(station: $station) @client
}
    `;
export type SetStationMutationFn = Apollo.MutationFunction<SetStationMutation, SetStationMutationVariables>;

/**
 * __useSetStationMutation__
 *
 * To run a mutation, you first call `useSetStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStationMutation, { data, loading, error }] = useSetStationMutation({
 *   variables: {
 *      station: // value for 'station'
 *   },
 * });
 */
export function useSetStationMutation(baseOptions?: Apollo.MutationHookOptions<SetStationMutation, SetStationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetStationMutation, SetStationMutationVariables>(SetStationDocument, options);
      }
export type SetStationMutationHookResult = ReturnType<typeof useSetStationMutation>;
export type SetStationMutationResult = Apollo.MutationResult<SetStationMutation>;
export type SetStationMutationOptions = Apollo.BaseMutationOptions<SetStationMutation, SetStationMutationVariables>;
export const GetPriorityDocument = gql`
    query getPriority {
  priority @client
}
    `;

/**
 * __useGetPriorityQuery__
 *
 * To run a query within a React component, call `useGetPriorityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriorityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriorityQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriorityQuery(baseOptions?: Apollo.QueryHookOptions<GetPriorityQuery, GetPriorityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPriorityQuery, GetPriorityQueryVariables>(GetPriorityDocument, options);
      }
export function useGetPriorityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPriorityQuery, GetPriorityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPriorityQuery, GetPriorityQueryVariables>(GetPriorityDocument, options);
        }
export type GetPriorityQueryHookResult = ReturnType<typeof useGetPriorityQuery>;
export type GetPriorityLazyQueryHookResult = ReturnType<typeof useGetPriorityLazyQuery>;
export type GetPriorityQueryResult = Apollo.QueryResult<GetPriorityQuery, GetPriorityQueryVariables>;
export const UpdatePriorityDocument = gql`
    mutation updatePriority($priority: Priority!) {
  updatePriority(priority: $priority) @client
}
    `;
export type UpdatePriorityMutationFn = Apollo.MutationFunction<UpdatePriorityMutation, UpdatePriorityMutationVariables>;

/**
 * __useUpdatePriorityMutation__
 *
 * To run a mutation, you first call `useUpdatePriorityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePriorityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePriorityMutation, { data, loading, error }] = useUpdatePriorityMutation({
 *   variables: {
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useUpdatePriorityMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePriorityMutation, UpdatePriorityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePriorityMutation, UpdatePriorityMutationVariables>(UpdatePriorityDocument, options);
      }
export type UpdatePriorityMutationHookResult = ReturnType<typeof useUpdatePriorityMutation>;
export type UpdatePriorityMutationResult = Apollo.MutationResult<UpdatePriorityMutation>;
export type UpdatePriorityMutationOptions = Apollo.BaseMutationOptions<UpdatePriorityMutation, UpdatePriorityMutationVariables>;
export const GetWidgetDocument = gql`
    query getWidget {
  widget @client {
    id
    type
    payload
    metric {
      page
      title
    }
  }
}
    `;

/**
 * __useGetWidgetQuery__
 *
 * To run a query within a React component, call `useGetWidgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWidgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWidgetQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWidgetQuery(baseOptions?: Apollo.QueryHookOptions<GetWidgetQuery, GetWidgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWidgetQuery, GetWidgetQueryVariables>(GetWidgetDocument, options);
      }
export function useGetWidgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWidgetQuery, GetWidgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWidgetQuery, GetWidgetQueryVariables>(GetWidgetDocument, options);
        }
export type GetWidgetQueryHookResult = ReturnType<typeof useGetWidgetQuery>;
export type GetWidgetLazyQueryHookResult = ReturnType<typeof useGetWidgetLazyQuery>;
export type GetWidgetQueryResult = Apollo.QueryResult<GetWidgetQuery, GetWidgetQueryVariables>;
export const GetNowWatchingDocument = gql`
    query getNowWatching {
  widget @client {
    type
    payload
  }
  menuIsVisible @client
}
    `;

/**
 * __useGetNowWatchingQuery__
 *
 * To run a query within a React component, call `useGetNowWatchingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNowWatchingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNowWatchingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNowWatchingQuery(baseOptions?: Apollo.QueryHookOptions<GetNowWatchingQuery, GetNowWatchingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNowWatchingQuery, GetNowWatchingQueryVariables>(GetNowWatchingDocument, options);
      }
export function useGetNowWatchingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNowWatchingQuery, GetNowWatchingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNowWatchingQuery, GetNowWatchingQueryVariables>(GetNowWatchingDocument, options);
        }
export type GetNowWatchingQueryHookResult = ReturnType<typeof useGetNowWatchingQuery>;
export type GetNowWatchingLazyQueryHookResult = ReturnType<typeof useGetNowWatchingLazyQuery>;
export type GetNowWatchingQueryResult = Apollo.QueryResult<GetNowWatchingQuery, GetNowWatchingQueryVariables>;
export const SetWidgetDocument = gql`
    mutation setWidget($widget: WidgetInput) {
  setWidget(widget: $widget) @client {
    __typename
  }
}
    `;
export type SetWidgetMutationFn = Apollo.MutationFunction<SetWidgetMutation, SetWidgetMutationVariables>;

/**
 * __useSetWidgetMutation__
 *
 * To run a mutation, you first call `useSetWidgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetWidgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setWidgetMutation, { data, loading, error }] = useSetWidgetMutation({
 *   variables: {
 *      widget: // value for 'widget'
 *   },
 * });
 */
export function useSetWidgetMutation(baseOptions?: Apollo.MutationHookOptions<SetWidgetMutation, SetWidgetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetWidgetMutation, SetWidgetMutationVariables>(SetWidgetDocument, options);
      }
export type SetWidgetMutationHookResult = ReturnType<typeof useSetWidgetMutation>;
export type SetWidgetMutationResult = Apollo.MutationResult<SetWidgetMutation>;
export type SetWidgetMutationOptions = Apollo.BaseMutationOptions<SetWidgetMutation, SetWidgetMutationVariables>;
export const ZipDocument = gql`
    query zip {
  zip @client
}
    `;

/**
 * __useZipQuery__
 *
 * To run a query within a React component, call `useZipQuery` and pass it any options that fit your needs.
 * When your component renders, `useZipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZipQuery({
 *   variables: {
 *   },
 * });
 */
export function useZipQuery(baseOptions?: Apollo.QueryHookOptions<ZipQuery, ZipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ZipQuery, ZipQueryVariables>(ZipDocument, options);
      }
export function useZipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ZipQuery, ZipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ZipQuery, ZipQueryVariables>(ZipDocument, options);
        }
export type ZipQueryHookResult = ReturnType<typeof useZipQuery>;
export type ZipLazyQueryHookResult = ReturnType<typeof useZipLazyQuery>;
export type ZipQueryResult = Apollo.QueryResult<ZipQuery, ZipQueryVariables>;
export const UpdateZipDocument = gql`
    mutation updateZip($zip: String) {
  updateZip(zip: $zip) @client
}
    `;
export type UpdateZipMutationFn = Apollo.MutationFunction<UpdateZipMutation, UpdateZipMutationVariables>;

/**
 * __useUpdateZipMutation__
 *
 * To run a mutation, you first call `useUpdateZipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateZipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateZipMutation, { data, loading, error }] = useUpdateZipMutation({
 *   variables: {
 *      zip: // value for 'zip'
 *   },
 * });
 */
export function useUpdateZipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateZipMutation, UpdateZipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateZipMutation, UpdateZipMutationVariables>(UpdateZipDocument, options);
      }
export type UpdateZipMutationHookResult = ReturnType<typeof useUpdateZipMutation>;
export type UpdateZipMutationResult = Apollo.MutationResult<UpdateZipMutation>;
export type UpdateZipMutationOptions = Apollo.BaseMutationOptions<UpdateZipMutation, UpdateZipMutationVariables>;