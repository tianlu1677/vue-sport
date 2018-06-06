import {getWechatApiConfig} from "@/api/wechat_api";
import store from '../../store'

function getJsUrl() {
  let jsUrl = ''
  let u = navigator.userAgent;
  let isWechat = navigator.userAgent.indexOf('MicroMessenger') > -1
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  if (isiOS && isWechat) {
    jsUrl = store.state.jsUrl.split('#')[0]
  } else {
    jsUrl = encodeURIComponent(window.location.url.split('#')[0])
  }
  return jsUrl
}

export async function wechatShare(shareData = {}) {
  let isWechat = navigator.userAgent.indexOf('MicroMessenger') > -1
  if (!isWechat) {
    console.log('not wechat')
    return
  }
  let defaultData = {
    title: '每日新学',
    desc: "每日新学，跟朋友一起每天学习新东西！",
    link: window.location.href,
    type: 'link',
    imgUrl: 'https://www.baidu.com/img/bd_logo1.png', //分享出来的图片的
    success: function (res) {
      return res
    },
    cancel: function (res) {
      return res
    }
  }

  const API_LIST = 'onMenuShareAppMessage,onMenuShareTimeline,onMenuShareQQ,onMenuShareQZone,chooseImage'

  let data = {...defaultData, ...shareData}
  const res = await getWechatApiConfig({
    url: getJsUrl(),
    chose_api: API_LIST,
  })
  // console.log('res', res)

  wx.config({
    debug: res.debug,
    appId: res.appId,
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: API_LIST.split(',')
  })

  wx.onMenuShareTimeline({
    title: data.title,
    link: data.link,
    imgUrl: data.imgUrl,
    success: data.success,
    cancel: data.cancel,
  })

  wx.onMenuShareAppMessage({
    title: data.title,
    desc: data.desc,
    link: data.link,
    imgUrl: data.imgUrl,
    type: data.type,
    dataUrl: data.data_url,
    success: data.success,
    cancel: data.cancel
  })

  wx.onMenuShareQQ({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接
    imgUrl: data.imgUrl, // 分享图标
    success: data.success,
    cancel: data.cancel
  });

  wx.onMenuShareQZone({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接
    imgUrl: data.imgUrl, // 分享图标
    success: data.success,
    cancel: data.cancel
  });

}
