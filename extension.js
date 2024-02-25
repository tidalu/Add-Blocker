/*
    This event triggers when the browser has committed to loading a webpage.
    As opposed to e.g. webNavigation.onCompleted, this will start to run early
    so that we can begin to remove ads as soon as possible.
*/

// chrome.webNavigation API is to recieve notifications about the status of navigation requests in-flight
// it ddoes require you to declatrre the 'webNavigation' permission in the extension manifest
chrome.webNavigation.onCommitted.addListener(function (tab) {
  // prevents script from running when other frames load
  if (tab.frameId == 0) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      // get the url of the web page
      let url = tabs[0].url;
      // remove unnecessary protocol ddefinition and ww subdomain from the url
      let parsedUrl = url
        .replace('https://', '')
        .replace('http://', '')
        .replace('www.', '');

      // remove path and queries e/g/ linkedin.com/feed or linkedin.com?query=value
      // we only want the base domain
      let domain = parsedUrl
        .slice(
          0,
          parsedUrl.indexOf('/') == -1
            ? parsedUrl.length
            : parsedUrl.indexOf('/')
        )
        .slice(
          0,
          parsedUrl.indexOf('?') == -1
            ? parsedUrl.length
            : parsedUrl.indexOf('?')
        );

      try {
        if (domain.length < 1 || domain === null || domain === undefined) {
          return;
        } else if (domain == 'linkedin.com') {
          runLinkedinScript();
          return;
        }
      } catch (er) {
        throw er;
      }
    });
  }
});

function runLinkedinScript() {
  // inject sript from the file into the webpage
  chrome.tabs.executeScript({
    file: 'linkedin.js',
  });
  return true;
}
