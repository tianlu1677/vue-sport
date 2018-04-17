import axios from 'axios'

const csrfToken = document.querySelector("meta[name=csrf-token]") && document.querySelector("meta[name=csrf-token]").content
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
}

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.timeout = 5000

export default async function request(options = {}, url, message ) {
  let response = await axios({
    url: options.url || url,
    method: options.method || 'GET',
    data: options.data || {}
  })

  console.log('response', response)
  if(response.status === 403) {
    // toastr.info('您当前没有权限进行此操作')
    return {}
  } else if ( response.status === 500) {
    console.log('error')
    // toastr.error('服务器错误')
    return response
  } else {
    if(message) {
     // toastr.success(message)
    }
    return response
  }

}