{
  const TAMAATSUME_KEY = 'token-hihonosato-201711';
  const DAILY_KEY = 'token-hihonosato-daily';
  const APP_URL = 'deltarium.org/tokenranbu/tamaatsume/';
  const RESET_HOUR = 5;
  const ONE_DAY = 86400000; // 24 * 60 * 60 *1000
  let cookieData = {};

  class TamaatsumeCookie {

    static valByKey(key) {
      return decodeURIComponent(((document.cookie + ';').match(key + '=([^¥S;]*)')||[])[1]);
    }

    static get tama() {
      return JSON.parse(this.valByKey(TAMAATSUME_KEY)).tama;
    }

    static get today() {
      return JSON.parse(this.valByKey(DAILY_KEY)).tama;
    }

    static write(key, value, expires) {
      document.cookie = key + '=' + value + '; expires=' + expires;
    }

    static delete(key) {
      this.write(key, '', (new Date(2015, 0, 14)).toUTCString());
    }
  }

  try {
    if (!(location.href).match(APP_URL) || !TamaatsumeCookie.valByKey(TAMAATSUME_KEY)) throw new Error('E000: You cannot use this script on this page.');

  } catch (e) {
    console.error(e.message);

  }


  if (!TamaatsumeCookie.valByKey(DAILY_KEY)) {
    console.info('First run');

    cookieData.tama = TamaatsumeCookie.tama;
    cookieData.time = (new Date()).getTime();
    console.info(cookieData);

    // get expire
    let nowDate = new Date(cookieData.time);
    let expireDate = {
      year:   nowDate.getFullYear(),
      month:  nowDate.getMonth() + 1,
      date:   (5 <= nowDate.getHours() && nowDate.getHours() < 24) ? (new Date(cookieData.time + ONE_DAY)).getDate(): nowDate.getDate()
    };
    console.info(expireDate);

    // write hacking cookie
    TamaatsumeCookie.write(DAILY_KEY, encodeURIComponent(JSON.stringify(cookieData)), (new Date(expireDate.year, expireDate.month, expireDate.date, RESET_HOUR)).toUTCString());
    console.info(TamaatsumeCookie.valByKey(DAILY_KEY));
  }

  alert('今日は' + (TamaatsumeCookie.tama - TamaatsumeCookie.today) + '個集めました');
}
