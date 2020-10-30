(function(){
  /**
   * @param title {String}  - page title
   * @param url {String}  - page url
   * example:
   * 'templateTitle' : {
   *  string : 'RegExp',
   *  desc : 'description view on alert dialog'
   * }
   */
  const template = {
    'tsv': {
      string: 'title\turl',
      desc: 'Google%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E7%94%A8%E3%81%AE%E5%87%BA%E5%8A%9B%E5%BD%A2%E5%BC%8F%E3%81%A7%E3%81%99%E3%80%82'
    },
    'md': {
      string: '[title](url)',
      desc: 'Markdown%E7%94%A8%E3%81%AE%E5%87%BA%E5%8A%9B%E5%BD%A2%E5%BC%8F%E3%81%A7%E3%81%99%E3%80%82'
    },
    'a': {
      string: '<a target="_blank" src="url">title</a>',
      desc: '<a />%E3%82%BF%E3%82%B0%E3%81%A7%E3%81%AE%E5%87%BA%E5%8A%9B%E5%BD%A2%E5%BC%8F%E3%81%A7%E3%81%99%E3%80%82'
    },
    'sb': {
      string: '[title url]',
      desc: 'Scrapbox%E7%94%A8%E3%81%AE%E5%87%BA%E5%8A%9B%E5%BD%A2%E5%BC%8F%E3%81%A7%E3%81%99%E3%80%82'
    },
    'ww-inner': {
      string: '[[title]]',
      desc: 'wikiwiki%2ejp%e3%81%ae%e3%82%b5%e3%82%a4%e3%83%88%e5%86%85%e3%83%aa%e3%83%b3%e3%82%af%e3%81%a7%e3%81%ae%e5%87%ba%e5%8a%9b%e5%bd%a2%e5%bc%8f%e3%81%a7%e3%81%99%e3%80%82'
    },
    'ssv': {
      string: 'title url',
      desc: '%e3%82%b9%e3%83%9a%e3%83%bc%e3%82%b9%e5%8c%ba%e5%88%87%e3%82%8a%e3%81%ae%e5%87%ba%e5%8a%9b%e5%bd%a2%e5%bc%8f%e3%81%a7%e3%81%99'
    }
  };
  /**
   * add templateTitle - they'll be used to choice template
   */
  const switchVal = ['tsv', 'md', 'a', 'sb', 'ww-inner', 'ssv'];
  // get page url and title
  let page = {
    url: location.href,
    title: document.getElementsByTagName("title")[0].innerText
  };
  // case: Trello card
  if (page.url.match('trello.com/c/')) {
    page.url = page.url.match(/https*\:\/\/trello\.com\/c\/[a-zA-Z0-9]+\//)[0];
    page.title = document.getElementsByClassName('js-card-detail-title-input')[0].value;
  }
  // case: wikiwiki.jp(internal)
  if (page.url.match('wikiwiki.jp')) {
    // page.url = page.url.match(/https*\:\/\/wikiwiki\.jp\/[a-zA-Z0-9-_]+\/((?!#).+)/)[1];
    let wikiTitle = page.title.match(/(?<= - ).+/)[0];
    page.title = page.title.replace(` - ${wikiTitle}`,'');
  }
  // case: Zeplin
  if (page.url.match('app.zeplin.io/project/')) {
    if (document.getElementsByClassName("projectName")) {
      page.title = document.getElementsByClassName("projectName")[0].innerText;
    }
    if (document.getElementsByClassName("ellipsis grows")) {
      page.url = 'https://' + document.getElementsByClassName("ellipsis grows")[1].innerText;
    }
  }
  // case: amazon.co.jp
  if (page.url.match('amazon.co.jp')) {
    let amazonProductCode = "";
    if (location.href.match(/\/dp\/([a-zA-Z0-9]+)\//)) {
      amazonProductCode = location.href.match(/\/dp\/([a-zA-Z0-9]+)\//)[1];
    } else if (location.href.match(/\/gp\/product\/([a-zA-Z0-9]+)\//)) {
      amazonProductCode = location.href.match(/\/gp\/product\/([a-zA-Z0-9]+)\//)[1];
    }
    if (amazonProductCode !== "") {
      page.url = `${location.protocol}//${location.host}/dp/${amazonProductCode}/`;
    }
  }
  // case: JIRA
  if (page.url.match('atlassian.net') && document.getElementsByClassName("sc-eMgOci").length > 0 ) {
    page.title = document.getElementsByClassName("sc-eMgOci")[0].innerText;
  }
  // create dialog message
  let message = '%E5%87%BA%E5%8A%9B%E5%BD%A2%E5%BC%8F%E3%82%92%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82';
  for (var i = 0; i < switchVal.length; i++) {
    message = message + '\n' + i + ':' + template[switchVal[i]]['desc'];
  };
  let switcher;
  if( switcher = prompt(message, '') ) {
    if (typeof switchVal[switcher] === 'undefined') {
      alert('%E6%8C%87%E5%AE%9A%E3%81%95%E3%82%8C%E3%81%9F%E5%80%A4%E3%81%8C%E4%B8%8D%E9%81%A9%E5%88%87%E3%81%A7%E3%81%99%E3%80%82');
    } else {
      let output = template[switchVal[switcher]]['string'];
      output = output.replace('url', page.url);
      output = output.replace('title', page.title);
      if (prompt('%E3%82%B3%E3%83%94%E3%83%9A%E3%81%97%E3%81%A6%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82', output)){
        return false;
      } else {
        return false;
      };
    }
  }
})();
