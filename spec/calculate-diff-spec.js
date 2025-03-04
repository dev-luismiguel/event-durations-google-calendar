// console.log(document.querySelector("div[data-eventchip]").getElementsByClassName('XuJrye')[0].innerText);

describe("calculateDiff", () => {
  const testCases = [
    {
      desc: 'english',
      eventMetadata: '10:15am to 2:30pm, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 15300000,
    },
    {
      desc: 'english with only am times',
      eventMetadata: '10:15am to 11:30am, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 4500000,
    },
    {
      desc: 'english with only pm times',
      eventMetadata: '2:15pm to 3:30pm, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 4500000,
    },
    {
      desc: 'english with only am times that start at midnight hour',
      eventMetadata: '12am to 1:15am, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 4500000,
    },
    {
      desc: 'english with military time',
      eventMetadata: '10:15 to 14:30, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 15300000,
    },
    {
      desc: 'english with only am times with military time',
      eventMetadata: '10:15 to 11:30, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 4500000,
    },
    {
      desc: 'english with only pm times',
      eventMetadata: '14:15pm to 15:30pm, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 4500000,
    },
    {
      desc: 'english with only am times that start at midnight hour',
      eventMetadata: '00:00 to 01:15, one event, Event Durations, Accepted, Location: some location, March 24, 2020',
      expectedDiff: 4500000,
    },
    {
      desc: 'dansk',
      eventMetadata: '10:15am til 2:30pm, one event, Event Durations, Accepteret, Placering: some location, 24. marts 2020',
      expectedDiff: 15300000,
    },
    {
      desc: 'deutsch',
      eventMetadata: '10:15AM bis 2:30PM, one event, Event Durations, Angenommen, Ort: some location, 24. März 2020',
      expectedDiff: 15300000,
    },
    {
      desc: 'deutsch with only pm times',
      eventMetadata: '3PM bis 5:45PM, one event, Event Durations, Angenommen, Ort: some location, 24. März 2020',
      expectedDiff: 9900000,
    },
    {
      desc: 'francais',
      eventMetadata: 'de 10:15am à 2:30pm, one event, Event Durations, Accepté, Lieu : some location, 24 mars 2020',
      expectedDiff: 15300000,
    },
    {
      desc: 'portugues brasil',
      eventMetadata: '10:15am - 2:30pm, one event, Event Durations, Aceito, Local: some location, 24 de março de 2020',
      expectedDiff: 15300000,
    },
    {
      desc: 'japanese spanning am-pm',
      eventMetadata: '午前10:15～午後2:30、one event、Event Durations、承諾済み、場所: some location、2020年 3月 24日',
      expectedDiff: 15300000,
    },
    {
      desc: 'japanese only pm starting on an even hour',
      eventMetadata: '午後3時～午後4:45、one event、Event Durations、承諾済み、場所: some location、2020年 3月 24日',
      expectedDiff: 6300000,
    },
    {
      desc: 'chinese spanning am-pm',
      eventMetadata: '上午11:45至下午2:45，one event，Event Durations，已接受，地点：some location，2020年3月24日',
      expectedDiff: 10800000,
    },
    {
      desc: 'chinese am',
      eventMetadata: '上午9点至上午10:15，one event，Event Durations，已接受，地点：some-location-5，2020年3月24',
      expectedDiff: 4500000,
    },
    {
      desc: 'chinese pm',
      eventMetadata: '下午3点至下午5:30，one event，Event Durations，已接受，地点：some-location-5，2020年3月24日',
      expectedDiff: 9000000,
    },
    {
      desc: 'korean spanning am-pm',
      eventMetadata: '오전 11:45~오후 2:45, one event, Event Durations, 수락함, 위치: some-location-5, 2020년 3월 24일',
      expectedDiff: 10800000,
    },
    {
      desc: 'korean am',
      eventMetadata: '오전 9시~오전 10:15, one event, Event Durations, 수락함, 위치: some-location-5, 2020년 3월 24일',
      expectedDiff: 4500000,
    },
    {
      desc: 'korean pm',
      eventMetadata: '오후 3시~오후 5:45, one event, Event Durations, 수락함, 위치: some-location-5, 2020년 3월 24일',
      expectedDiff: 9900000,
    },
    {
      desc: 'bahasa indonesian',
      eventMetadata: '11am sampai 1pm, one event, Event Durations, Diterima, Lokasi: some-location-5, 24 Maret 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'catala',
      eventMetadata: 'De les 11am a les 1pm, one event, Event Durations, Acceptat, Lloc: some-location-5, 24 de de març de 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'espanol',
      eventMetadata: 'De 11am a 1pm, one event, Event Durations, Aceptado, Ubicación: some-location-5, 24 de marzo de 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'filipino',
      eventMetadata: '11AM hanggang 1PM, one event, Event Durations, Tinanggap, Lokasyon: some-location-5, 24 Marso 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'nederlands',
      eventMetadata: 'Van 11am tot 1pm, single, Event Durations, Geaccepteerd, Geen locatie, 30. maart 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'polski',
      eventMetadata: 'Od 11am do 1pm, asdf, Event Durations, Zaakceptowano, Brak lokalizacji, 31 marca 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'portugues brasil',
      eventMetadata: '11am - 1pm, single, Event Durations, Aceito, Nenhum local, 30 de março de 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'portugues portugal',
      eventMetadata: '11am às 1pm, one event, Event Durations, Aceite, Localização: some-location-5, 24 de março de 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'romana',
      eventMetadata: '11 am - 1 pm, single, Event Durations, Acceptat, Fără locație, 30 martie 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'svenska',
      eventMetadata: '11am till 1pm, one event, Event Durations, Tackat ja, Plats: some-location-5, den 24 mars 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'turkish',
      eventMetadata: '11am ile 1pm arası, single, Event Durations, Kabul edildi, Konum bilgisi yok, 30 Mart 2020',
      expectedDiff: 7200000,
    },
    {
      desc: 'russian',
      eventMetadata: 'С 11AM до 1PM, single, Event Durations, Приглашение принято, Место проведения неизвестно, 30 марта 2020',
      expectedDiff: 7200000,
    },
  ];

  testCases.forEach((testCase) => {
    it(`should calculate diff for ${testCase.desc}`, () => {
      const diff = calculateDiff(testCase.eventMetadata);
      expect(diff).toEqual(testCase.expectedDiff);
    });
  });

  const multiDayTestCases = [
    {
      desc: 'english that spans to midnight',
      eventMetadata: 'April 1, 2020 at 9:45am to April 2, 2020 at 12am, asdf, Event Durations, Accepted, Location: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'english that spans past midnight',
      eventMetadata: 'April 1, 2020 at 9:45am to April 2, 2020 at 9:44am, asdf, Event Durations, Accepted, Location: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'azərbaycan that spans to midnight',
      eventMetadata: '1 aprel 2020, 9:45 AM - 2 aprel 2020, 12 AM, asdf, Event Durations, Qəbul edildi, Məkan: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'azərbaycan that spans past midnight',
      eventMetadata: '1 aprel 2020, 9:45 AM - 2 aprel 2020, 9:44 AM, asdf, Event Durations, Qəbul edildi, Məkan: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'bahasa indonesian that spans to midnight',
      eventMetadata: '1 April 2020 pukul 9.45am sampai 2 April 2020 pukul 12am, asdf, Event Durations, Diterima, Lokasi: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'bahasa indonesian that spans past midnight',
      eventMetadata: '1 April 2020 pukul 9.45am sampai 2 April 2020 pukul 9.44am, asdf, Event Durations, Diterima, Lokasi: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'catala that spans to midnight',
      eventMetadata: 'Del dia 1 de d’abril de 2020 a les 9:45am al dia 2 de d’abril de 2020 a les 12am, asdf, Event Durations, Acceptat, Lloc: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'catala that spans past midnight',
      eventMetadata: 'Del dia 1 de d’abril de 2020 a les 9:45am al dia 2 de d’abril de 2020 a les 9:44am, asdf, Event Durations, Acceptat, Lloc: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'dansk that spans to midnight',
      eventMetadata: '1. april 2020 kl. 9:45am til 2. april 2020 kl. 12am, asdf, Event Durations, Accepteret, Placering: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'dansk that spans past midnight',
      eventMetadata: '1. april 2020 kl. 9:45am til 2. april 2020 kl. 9:44am, asdf, Event Durations, Accepteret, Placering: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'deutsch that spans to midnight',
      eventMetadata: '1. April 2020 um 9:45AM bis 2. April 2020 um 12AM, asdf, Event Durations, Angenommen, Ort: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'deutsch that spans past midnight',
      eventMetadata: '1. April 2020 um 9:45AM bis 2. April 2020 um 9:44AM, asdf, Event Durations, Angenommen, Ort: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'espanol that spans to midnight',
      eventMetadata: 'Del 1 de abril de 2020 a las 9:45am al 2 de abril de 2020 a las 12am, asdf, Event Durations, Aceptado, Ubicación: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'espanol that spans past midnight',
      eventMetadata: 'Del 1 de abril de 2020 a las 9:45am al 2 de abril de 2020 a las 9:44am, asdf, Event Durations, Aceptado, Ubicación: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'euskara that spans to midnight',
      eventMetadata: '2020(e)ko apirilaren 1(a) (9:45 AM) - 2020(e)ko apirilaren 2(a) (12 AM), asdf, Event Durations, Onartuta, Kokapena: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'euskara that spans past midnight',
      eventMetadata: '2020(e)ko apirilaren 1(a) (9:45 AM) - 2020(e)ko apirilaren 2(a) (9:44 AM), asdf, Event Durations, Onartuta, Kokapena: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'filipino that spans to midnight',
      eventMetadata: '1 Abril 2020 nang 9:45AM hanggang 2 Abril 2020 nang 12AM, asdf, Event Durations, Tinanggap, Lokasyon: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'filipino that spans past midnight',
      eventMetadata: '1 Abril 2020 nang 9:45AM hanggang 2 Abril 2020 nang 9:44AM, asdf, Event Durations, Tinanggap, Lokasyon: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'francais that spans to midnight',
      eventMetadata: 'du 1 avril 2020, 9:45am au 2 avril 2020, 12am, asdf, Event Durations, Accepté, Lieu : some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'francais that spans past midnight',
      eventMetadata: 'du 1 avril 2020, 9:45am au 2 avril 2020, 9:44am, asdf, Event Durations, Accepté, Lieu : some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'italiano that spans to midnight',
      eventMetadata: 'Dal 1 aprile 2020 alle 9:45AM fino al 2 aprile 2020 alle 12AM, asdf, Event Durations, Accettato, Posizione: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'italiano that spans past midnight',
      eventMetadata: 'Dal 1 aprile 2020 alle 9:45AM fino al 2 aprile 2020 alle 9:44AM, asdf, Event Durations, Accettato, Posizione: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'nederlands that spans to midnight',
      eventMetadata: 'Van 1. april 2020 om 9:45am tot 2. april 2020 om 12am, asdf, Event Durations, Geaccepteerd, Locatie: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'nederlands that spans past midnight',
      eventMetadata: 'Van 1. april 2020 om 9:45am tot 2. april 2020 om 9:44am, asdf, Event Durations, Geaccepteerd, Locatie: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'polski that spans to midnight',
      eventMetadata: 'Od 1 kwietnia 2020, 9:45am do 2 kwietnia 2020, 12am, asdf, Event Durations, Zaakceptowano, Lokalizacja: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'polski that spans past midnight',
      eventMetadata: 'Od 31 marca 2020, 9:45am do 1 kwietnia 2020, 9:44am, multi, Event Durations, Zaakceptowano, Brak lokalizacji,',
      expectedDiff: 86340000,
    },
    {
      desc: 'portugues (brasil) that spans to midnight',
      eventMetadata: '1 de abril de 2020 às 9:45am - 2 de abril de 2020 às 12am, asdf, Event Durations, Aceito, Local: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'portugues (brasil) that spans past midnight',
      eventMetadata: '1 de abril de 2020 às 9:45am - 2 de abril de 2020 às 9:44am, asdf, Event Durations, Aceito, Local: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'portugues (portugal) that spans to midnight',
      eventMetadata: '1 de abril de 2020 às 9:45am a 2 de abril de 2020 às 12am, asdf, Event Durations, Aceite, Localização: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'portugues (portugal) that spans past midnight',
      eventMetadata: '1 de abril de 2020 às 9:45am a 2 de abril de 2020 às 9:44am, asdf, Event Durations, Aceite, Localização: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'romana that spans to midnight',
      eventMetadata: '1 aprilie 2020, 9:45 am - 2 aprilie 2020, 12 am, asdf, Event Durations, Acceptat, Locația: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'romana that spans past midnight',
      eventMetadata: '1 aprilie 2020, 9:45 am - 2 aprilie 2020, 9:44 am, asdf, Event Durations, Acceptat, Locația: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'svenska that spans to midnight',
      eventMetadata: 'den 1 april 2020 kl. 9:45am till den 2 april 2020 kl. 12am, asdf, Event Durations, Tackat ja, Plats: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'svenska that spans past midnight',
      eventMetadata: 'den 1 april 2020 kl. 9:45am till den 2 april 2020 kl. 9:44am, asdf, Event Durations, Tackat ja, Plats: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'turkish that spans to midnight',
      eventMetadata: '1 Nisan 2020 saat 9:45am ile 2 Nisan 2020 saat 12am arası, asdf, Event Durations, Kabul edildi, Konum: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'turkish that spans past midnight',
      eventMetadata: '1 Nisan 2020 saat 9:45am ile 2 Nisan 2020 saat 9:44am arası, asdf, Event Durations, Kabul edildi, Konum: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'chinese (中文 (香港)) that spans to midnight',
      eventMetadata: '2020年4月1日 上午9:45至 2020年4月2日 上午12時，asdf，Event Durations，已接受，地點：some location，',
      expectedDiff: 51300000,
    },
    {
      desc: 'chinese (中文 (香港)) that spans past midnight',
      eventMetadata: '2020年4月1日 上午9:45至 2020年4月2日 上午9:44，asdf，Event Durations，已接受，地點：some location，',
      expectedDiff: 86340000,
    },
    {
      desc: 'chinese (中文 (香港)) that starts on an even hour and spans past midnight',
      eventMetadata: '2020年3月31日 上午10時至 2020年4月1日 上午9:59，multi，Event Durations，已接受，沒有位置資料，',
      expectedDiff: 86340000,
    },
    {
      desc: 'chinese (中文（简体）) that spans to midnight',
      eventMetadata: '2020年4月1日上午9:45至 2020年4月2日上午12点，asdf，Event Durations，已接受，地点：some location，',
      expectedDiff: 51300000,
    },
    {
      desc: 'chinese (中文（简体）) that spans past midnight',
      eventMetadata: '2020年4月1日上午9:45至 2020年4月2日上午9:44，asdf，Event Durations，已接受，地点：some location，',
      expectedDiff: 86340000,
    },
    {
      desc: 'chinese (中文（简体）) that starts on an even hour and spans past midnight',
      eventMetadata: '2020年3月31日上午10点至 2020年4月1日上午9:59，multi，Event Durations，已接受，没有位置信息， ',
      expectedDiff: 86340000,
    },
    {
      desc: 'chinese (中文（繁體）that spans to midnight',
      eventMetadata: '2020年4月1日 上午9:45 至 2020年4月2日 上午12點，asdf，Event Durations，已接受，地點：some location，',
      expectedDiff: 51300000,
    },
    {
      desc: 'chinese (中文 （繁體）that spans past midnight',
      eventMetadata: '2020年4月1日 上午9:45 至 2020年4月2日 上午9:44，asdf，Event Durations，已接受，地點：some location，',
      expectedDiff: 86340000,
    },
    {
      desc: 'chinese (中文（繁體）that starts on an even hour and spans past midnight',
      eventMetadata: '2020年3月31日 上午10點 至 2020年4月1日 上午9:59，multi，Event Durations，已接受，沒有任何地點資訊，',
      expectedDiff: 86340000,
    },
    {
      desc: 'japanese that spans to midnight',
      eventMetadata: '2020年 4月 1日 午前9:45～2020年 4月 2日 午前12時、asdf、Event Durations、承諾済み、場所: some location、',
      expectedDiff: 51300000,
    },
    {
      desc: 'japanese that spans past midnight',
      eventMetadata: '2020年 4月 1日 午前9:45～2020年 4月 2日 午前9:44、asdf、Event Durations、承諾済み、場所: some location、',
      expectedDiff: 86340000,
    },
    {
      desc: 'japanese that starts on an even hour and spans past midnight',
      eventMetadata: '2020年 3月 31日 午前10時～2020年 4月 1日 午前9:59、multi、Event Durations、承諾済み、場所の指定なし、',
      expectedDiff: 86340000,
    },
    {
      desc: 'korean that spans to midnight',
      eventMetadata: '2020년 4월 1일 오전 9:45~2020년 4월 2일 오전 12시, asdf, Event Durations, 수락함, 위치: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'korean that spans past midnight',
      eventMetadata: '2020년 4월 1일 오전 9:45~2020년 4월 2일 오전 9:44, asdf, Event Durations, 수락함, 위치: some location,',
      expectedDiff: 86340000,
    },
    {
      desc: 'korean that starts on an even hour and spans past midnight',
      eventMetadata: '2020년 3월 31일 오전 10시~2020년 4월 1일 오전 9:59, multi, Event Durations, 수락함, 위치 없음,',
      expectedDiff: 86340000,
    },
    {
      desc: 'russian that spans to midnight',
      eventMetadata: 'С 9:45AM 30 марта 2020 до 12AM 31 марта 2020, asdf, Event Durations, Приглашение принято, Место проведения: some location,',
      expectedDiff: 51300000,
    },
    {
      desc: 'russian that spans past midnight',
      eventMetadata: 'С 9:45AM 31 марта 2020 до 9:44AM 1 апреля 2020, multi, Event Durations, Приглашение принято, Место проведения неизвестно,',
      expectedDiff: 86340000,
    },
    {
      desc: 'russian that starts on an even hour and spans past midnight',
      eventMetadata: 'С 10AM 31 марта 2020 до 9:59AM 1 апреля 2020, multi, Event Durations, Приглашение принято, Место проведения неизвестно,',
      expectedDiff: 86340000,
    },
  ];

  multiDayTestCases.forEach((multiDayTestCase) => {
    it(`should calculate diff for multi-day events: ${multiDayTestCase.desc}`, () => {
      const diff = calculateDiff(multiDayTestCase.eventMetadata);
      expect(diff).toEqual(multiDayTestCase.expectedDiff);
    });
  });
});
