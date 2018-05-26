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
      console.log(res)
      return res
    }
  }

  let data = {...defaultData, ...shareData}
  const res = await getWechatApiConfig({
    url: getJsUrl(),
    chose_api: 'onMenuShareAppMessage,onMenuShareTimeline,onMenuShareQQ,onMenuShareQZone',
  })
  console.log('res', res)
  wx.config({
    debug: res.debug,
    appId: res.appId,
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone']
  })

  // wx.ready(function () {
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
      // 用户确认分享后执行回调函数

      cancel: data.cancel
      // 用户取消分享后执行的回调函数
    });

    wx.onMenuShareQZone({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link, // 分享链接
      imgUrl: data.imgUrl, // 分享图标
      success: data.success,
      // 用户确认分享后执行的回调函数

      cancel: data.cancel
      // 用户取消分享后执行的回调函数

    });

  // })
}


// 进入页面，控制自定义分享前，把当前页URL替换成进入页的URL（保证自定义分享正常）
// this.setCurrentPage(location.href)
// window.history.replaceState({}, document.title, this.landingPage)
// wx.config()
// wx.ready()
//
// //...
//
// // 离开当前页时，还原当前页的URL（保证返回正常）
// beforeRouteLeave(to, from, next) {
//   window.history.replaceState({}, '', this.currentPage)
//   next()
// }
