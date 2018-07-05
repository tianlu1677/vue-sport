import Vue from 'vue';
import {
  Style,
  Input,
  Loading,
  ActionSheet,
  IndexList,
  Scroll,
  Slide,
  Button,
  Toast,
  Popup,
  Form,
  createAPI,
  Upload,
  Swipe,
  Picker,
  DatePicker,
  Dialog,
  TabBar,
  Toolbar
} from 'cube-ui';


Vue.use(IndexList);
Vue.use(Scroll);
Vue.use(Input);
Vue.use(Slide);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Upload);
Vue.use(Swipe);
Vue.use(ActionSheet);
Vue.use(Picker);
Vue.use(DatePicker);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(TabBar);
Vue.use(Toolbar);

// 课时列表
import LessonListDialog from './components/lesson-list/lesson-list-dialog';

createAPI(Vue, LessonListDialog, [], false);

import CubeShareDialog from './components/dialog/share-dialog';

createAPI(Vue, CubeShareDialog, [], false);

const CubeComponents = {};
export default CubeComponents;
