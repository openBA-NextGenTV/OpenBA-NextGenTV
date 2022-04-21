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

export const mockNoAEATable = `<AEAT xmlns="tag:atsc.org,2016:XMLSchemas/ATSC3/Delivery/AEAT/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>`;
export const mockOneAEATable = `<AEAT xmlns="tag:atsc.org,2016:XMLSchemas/ATSC3/Delivery/AEAT/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<AEA aeaId="852asdasdasdd7-9a7e-4076-a9a8-86280e5494f8_c5b0a99f-eeb5-408e-8cc8-9d59b17796f4" aeaType="update"  audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
  <Header effective="2021-11-30T16:50:30+02:00" expires="2021-11-30T16:50:30+02:00">
    <EventCode type="SAME">BNF</EventCode>
    <EventDesc xml:lang="en">IVAN PRIVET</EventDesc>
    <Location type="FIPS">024003</Location>
    <Location type="FIPS">024005</Location>
    <Location type="FIPS">024011</Location>
    <Location type="FIPS">024013</Location>
    <Location type="FIPS">024015</Location>
    <Location type="FIPS">024025</Location>
    <Location type="FIPS">024027</Location>
    <Location type="FIPS">024029</Location>
    <Location type="FIPS">024035</Location>
    <Location type="FIPS">024041</Location>
    <Location type="FIPS">024510</Location>
  </Header>
  <AEAText xml:lang="en">new alert new alert new alert new alert new alert new alert new alert new alert</AEAText>
</AEA>
</AEAT>`;
export const mockNormalTable = `<AEAT xmlns="tag:atsc.org,2016:XMLSchemas/ATSC3/Delivery/AEAT/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<AEA aeaId="852asdasdasdd7-9a7e-4076-a9a8-86280e5494f8_c5b0a99f-eeb5-408e-8cc8-9d59b17796f4" aeaType="update"  audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
  <Header effective="2021-11-30T16:50:30+02:00" expires="${new Date().toISOString()}">
    <EventCode type="SAME">BNF</EventCode>
    <EventDesc xml:lang="en">IVAN PRIVET</EventDesc>
    <Location type="FIPS">024003</Location>
    <Location type="FIPS">024005</Location>
    <Location type="FIPS">024011</Location>
    <Location type="FIPS">024013</Location>
    <Location type="FIPS">024015</Location>
    <Location type="FIPS">024025</Location>
    <Location type="FIPS">024027</Location>
    <Location type="FIPS">024029</Location>
    <Location type="FIPS">024035</Location>
    <Location type="FIPS">024041</Location>
    <Location type="FIPS">024510</Location>
  </Header>
  <AEAText xml:lang="en">new alert new alert new alert new alert new alert new alert new alert new alert</AEAText>
</AEA>
<AEA aeaId="4b2401d7-9a7e-4076-a9a8-86280e5494f8_c5b0a99f-eeb5-408e-8cc8-9d59b17796f4" aeaType="alert"  audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
  <Header effective="2021-11-30T16:50:30+02:00" expires="${new Date().toISOString()}">
    <EventCode type="SAME">BNF</EventCode>
    <EventDesc xml:lang="en">BROADCAST NEWS FLASH</EventDesc>
    <Location type="FIPS">024003</Location>
    <Location type="FIPS">024005</Location>
    <Location type="FIPS">024011</Location>
    <Location type="FIPS">024013</Location>
    <Location type="FIPS">024015</Location>
    <Location type="FIPS">024025</Location>
    <Location type="FIPS">024027</Location>
    <Location type="FIPS">024029</Location>
    <Location type="FIPS">024035</Location>
    <Location type="FIPS">024041</Location>
    <Location type="FIPS">024510</Location>
  </Header>
  <AEAText xml:lang="en">new alert new alert new alert new alert new alert new alert new alert new alert</AEAText>
</AEA>
<AEA aeaId="4b2401d7-9a7e-4076-a9a8-86280e5494f8_ecabf4e8-9543-48b6-b7ab-bd89d231ace9" aeaType="update" refAEAId="4b2401d7-9a7e-4076-a9a8-86280e5494f8_c5b0a99f-eeb5-408e-8cc8-9d59b17796f4" audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
  <Header effective="2021-11-17T16:50:45+02:00" expires="${new Date().toISOString()}">
    <EventCode type="SAME">BNF</EventCode>
    <EventDesc xml:lang="en">BROADCAST NEWS FLASH</EventDesc>
    <Location type="FIPS">024003</Location>
    <Location type="FIPS">024005</Location>
    <Location type="FIPS">024011</Location>
    <Location type="FIPS">024013</Location>
    <Location type="FIPS">024015</Location>
    <Location type="FIPS">024025</Location>
    <Location type="FIPS">024027</Location>
    <Location type="FIPS">024029</Location>
    <Location type="FIPS">024035</Location>
    <Location type="FIPS">024041</Location>
    <Location type="FIPS">024510</Location>
  </Header>
  <AEAText xml:lang="en">alert update alert update alert update alert update alert update alert update</AEAText>
</AEA>
<AEA aeaId="4b2401d7-9a7e-4076-a9a8-86280e5494f8_0c18b4e1-5a38-4d3d-85c7-720ed42170fc" aeaType="cancel" refAEAId="4b2401d7-9a7e-4076-a9a8-86280e5494f8_ecabf4e8-9543-48b6-b7ab-bd89d231ace9" audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
  <Header effective="2021-11-17T16:50:45+02:00" expires="${new Date().toISOString()}0">
    <EventCode type="SAME">BNF</EventCode>
    <EventDesc xml:lang="en">BROADCAST NEWS FLASH</EventDesc>
    <Location type="FIPS">024003</Location>
    <Location type="FIPS">024005</Location>
    <Location type="FIPS">024011</Location>
    <Location type="FIPS">024013</Location>
    <Location type="FIPS">024015</Location>
    <Location type="FIPS">024025</Location>
    <Location type="FIPS">024027</Location>
    <Location type="FIPS">024029</Location>
    <Location type="FIPS">024035</Location>
    <Location type="FIPS">024041</Location>
    <Location type="FIPS">024510</Location>
  </Header>
  <AEAText xml:lang="en">alert cancel  alert cancel  alert cancel  alert cancel  alert cancel alert cancel</AEAText>
  <Media mediaDesc="some media desc1" mediaType="AlertInformationImage"
  url="https://www.enwallpaper.com/wp-content/uploads/2021/08/7d90daec1803cba83488f73578f3e4b2-500x889.jpg"
  alternateUrl="https://www.enwallpaper.com/wp-content/uploads/2021/08/7d90daec1803cba83488f73578f3e4b2-500x889.jpg" />
  <Media mediaDesc="some media desc2" mediaType="AlertInformationImage"
  url="https://www.enwallpaper.com/wp-content/uploads/2021/08/7d90daec1803cba83488f73578f3e4b2-500x889.jpg"
  alternateUrl="https://www.enwallpaper.com/wp-content/uploads/2021/08/7d90daec1803cba83488f73578f3e4b2-500x889.jpg" />
</AEA>
<AEA aeaId="4b2401d7-9a7e-4076-a9a8-86280e5494f8_ecabf4e8-9543-48b6-b7ab-bd89d231aceU" aeaType="update" refAEAId="4b2401d7-9a7e-4076-a9a8-86280e5494f8_c5b0a99f-eeb5-408e-8cc8-9d59b17796fU" audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
  <Header effective="2021-11-17T16:50:45+02:00" expires="${new Date().toISOString()}">
    <EventCode type="SAME">BNF</EventCode>
    <EventDesc xml:lang="en">BROADCAST NEWS FLASH</EventDesc>
    <Location type="FIPS">024003</Location>
    <Location type="FIPS">024005</Location>
    <Location type="FIPS">024011</Location>
    <Location type="FIPS">024013</Location>
    <Location type="FIPS">024015</Location>
    <Location type="FIPS">024025</Location>
    <Location type="FIPS">024027</Location>
    <Location type="FIPS">024029</Location>
    <Location type="FIPS">024035</Location>
    <Location type="FIPS">024041</Location>
    <Location type="FIPS">024510</Location>
  </Header>
  <AEAText xml:lang="en">alert update alert update alert update alert update alert update alert update</AEAText>
   <Media mediaDesc="tiny url" mediaType="AlertInformationQRCode"
   url="https://9gag.com/"
   alternateUrl="https://9gag.com/" />
</AEA>
</AEAT>`;
