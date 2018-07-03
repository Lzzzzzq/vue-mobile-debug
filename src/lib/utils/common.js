export function getCookies() {
  /**
   * 获取 cookies
   */
  if (!document.cookie) return;
  let cookieArr = document.cookie.split('; ');
  let cookies = {};
  cookieArr.map(item => {
    cookies[item.split('=')[0]] = item.split('=')[1];
  });
  return cookies;
}

export function getLocalStorage() {
  /**
   * 获取localstorage
   */
  if (JSON.stringify(localStorage) === '{}') return
  return localStorage
}

export function clearCookies() {
  /**
   * 清空 cookies
   */
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) setCookie(keys, keys[i], -1);
  }
}

export function clearLocalStorage() {
  /**
   * 清空 localstorage
   */
  localStorage.clear()
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
}
