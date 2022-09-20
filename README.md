# Broadcast Application v2.1

The Broadcast Application is an open source web application that can be launched on any ATSC 3.0 compatible physical or virtual receiver, leveraging the A/344 Interactive Content Runtime, to help accelerate developer insight and experience with NextGen TV interactive experiences.

## License

`OpenBA-NextGenTV` is released under the [MIT License](/LICENSE.md).

## Local development set up

After you have cloned the repository to your local machine, you need to make the below configurations in order for the application to work correctly. The exact paths must be used in order for the application to run properly.

1. add public/stations/appConfig.json like in "DMA appConfig.json example" section
2. add public/stations/local-station/appConfig.json like in "appConfig.json example" section
3. add public/stations/local-station/logo.png (any image)

### DMA appConfig.json example

Such a config is needed by the application to determine the targeting of alerts in the application, fipsToZip, a field that determines the involvement of zips in a specific zone of zips

```json
{
  "fipsToZip": {
    "032017": [
      "89001",
      "89008"
      ]
  }
}
```

### appConfig.json example

```json
{
  "googleAnalyticAccount": "G-XXXXXXX",
  "featureFlags": {
    "disableAlerts": false,
    "preferAEATMessages": true,
    "preferAEATMessagesDemo": false
  },
  "endpoints": {
    "latestweathercastUrl": "https://some.latestweathercastUrl",
    "sevenDayForecastUrl": "https://some.sevenDayForecastUrl",
    "feedProviderUrl": "https://some.feedProviderUrl",
    "radioProviderUrl": "https://some.radioProviderUrl"
  },
  "configurationParams": {
    "fetchNrtInterval": 5000
  },
  "privacyPolicy": "<p>Privacy Policy</p>"
}
```

```npm
yarn install
```

## Start

```npm
yarn start:mockServer
```

```npm
yarn start
```

open <http://localhost:3000/cloud-ba/index.html?WS=ws://localhost:8889/&URL=http://localhost:3000>

## TV testing

Before you make a build that goes to TV you need to follow the setup steps for local development with some changes.

1. Complete all setup steps for the local development setup.
2. In the "stations" folder, you can rename the "local-station" folder or leave it as it is. How the name of this folder will be further, for example, "stationName".
3. In the "stations" folder in the appConfig.json file, you need to expand json as below. To do this, you need to specify the Global Service ID as a field in the "station" object, this is the answer from "org.atsc.query.service"

### Extended appConfig.json example

```json
{
  "fipsToZip": {
    "032017": [
      "89001",
      "89008"
      ]
  },
  "stations": {
    "globalServiceId": "stationName"
  }
}
```

## Build

```npm
yarn build
```

After that, you can deliver your build to TV and test it.

## Configuring the BA with station appConfig.json

You are able to control main aspects of the BA via appConfig.json:

- googleAnalyticAccount - GA id uses for Google Analytic.

- feature flags - allows enable/disable different business logic.

  - disableAlerts - disable Alerts in the BA
  - preferAEATMessages - should be always true. This flag is responsible for the correct operation of alerts using the xml AEAT table.
  - preferAEATMessagesDemo - should be always true. This is a boolean flag that uses to support the functionality of merging AEA items by chaining refAEAId with aeaId. More about AEAT table can be found in ATSC Standard documentation.

- endpoints
  - latestweathercastUrl - BA uses this url to gather data about latest weather forecast and show it in Weather > Latest Weathercast
  - sevenDayForecastUrl - BA uses this url to gather data about 7 days forecast and show it in Weather
  - feedProviderUrl - BA uses this url to gather data about feeds (Top Stories, Local News, etc.)
  - radioProviderUrl - BA uses this url to gather data about radio

## Endpoints

### latestweathercastUrl

request:

GET: <https://some.latestweathercastUrl>

response:

```json
{
  "videoUrl": "https://some.video.mp4"
}
```

### sevenDayForecastUrl

request:

GET: <https://some.sevenDayForecastUrl>

response:

```json
{
  "location": "Nashville, Tennessee",
  "headerTemp": 51,
  "headerIconCode": 65,
  "headerTitle": "Fair",
  "days": [
    {
      "dateTime": 1649073600000,
      "dayIconCode": "67",
      "nightIconCode": "103",
      "title": "Cloudy",
      "hiTemp": 71,
      "lowTemp": 41,
      "precipitation": 20,
      "wind": 8,
      "windDirection": "SSW",
      "humidity": 39,
      "ultraviolet": "Moderate"
    }
  ],
  "hourlyForecasts": [
    {
      "dayOfWeek": "Monday",
      "iconCode": "66",
      "title": "Partly Cloudy",
      "temp": 54,
      "precipitation": 0,
      "wind": 2,
      "windDirection": "SSE",
      "humidity": 51,
      "ultraviolet": "Low",
      "heatIndex": 54
    }
  ]
}
```

