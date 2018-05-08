import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from '../store'

import Home from 'containers/home/home'
import Login from 'containers/login/login'

//领域
import Categories from 'containers/categories/categories'
import RecommendCourses from 'containers/recommend/recommend-courses'

// 用户相关
import AccountDetail from 'containers/accounts/account-detail'
import EditAccount from 'containers/mine/edit-account'
import Mine from 'containers/mine/mine'
import NewFeedback from 'containers/feedbacks/new-feedback'
import PublishTopics from 'containers/accounts/views/publish-topics'
import PublishCourses from 'containers/accounts/views/publish-courses'
import LearnCourses from 'containers/accounts/views/learn-courses'

import MinePublishTopics from 'containers/mine/views/publish-topics'
import MineCourses from 'containers/mine/views/courses'

//课程与课时
import CourseDetail from 'containers/courses/course-detail'
import CourseInfo from 'containers/courses/course-info'
import LessonDetail from 'containers/lessons/lesson-detail'

//心得
import NewTopic from 'containers/topics/new-topic'
import New from 'containers/topics/new'
import EditTopic from 'containers/topics/edit-topic'
import TopicDetail from 'containers/topics/topic-detail'

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
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
      component: Categories
    },
    {
      path: '/categories/:id',
      name: 'recommendCourses',
      component: RecommendCourses
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
        auth: true
      }
    },
    {
      path: '/courses/:id/info',
      name: 'courseInfo',
      component: CourseInfo,
      meta: {
        auth: true
      }
    },
    {
      path: '/lessons/:id',
      name: 'lessonDetail',
      component: LessonDetail,
      meta: {
        auth: true
      }
    },

    // 心得相关
    {
      path: '/topics/new',
      name: 'newTopic',
      component: NewTopic,
      meta: {
        auth: true
      }
    },
    {
      path: '/topics/new-topic',
      name: 'new-topic',
      component: New,
      meta: {
        auth: true
      }
    },

    {
      path: '/topics/:id',
      name: 'topicDetail',
      component: TopicDetail,
      meta: {
        auth: true
      }
    },
    {
      path: '/topics/:id/edit',
      name: 'editTopic',
      component: EditTopic,
      meta: {
        auth: true
      }
    },

    // 用户相关
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        auth: true
      },
      children: [
        {
          path: 'publish_topics',
          component: MinePublishTopics
        },
        {
          path: 'courses',
          component: MineCourses,
          meta: {
            auth: true
          },
        },
      ]
    },
    {
      path: '/mine/edit',
      name: 'editAccount',
      component: EditAccount,
      meta: {
        auth: true
      }
    },

    {
      path: '/accounts/:id',
      name: 'accountDetail',
      component: AccountDetail,
      children: [
        {
          path: 'publish_topics',
          component: PublishTopics
        },
        {
          path: 'publish_courses',
          component: PublishCourses,
        },
        {
          path: 'learn_courses',
          component: LearnCourses,
        },
        {
          path: 'star_courses',
          component: LearnCourses,
        },
        {
          path: 'praise_courses',
          component: LearnCourses,
        },
      ]
    },
    {
      path: '/feedbacks/new',
      name: 'newFeedback',
      component: NewFeedback,
      meta: {
        auth: true
      }
    },
  ]
})

// 用户的登录验证
//  需要登录的部分.
// 1. 如果token存在，则请求用户信息 1,获取成功，则更新store中的currentAccount,
// 不存在或者请求不成功，则去调用微信的获取用户信息的接口，发生跳转
// 2. 如果token 不存在，则去调用微信的接口去获取用户的信息
let token = localStorage.getItem('token')
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    await store.dispatch('login')
    localStorage.setItem('next_path', to.fullPath)
    next()
    // localStorage.setItem('next_path', to.fullPath)
    // console.log('router token', token)

    // if (token && token.length > 1) {
    //   await store.dispatch('login')
    //   if (!store.state.currentAccount || !store.state.currentAccount.id) {
    //     window.location.href = url
    //     window.event.returnValue = false;
    //   } else {
    //     next()
    //   }
    // } else {
    //   window.location.href = url
    //   window.event.returnValue = false;
    // }
  } else {
    next()
  }
})

export default router;
