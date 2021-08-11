### Start the app

#### yarn

#### yarn atscMockServer

#### yarn start

### Configuring the BA

You able to control main aspects of the BA via appConfig.json:

- googleAnalyticAccount - GA id uses for Google Analytic.

- theme: menu & CTA button - customize look and feel of a menu and CTA button.

- feature flags. Allows enable/disable different business logic.
    - menuItemsDisabled - an array with menu ids which shows/hides menu's items.
    - flashChannelEnabled - enable/disable flash channel functionality (including controlling visibility of "Watch now"
      menu item)
    - preferAEATMessages - uses AEAT alerts instead of NRT alerts
    - disableAlerts - disable AEAT and alerts in the BA (hide "Alerts" menu item)

- endpoints
    - latestweathercastUrl - BA uses this url to gather data about latest weathercast and show it in Weather > Latest
      Weathercast
    - sevenDayForecastUrl - BA uses this url to gather data about 7 days forecast and show it in Weather > 7 days
      Forecast
    - feedProviderUrl - BA uses this url to gather data about feeds (Top Stories, Local News, etc.)
    - flashChannelUrl - BA uses this url to gather data about Flash channel (Watch Now)
    - newsOnDemandUrl - BA uses this url to gather data about News on Demand

### Endpoints

#### latestweathercastUrl
request:
GET: https://some.latestweathercastUrl <br />
response:
```json
{
  "duration": 226,
  "videoUrl": ""
}
```

#### sevenDayForecastUrl
request:
GET: https://some.sevenDayForecastUrl <br />
response:
```json
{
  "city": "Niskayuna",
  "state": "New York",
  "headerTemp": 53,
  "headerImage": 67,
  "headerTitle": "Cloudy",
  "days": [
    {
      "dateTime": 1620212400000,
      "image": 87,
      "title": "PM Showers",
      "hiTemp": 58,
      "lowTemp": 44,
      "precipitation": 40,
      "wind": 13,
      "windDirection": "WSW",
      "humidity": 89,
      "ultraviolet": "Moderate"
    }
  ]
}
```

#### feedProviderUrl
request:
GET: https://some.feedProviderUrl <br />
response:
```json
[
  {
    "id": "topStories",
    "category": "Top Stories",
    "items": [
      {
        "id": "b068aff2-b724-4549-8316-0803f1fb9a50",
        "title": "Las Vegas police vaccination rates called into question after Washington Post article",
        "duration": 143,
        "thumbnailUrl": "https://news3lv.com/resources/media/9bae5f10-50fe-4a90-b2a1-a283f435627e-thumb_52800.png",
        "videoUrl": "https://x-default-stgec.uplynk.com/ausw/slices/cdd/34d28c6069b34f1d96307c80809697d7/cdd7f332253d42119dde4f8936ed8d0d/cdd7f332253d42119dde4f8936ed8d0d_g.mp4"
      }
    ]
  },
  {
    "id": "entertainment",
    "category": "Entertainment",
    "items": [
      {
        "id": "23699ea3-bd44-417b-b5cc-f558b81b9bb1",
        "title": "Resolution to honor openly gay country star TJ Osborne blocked by GOP lawmakers",
        "duration": 155,
        "thumbnailUrl": "https://fox17.com/resources/media/e4fd3f5f-5363-4f82-aca6-357f88917e8d-BrothersOsbourneAP6.jpg",
        "videoUrl": "https://x-default-stgec.uplynk.com/auso/slices/729/34d28c6069b34f1d96307c80809697d7/729971cc19c04eff9fadafb63420d561/729971cc19c04eff9fadafb63420d561_g.mp4"
      }
    ]
  }
]
```

#### flashChannelUrl
request:
GET: https://some.feedProviderUrl <br />

Flash channel is available, response:

```json
{
  "title": "Get Our Daily Newsletter!",
  "summary": "Sign up for daily our newsletter and be entered for a chance to win $5,000!",
  "videoUrl": "https://content.uplynk.com/channel/1b06880b0e914a66a2d57549c230ba46.m3u8",
  "thumbURL": "https://x-default-stgec.uplynk.com/ausw/slices/13d/34d28c6069b34f1d96307c80809697d7/13d625c347044ed3b75faa8158a10f14/00000014.jpg",
  "channelId": "1b06880b0e914a66a2d57549c230ba46",
  "isLive": true,
  "publishedDateTime": 1595893026000,
  "scheduledDateTime": 1595865600000,
  "expiresDateTime": null
}
```
Not available, response:
```json
{
  "isLive": false
}
```

#### newsOnDemandUrl
request:
GET: https://some.newsOnDemandUrl <br />
response:
```json
[
  {
    "id": "1076526",
    "title": "WRAL News Brief",
    "category": "News",
    "duration": 94,
    "thumbnailUrl": "https://wwwcache.wral.com/asset/news/2020/04/21/19065204/NewsBrief_SixAnchors-DMID1-5p23h0r8u-320x180.jpg",
    "videoUrl": "https://media-hls.wral.com/vodhttporigins3/_definst_/mp4:amazons3/cbcnm-static-web-content/home/web/wral/public/asset/news/2006/11/30/1076526/news_brief-DMID1-5rjbjoz8z-1280x720-30-2392.mp4/playlist.m3u8"
  }
]
```