### feedProviderUrl

request:
GET: <https://some.feedProviderUrl>
response:

```json
[
  {
    "id": "topStories",
    "category": "Top Stories",
    "items": [
      {
        "id": "70f0ebfb-63e6-4147-a29d-8e87af98b841",
        "title": "Fight leads to shooting near Craig, Tenaya",
        "duration": 27,
        "thumbnailUrl": "https://some.thumbnail.png",
        "videoUrl": "https://some.video.mp4"
      }
    ]
  },
  {
    "id": "localNews",
    "category": "Local News",
    "items": [
      {
        "id": "e2627516-35e1-466e-99b4-0a89b141a154",
        "title": "CSN Coyotes women's basketball visit Sports Night, discussing the building of a program ",
        "duration": 268,
        "thumbnailUrl": "https://some.thumbnail.png",
        "videoUrl": "https://some.video.mp4"
      }
    ]
  }
]
```

### radioProviderUrl

request:

GET: <https://some.radioProviderUrl>

response:

```json
[
  {
    "label": "Local Radio",
    "logo": "https://some.logo.png",
    "labelHidden": true,
    "url": "https://some.radio.m3u8"
  }
]
```

## Components

### atscMockServer

Mock server to mock ATSC RPC commands.

### Alerts

Alerts are messages that show information to the viewers via an Alert's page of the BA.

AEAT messages - it's mechanism to gather the same alerts but via websocket by subscribing to org.atsc.notify (ATSC AEAT messages).

To use this method you need to set the "preferAEATMessages" feature flag to true.

#### AEAT alert example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<AEAT xmlns="tag:atsc.org,2016:XMLSchemas/ATSC3/Delivery/AEAT/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <AEA aeaId="6efaa0a7-fbbe-434c-8851-5da28031f516_68d90695-1f6a-4b20-9f91" aeaType="alert" audience="public" issuer="nextgenbroadcast.com" priority="0" wakeup="false">
    <Header effective="2025-12-12T15:02:17+00:00" expires="2025-12-12T16:02:16+00:00">
      <EventCode type="SAME">BNA</EventCode>
      <EventDesc xml:lang="en">NAB 2022 AEI Demo - Missing Child Alert Issued for 5-year-old Girl from Northeast Ohio</EventDesc>
      <Location type="FIPS">032017</Location>
      <Location type="FIPS">032003</Location>
      <Location type="FIPS">032023</Location>
    </Header>
    <AEAText xml:lang="en">COLUMBUS, Ohio (WSYX) - Missing Child Alert has been issued for 5-year-old Jane Doe, who was last seen Thursday in northeast Ohio. She was wearing a pink t-shirt and multicolored pants. Officers believe she is with 36-year-old John Doe who drives a silver minivan. He's described by police as a white male. 5'10" tall and weighing 180 pounds. He has brown hair and hazel eyes.</AEAText>
    <Media alternateUrl="https://some.image.png"" contentLength="826987" contentType="image/png" lang="en" mediaType="AlertInformationImage" url="dynamic/trigger/media/sinclair/image.png" />
  </AEA>
</AEAT>
```

Alerts will be shown only if user's and alert's FIPS codes are match (user can set up his zip code in Settings > Zip Code and this alert has priority higher than lowest accepted by BA (can be set in Settings > AlertPriority).

The following Zip Code rules for alerts will also apply:

- ВА Zip is 00000 - all alerts will be shown
- ВА has a valid Zip Code - no alerts will be shown
- ВА has a valid zip1, in AEAT valid zip2 - alert will not be shown
- ВА has a valid Zip Code, in AEAT 000000 Zip - alert will be shown

### ATSC Communication

ATSC Communication All ATSC communication with a TV is done by using web socket RPC calls. Currently, the BA uses some of the ATSC's commands to control the TV or to fetch additional information from it. All ATSC commands are placed in websocket.ts module

### Terminology

NRT (Non-Real Time) - it's file that delivered via external service (ex. Digicaster) and placed on TV's file system.

ATSC Communication - it's RPC calls via websocket between TV and Broadcast Application.

AEAT messages - it's just a message that comes from websocket by subscribing to org.atsc.notify.
