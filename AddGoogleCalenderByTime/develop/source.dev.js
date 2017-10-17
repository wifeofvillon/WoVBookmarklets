(function(){
  let d = new Date();
  let now = d.getTime();
  let text = prompt('Input your event text:');
  if (text) {
    let time = prompt('How long will you hold the event later (ex. hh):');
    if (time.match(/[0-9]+/)) {
      let after = now + time*1*60*60*1000;
      let d2 = new Date(after);
      let d2a = [d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds()];
      let date = d2a[0].toString();
      date += d2a[1] < 9 ? '0' + (d2a[1] + 1).toString() : (d2a[1] + 1).toString();
      date += d2a[2] < 10 ? '0' + d2a[2].toString() : d2a[2].toString();
      date += 'T';
      date += d2a[3] < 10 ? '0' + d2a[3].toString() : d2a[3].toString();
      date += d2a[4] < 10 ? '0' + d2a[4].toString() : d2a[4].toString();
      date += '00';
      let url = 'https://www.google.com/calendar/event?action=TEMPLATE&text=' + text + '&dates=' + date + '/' + date;
      window.open(url);
    } else {
      alert('Invalid value: Input time in hh:mm.');
    }
  }
})();