### Initialization phases

When a BA is loaded by TV's browser, it makes several action to initialize its internal components:

- websocket.ts initialize PRC client which the BA use to communicate with the TV
- makes a web socket RPC call (org.atsc.query.service) to the TV to obtain station id
- having the station id, BA loads station's appConfig.json from stations/{stationId}/appConfig.json
- initializer.tsx set up google analytic and internationalization
- initialize store initializers (apolloClient.ts) to populate store by appropriate values
- *.watcher.ts are executed to do additional actions (fetch feeds and populate them into appropriate menu items,
  initialize pulling for alerts, etc.)

### Components

#### atscMockServer
Mock server to mock ATSC RPC commands.

#### Internationalization
The BA has two languages - English and Spanish.<br />
Translation's files are located at src/i18n/translations<br />
Initialization is done in Initializer.tsx

#### Alerts

Alerts are messages that show some information to the viewers via a bottom bar of the BA.<br />
The BA uses two ways to gather messages - by using NRT file (trigger.json) and/or AEAT messages (via the web socket).

NRT alerts - it's the first mechanism to gather alerts from specific file called trigger.json that is located at
dynamic/trigger/trigger.json<br />
trigger.json

In case you need to run it locally, create trigger.json manually under /public/dynamic/trigger folder.

```json
{
  "trigger": {
    "refresh": 3,
    "trigger-data": {
      "1": {
        "type": "horizontalBarAlert",
        "refresh": 3,
        "timer": 5,
        "cycle": true,
        "enable": true,
        "barHeight": "40px",
        "data": [
          {
            "expire": 1602264600980,
            "img": "trigger/alert.png",
            "text": "521 test ",
            "priority": 4,
            "originalPublishTime": 1602245020991,
            "latestPublishTime": 1602245020991,
            "backgroundColor": "#E76F01",
            "textColor": "white",
            "videoScale": true,
            "alertData": "alert-feed",
            "linkApp": "ksnv/index.html",
            "linkType": "internal",
            "linkAppInfo": {
              "widget": "alert",
              "guid": 1,
              "focus": true,
              "media:content": 0
            },
            "targets": [
              "target:dma:521",
              "target:zip:25005"
            ]
          }
        ]
      },
      "default": {
        "type": "CTA-default",
        "linkApp": "ksnv/index.html"
      }
    }
  },
  "alert-feed": [
    {
      "guid": 1,
      "title": "521 test ",
      "items": [],
      "pages": [
        {
          "title": "521 test ",
          "story": "521 test ",
          "media": []
        }
      ]
    }
  ]
}
```

AEAT messages - it's another mechanism to gather the same alerts but via websocket by subscribing to org.atsc.notify (
ATSC AEAT messages).
```xml
<?xml version="1.0" encoding="UTF-8"?>
<AEAT xmlns="tag:atsc.org,2016:XMLSchemas ATSC Delivery AEAT 1.0">
    <AEA aeaId="AEA-2-1116-20210331092700" aeaType="alert"
         audience="public" issuer="IPAWSCAP" priority="4" wakeup="false">
        <Header effective="2021-03-31T09:27:00-04:00" expires="2021-05-31T12:27:00-04:00">
            <EventCode type="SAME">CAE</EventCode>
            <EventDesc xml:lang="en">Description EventDesc 0</EventDesc>
            <Location type="FIPS">*</Location>
        </Header>
        <AEAText xml:lang="en">Description AEAText 0
        </AEAText>
        <Media contentLength="4709420" contentType="audio/x-wav" mediaDesc="Media 0"
               mediaType="AEAtextAudio" url="cap_eas_alert_audio_1116.ENGLISH.wav" xml:lang="en"/>
    </AEA>
</AEAT>
```

If an alert has details, the additional button (Show More) will be shown in the bottom bar. Click on this button will
bring a user to Alert Details screen.<br />
Alerts will be shown only if user's and alert's fips codes are match (user can set up his zip code in Settings > FIPS
code) and this alert has priority higher than lowest accepted by BA (can be set in Settings > AlertPriority) .<br />

#### ATSC Communication

ATSC Communication All ATSC communication with a TV is done by using web socket RPC calls. Currently, the BA uses
some of the ATSC's commands to control the TV or to fetch additional information from it. All ATSC commands are placed
in websocket.ts module

#### Widgets

A widget is a component which handles some specific area in the BA. Alert Details, VOD, Audio Player, Video Player,
FIPS, Privacy policy - all these are widgets.

#### Terminology

NRT (Non-Real Time) - it's file that delivered via external service (ex. Digicaster) and placed on TV's file system.

ATSC Communication - it's RPC calls via websocket between TV and Broadcast Application.

AEAT messages - it's just a message that comes from websocket by subscribing to org.atsc.notify
