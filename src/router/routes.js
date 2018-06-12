import Home from 'pages/home/home'
import Login from 'pages/login/login'
import SignIn from 'pages/login/sign_in'

//领域
import Categories from 'pages/categories/categories'
import RecommendCourses from 'pages/recommend/recommend-courses'

// 用户相关
import AccountDetail from 'pages/accounts/account-detail'
import EditAccount from 'pages/mine/edit-account'
import Mine from 'pages/mine/mine'
import NewFeedback from 'pages/feedbacks/new-feedback'

import MinePublishTopics from 'pages/mine/views/publish-topics'
import MineCourses from 'pages/mine/views/courses'
import MineStar from 'pages/mine/views/star'

//课程与课时
import CourseDetail from 'pages/courses/course-detail'
import LessonDetail from 'pages/lessons/lesson-detail'

//心得
import New from 'pages/topics/new'
import TopicDetail from 'pages/topics/topic-detail'

const appid = 'wxbc7ac724a2717bc0'
const redirect_uri = 'https://xinxue.niubibeta.com/wechat/sessions/new'
const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      auth: true,
      title: '每日新学',
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  // 分类
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: {
      title: '兴趣广场',
    }
  },
  {
    path: '/categories/:id',
    name: 'recommendCourses',
    component: RecommendCourses,
    meta: {
      title: '推荐课程',
    }
  },
  {
    path: '/recommend_topics',
    name: 'recommendTopic',
    // component: RecommendTopic
  },

  // 课程相关
  {
    path: '/courses/:id',
    name: 'courseDetail',
    component: CourseDetail,
    meta: {
      auth: true,
      title: '',
      loading: true,
    }
  },
  {
    path: '/lessons/:id',
    name: 'lessonDetail',
    component: LessonDetail,
    meta: {
      auth: true,
      title: '',
      loading: true
    }
  },

  // 心得相关
  {
    path: '/topics/new',
    name: 'newTopic',
    component: New,
    meta: {
      auth: true,
      title: '写心得'
    }
  },

  {
    path: '/topics/:id',
    name: 'topicDetail',
    component: TopicDetail,
    meta: {
      auth: true,
      title: '心得详情'
    }
  },
  {
    path: '/topics/:id/edit',
    name: 'editTopic',
    component: New,
    meta: {
      auth: true,
      title: '修改心得'
    }
  },

  // 用户相关
  // 个人中心
  {
    path: '/mine',
    name: 'mine',
    component: Mine,
    meta: {
      auth: true,
      title: '我'
    }
  },
  {
    path: '/mine/publish_topics',
    component: MinePublishTopics,
    meta: {
      auth: true,
      title: '我的心得'
    }
  },
  {
    path: '/mine/courses',
    component: MineCourses,
    meta: {
      auth: true
    }
  },
  {
    path: '/mine/star',
    component: MineStar,
    meta: {
      auth: true,
    }
  },
  {
    path: '/mine/edit',
    name: 'editAccount',
    component: EditAccount,
    meta: {
      auth: true,
      title: '编辑个人信息'
    }
  },

  {
    path: '/accounts/:id',
    name: 'accountDetail',
    component: AccountDetail,
    meta: {
      auth: true,
      title: '个人主页'
    }
  },
  {
    path: '/feedbacks/new',
    name: 'newFeedback',
    component: NewFeedback,
    meta: {
      auth: true,
      title: '反馈'
    }
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/sign_up',
    beforeEnter() {
      location.href = url
    }
  }
]

export default routes
