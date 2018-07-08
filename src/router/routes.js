// import Home from 'pages/home/home'
// import Login from 'pages/login/login'
// import SignIn from 'pages/login/sign_in'

// //领域
// import Categories from 'pages/categories/categories'
// import RecommendCourses from 'pages/recommend/recommend-courses'

// // 用户相关
// import AccountDetail from 'pages/accounts/account-detail'
// import EditAccount from 'pages/mine/edit-account'
// import Mine from 'pages/mine/mine'
// import NewFeedback from 'pages/feedbacks/new-feedback'

// import MinePublishTopics from 'pages/mine/views/publish-topics'
// import MineCourses from 'pages/mine/views/courses'
// import MineStar from 'pages/mine/views/star'

// //课程与课时
// import CourseDetail from 'pages/courses/course-detail'
// import LessonDetail from 'pages/lessons/lesson-detail'

// //心得
// import New from 'pages/topics/new'
// import TopicDetail from 'pages/topics/topic-detail'

const Home = () => import('pages/home/home')
const Login = () => import('pages/login/login')
const SignIn = () => import('pages/login/sign_in')

const Categories = () => import('pages/categories/categories')
const RecommendCourses = () => import('pages/recommend/recommend-courses')

const AccountDetail = () => import('pages/accounts/account-detail')
const EditAccount = () => import('pages/mine/edit-account')
const Mine = () => import('pages/mine/mine')
const NewFeedback = () => import('pages/feedbacks/new-feedback')

const MinePublishTopics = () => import('pages/mine/views/publish-topics')
const MineCourses = () => import('pages/mine/views/courses')
const MineStar = () => import('pages/mine/views/star')

const CourseDetail = () => import('pages/courses/course-detail')
const LessonDetail = () => import('pages/lessons/lesson-detail')

const New = () => import('pages/topics/new')
const TopicDetail = () => import('pages/topics/topic-detail')

const url = process.env.REDIRECT_URL

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
      keepAlive: true,
      share: 'list',
      isBack: false
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
      share: 'list'
    }
  },
  {
    path: '/categories/:id',
    name: 'recommendCourses',
    component: RecommendCourses,
    meta: {
      share: 'list'
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
      loading: true,
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/lessons/:id',
    name: 'lessonDetail',
    component: LessonDetail,
    meta: {
      auth: true,
      title: '',
      loading: true,
      keepAlive: true,
      isBack: false
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
