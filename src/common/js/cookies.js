export function setCookie(name, value) {
  const days = 180
  let exp = new Date()
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${exp.toGMTString()}`
}

export function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  let value = ''
  if (arr = document.cookie.match(reg)) {
    value = arr[2]
  }
  return value
}

export function deleteCookie(name) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (!!cval) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
