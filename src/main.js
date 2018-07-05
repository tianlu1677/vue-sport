import Vue from 'vue';
import ba from 'vue-ba';
import {sync} from 'vuex-router-sync';
import App from './App';
import VueLazyload from 'vue-lazyload';
import router from './router';
import fastclick from 'fastclick';
import store from './store';
import {wechatShare} from './common/js/wx_config';
import CubeComponents from '@/cube-components';
// import VuxComponents from '@/vux-components';

import 'common/styles/index.scss';


// 修复IOS滑动效果
import EdgeCheck from 'vue-edge-check';

Vue.use(EdgeCheck, {edge_duration: 1000});

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.use(VueLazyload, {
  loading: require('common/images/loading.gif'),
});

// 百度统计
Vue.use(ba, 'ba74e6de1f52fe609068886af2fa09ca');
window.ba = ba;

// 微信分享
window.wechatShare = wechatShare;

// 绑定路由与vuex
const unsync = sync(store, router);

// 无限滚动
import infiniteScroll from 'vue-infinite-scroll';

Vue.use(infiniteScroll);

import vueScrollBehavior from 'vue-scroll-behavior';

Vue.use(vueScrollBehavior, {router});

// filter
import {formatNumber} from './common/js/util';

Vue.filter('format_number', value => formatNumber(value));

//
// import Navigation from 'vue-navigation'
// Vue.use(Navigation, {router, store, moduleName: 'nav', keyName: 'xue'})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

// unsync()
