import axios from 'axios'

const csrfToken = document.querySelector("meta[name=csrf-token]") && document.querySelector("meta[name=csrf-token]").content
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'X-CSRF-Token': csrfToken
}

axios.defaults.baseURL = process.env.API_HOST || 'http://localhost:5000'
axios.defaults.timeout = 5000

export default async function request(options, url, message) {
  let response = await axios({
    url: options.url || url,
    method: options.method || 'GET',
    data: options.data || {},
    params: {
      current_account_id: 1,
      ...options.params
    }
  })
  console.log('response', response)
  if (response.status === 403) {
    return response
  } else if (response.status === 1000) {
    console.log('error')
    return response
  } else {
    if (message) {
      // toastr.success(message)
    }
    // this.$createToast({
    //   time: 1000,
    //   txt: 'veryGood'
    // })
    return response
  }

}
