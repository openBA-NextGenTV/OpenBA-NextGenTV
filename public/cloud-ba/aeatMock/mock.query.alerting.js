const queryAlerting = () => {
  return {
    jsonrpc: '2.0',
    id: 0,
    result: {
      alertList: [
        {
          alertingType: 'AEAT',
          alertingFragment: aeat,
        },
      ],
    },
  };
};

module.exports = queryAlerting;

const aeat = `
<AEAT xmlns="tag:atsc.org,2016:XMLSchemas/ATSC3/Delivery/AEAT/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<AEA aeaId="180f270c-05e6-409d-8472-588c0ba9367c_416854a9-d77c-48c3-a606-1a26eecdc439" aeaType="cancel" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="180f270c-05e6-409d-8472-588c0ba9367c_96aeca4c-f17a-4e8c-a98c-ab9a13a87206" wakeup="false">
<Header effective="2021-12-03T11:02:19+00:00" expires="2022-12-31T21:10:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Alert expire test</AEAText>
</AEA>
<AEA aeaId="180f270c-05e6-409d-8472-588c0ba9367c_96aeca4c-f17a-4e8c-a98c-ab9a13a87206" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="180f270c-05e6-409d-8472-588c0ba9367c_bd0a2681-8455-43b0-8504-1baa2e20a05a" wakeup="false">
<Header effective="2021-12-03T11:02:19+00:00" expires="2022-12-31T21:10:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Alert expire test</AEAText>
</AEA>
<AEA aeaId="180f270c-05e6-409d-8472-588c0ba9367c_bd0a2681-8455-43b0-8504-1baa2e20a05a" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="180f270c-05e6-409d-8472-588c0ba9367c_d5db533f-4c80-498b-a9ae-893f0a47052d" wakeup="false">
<Header effective="2021-12-03T10:07:55+00:00" expires="2022-12-31T20:10:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Alert expire test</AEAText>
</AEA>
<AEA aeaId="180f270c-05e6-409d-8472-588c0ba9367c_d5db533f-4c80-498b-a9ae-893f0a47052d" aeaType="alert" audience="public" issuer="nextgenbroadcast.com" priority="1" wakeup="false">
<Header effective="2021-12-03T10:03:23+00:00" expires="2022-12-31T20:10:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Alert expire test</AEAText>
</AEA>
<AEA aeaId="55b3540c-901a-4109-ace8-b6438428b3b4_651ac862-9aa2-47ce-9c40-a2e5b02de39b" aeaType="alert" audience="public" issuer="nextgenbroadcast.com" priority="0" wakeup="false">
<Header effective="2021-12-03T11:32:23+00:00" expires="2022-12-31T22:20:46+00:00">
<EventCode type="SAME">CFA</EventCode>
<EventDesc xml:lang="en">PRACTICE/DEMO WARNING</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Alert image test test</AEAText>
</AEA>
<AEA aeaId="6f9eba99-3546-41bf-9740-3a6518ffd1bb_124d4d02-7739-44aa-b3ec-394da47fac7b" aeaType="alert" audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
<Header effective="2021-12-03T08:46:58+00:00" expires="2022-12-31T17:46:54+00:00">
<EventCode type="SAME">BNF</EventCode>
<EventDesc xml:lang="en">BROADCAST NEWS FLASH</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Alert_839_1638521209983 Message_1638521209983</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_0c1d0a58-ac33-48e0-91fb-87914c3d9103" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="7e598c79-9226-490d-bc7b-1da56266deab_2f73ac40-b841-4684-b256-883a1df78c57" wakeup="false">
<Header effective="2021-12-03T11:05:10+00:00" expires="2022-12-31T21:10:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_0f186fb8-8b03-4afb-b996-78b674143c65" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="7e598c79-9226-490d-bc7b-1da56266deab_d1d2e36b-8e89-4554-a126-1fe263ce83b1" wakeup="false">
<Header effective="2021-12-03T11:17:15+00:00" expires="2022-12-31T21:20:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_144527d3-97ad-434a-bee8-2f6fa174a696" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="7e598c79-9226-490d-bc7b-1da56266deab_f6176b4e-ff37-4721-9fd4-c802fb0e9aae" wakeup="false">
<Header effective="2021-12-03T11:20:10+00:00" expires="2022-12-31T22:30:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_2f73ac40-b841-4684-b256-883a1df78c57" aeaType="alert" audience="public" issuer="nextgenbroadcast.com" priority="1" wakeup="false">
<Header effective="2021-12-03T11:04:42+00:00" expires="2022-12-03T21:10:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_51ac4086-f6ec-451c-9328-cae0f00def41" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="7e598c79-9226-490d-bc7b-1da56266deab_144527d3-97ad-434a-bee8-2f6fa174a696" wakeup="false">
<Header effective="2021-12-03T11:35:58+00:00" expires="2022-12-31T21:40:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_5e5fc9dc-84db-4b90-87c6-334c36ede7e2" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="7e598c79-9226-490d-bc7b-1da56266deab_0c1d0a58-ac33-48e0-91fb-87914c3d9103" wakeup="false">
<Header effective="2021-12-03T11:13:57+00:00" expires="2022-12-31T09:20:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_d1d2e36b-8e89-4554-a126-1fe263ce83b1" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="7e598c79-9226-490d-bc7b-1da56266deab_5e5fc9dc-84db-4b90-87c6-334c36ede7e2" wakeup="false">
<Header effective="2021-12-03T11:16:41+00:00" expires="2022-12-31T21:20:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="7e598c79-9226-490d-bc7b-1da56266deab_f6176b4e-ff37-4721-9fd4-c802fb0e9aae" aeaType="update" audience="public" issuer="nextgenbroadcast.com" priority="1" refAEAId="7e598c79-9226-490d-bc7b-1da56266deab_0f186fb8-8b03-4afb-b996-78b674143c65" wakeup="false">
<Header effective="2021-12-03T11:18:23+00:00" expires="2022-12-31T21:30:00+00:00">
<EventCode type="SAME">ADR</EventCode>
<EventDesc xml:lang="en">ADMINISTRATIVE MESSAGE</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Expire time ex</AEAText>
</AEA>
<AEA aeaId="93c01776-5737-4cd1-b957-70d46bcc4e44_96fc5ed5-08c4-4daa-98d9-769d5c7b58e2" aeaType="alert" audience="public" issuer="nextgenbroadcast.com" priority="3" wakeup="false">
<Header effective="2021-12-03T08:04:54+00:00" expires="2022-12-31T17:04:50+00:00">
<EventCode type="SAME">BNF</EventCode>
<EventDesc xml:lang="en">BROADCAST NEWS FLASH</EventDesc>
<Location type="FIPS">032003</Location>
<Location type="FIPS">032023</Location>
</Header>
<AEAText xml:lang="en">Alert_839_1638518686969 Message_1638518686969</AEAText>
<Media mediaDesc="some media desc2" mediaType="AlertInformationQRCode"
   alternateUrl="https://www.enwallpaper.com/wp-content/uploads/2021/08/7d90daec1803cba83488f73578f3e4b2-&500x889.jpg" />
</AEA>
</AEAT>`;
