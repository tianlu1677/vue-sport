import {getWechatApiConfig} from "@/api/wechat_api";

export async function wechatShare(shareData = {}) {
  let isWechat = navigator.userAgent.indexOf('MicroMessenger') > -1
  if (!isWechat) {
    console.log('not wechat')
    return
  }
  let defaultData = {
    title: `每日新学`,
    desc: `内容`,
    link: `${window.location.href}`,
    image_url: ``, //分享出来的图片的
    success: function (res) {
      return res
    },
    cancel: function (res) {
      console.log(res)
      return res
    }
  }

  let data = {...defaultData, ...shareData}
  const res = await getWechatApiConfig({
    url: window.location.href,
    chose_api: 'onMenuShareAppMessage,onMenuShareTimeline',
    debug: false
  })
  console.log('res', res)
  wx.config({
    debug: false,
    appId: res.appId,
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
  })

  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: data.title,
      link: data.link,
      imgUrl: data.image_url,
      success: data.success,
      cancel: data.cancel,
    })
    wx.onMenuShareAppMessage({
      title: data.title,
      desc: data.desc,
      link: data.link,
      imgUrl: data.image_url,
      type: data.type,
      dataUrl: data.data_url,
      success: data.success,
      cancel: data.cancel
    })
  })
}
