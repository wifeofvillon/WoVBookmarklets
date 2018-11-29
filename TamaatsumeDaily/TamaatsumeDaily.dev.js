{
  const TAMAATSUME_KEY = 'token-tamaatsume-201812';
  const DAILY_KEY = 'token-rentaisen-daily';
  const APP_URL = 'deltarium.org/tokenranbu/tamaatsume/';
  const RESET_HOUR = 5;
  const ONE_DAY = 86400000; // 24 * 60 * 60 *1000
  let cookieData = {};

  class TamaatsumeCookie {

    static valByKey(key) {
      return decodeURIComponent(((document.cookie + ';').match(key + '=([^¥S;]*)')||[])[1]);
    }

    static strToJSON(value) {
      return (typeof value == 'string') ? JSON.parse(value) : {};
    }

    static get tama() {
      return this.strToJSON(this.valByKey(TAMAATSUME_KEY)).tama;
    }

    static get time() {
      return this.strToJSON(this.valByKey(DAILY_KEY)).time;
    }

    static get todayTama() {
      return this.strToJSON(this.valByKey(DAILY_KEY)).tama;
    }

    static write(key, value) {
      document.cookie = key + '=' + value + '; max-age=86400';
      console.info('TamaatsumeCokkie.write: ' + this.valByKey(key));
    }

    static delete(key) {
      document.cookie = key + '=; max-age=0';
    }
  }

  class TamaatsumeDate {
    constructor(date) {
      this.date = date;
      this.dateHash = {
        year:   this.date.getFullYear(),
        month:  this.date.getMonth(),
        date:   this.date.getDate(),
        hour:   this.date.getHours()
      };
      this.time = date.getTime();
    }

    /**
     * get system reseted time(5:00AM)
     * @return {Number} Date.getTime
     */
    get reseted() {
      let time = (new Date(this.dateHash.year, this.dateHash.month, this.dateHash.date, 5)).getTime();
      return (5 <= this.dateHash.hour) ? time : time - ONE_DAY;
    }

    isNextDay(reseted) {
      return (reseted + ONE_DAY <= this.time) ? true : false;
    }
  }

  try {
    if (!(location.href).match(APP_URL) || !TamaatsumeCookie.valByKey(TAMAATSUME_KEY)) throw new Error('このスクリプトは「刀剣乱舞玉集め進捗表 ver 2.3」上でのみ動作します。');
  } catch (e) {
    alert(e.message);
  }

  let cookieValue = TamaatsumeCookie.valByKey(DAILY_KEY);

  let nowDate = new TamaatsumeDate(new Date());

  if (!typeof cookieValue == 'string' || cookieValue.length == 0 || cookieValue == 'undefined') {
    console.info('First Run');

    cookieData = {
      tama: TamaatsumeCookie.tama,
      time: nowDate.reseted
    };
    console.info(cookieData);

    TamaatsumeCookie.write(DAILY_KEY, encodeURIComponent(JSON.stringify(cookieData)));
    console.info(TamaatsumeCookie.valByKey(DAILY_KEY));

  } else {
    console.info('Second or Later Run');

    cookieData = JSON.parse(cookieValue);

    try {
      if (typeof cookieData.tama != 'number' || typeof cookieData.time != 'number') throw new Error('当スクリプトのデータが破損しているためリセットします(もう一度お試しください)');
    } catch (e) {
      TamaatsumeCookie.delete(DAILY_KEY);
      alert(e.message);
    }

    if (nowDate.isNextDay(cookieData.time)) {
      console.info('Date Changed');

      cookieData = {
        tama: TamaatsumeCookie.tama,
        time: nowDate.reseted
      }
      console.info(cookieData);

      TamaatsumeCookie.write(DAILY_KEY, encodeURIComponent(JSON.stringify(cookieData)));
      console.info(TamaatsumeCookie.valByKey(DAILY_KEY));
    } else {
      console.info('Same Date');
    }

  }

  alert('今日は' + (TamaatsumeCookie.tama - TamaatsumeCookie.todayTama) + '個集めました');
}
