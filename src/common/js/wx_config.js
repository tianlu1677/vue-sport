import {getWechatApiConfig} from "@/api/wechat_api";

export async function wechatShare(shareData = {}) {
  let isWechat = navigator.userAgent.indexOf('MicroMessenger') > -1
  if (!isWechat) {
    console.log('not wechat')
    return
  }
  let defaultData = {
    title: `每日新学`,
    desc: "每日新学，跟朋友一起每天学习新东西！",
    link: `${window.location.href}`,
    type: 'link',
    imgUrl: '', //分享出来的图片的
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
      imgUrl: data.imgUrl,
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

    wx.onMenuShareQQ({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link, // 分享链接
      imgUrl: data.image_url, // 分享图标
      success: data.success,
      // 用户确认分享后执行回调函数

      cancel: data.cancel
      // 用户取消分享后执行的回调函数
    });

    wx.onMenuShareQZone({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link, // 分享链接
      imgUrl: data.image_url, // 分享图标
      success: data.success,
      // 用户确认分享后执行的回调函数

      cancel: data.cancel
      // 用户取消分享后执行的回调函数

    });

  })
}
