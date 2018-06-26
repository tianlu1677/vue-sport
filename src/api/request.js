import axios from 'axios'
import {getToken} from "@/common/js/cookies";

// const csrfToken = document.querySelector("meta[name=csrf-token]") && document.querySelector("meta[name=csrf-token]").content
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let token = getToken()
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'Token': token
}
// console.log('token...', token)
axios.interceptors.response.use((res) => {
  return res;
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        window.location.href = process.env.REDIRECT_URL
        break
      default:
        console.log('error')
    }
  }
  return Promise.reject(error)
})

const isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
  axios.defaults.baseURL = process.env.API_HOST
} else {
  axios.defaults.baseURL = process.env.API_HOST || 'http://localhost:5000'
  // axios.defaults.baseURL = 'http://xinxue.niubibeta.com'
}

axios.defaults.timeout = 5000

export default async function request(options, url, message) {
  let response = await axios({
    url: options.url || url,
    method: options.method || 'GET',
    data: options.data || {},
    params: {
      ...options.params
    }
  })
  if (response.status === 403) {
    return response
  } else if (response.status === 401) {
    return response
  } else if (response.status === 1000) {
    console.log('error')
    return response
  } else {
    if (message) {
    }
    return response
  }

}
