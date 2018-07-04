export function setCookie(name, value) {
  const days = 180
  let exp = new Date()
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};Path=/web;expires=${exp.toGMTString()}`
}

export function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  let value = ''
  if (arr = document.cookie.match(reg)) {
    value = arr[2]
  }
  return value
}
export function deleteCookie( name ) {
  document.cookie = name + '=;Path=/web;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getToken() {
  let token = ''
  let local_token = localStorage.getItem('token')
  if (local_token && local_token.length > 10) {
    token = local_token
  } else {
    token = getCookie('remember_token')
  }
  return token
}

export function deleteToken() {  
  localStorage.removeItem('token')  
  deleteCookie('remember_token')
}