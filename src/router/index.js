import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from 'containers/home/home'
import Categories from 'containers/categories/categories'

// 用户相关
import AccountDetail from 'containers/accounts/account-detail'
import EditAccount from 'containers/accounts/edit-account'

import CourseDetail from 'containers/courses/course-detail'
import LessonDetail from 'containers/lessons/lesson-detail'
import NewTopic from 'containers/topics/new-topic'

import Mine from 'containers/mine/mine'
import RecommendCourses from 'containers/recommend/recommend-courses'

// const HelloWorld = (resolve) => {
//   import('@/components/HelloWorld').then((module) => {
//     resolve(module)
//   })
// }

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/categories/:id',
      name: 'recommend_courses',
      component: RecommendCourses
    },

    {
      path: '/accounts/:id',
      component: AccountDetail
    },
    {
      path: '/accounts/:id/edit',
      component: EditAccount
    },
    {
      path: '/courses/:id',
      component: CourseDetail,
      children: []
    },
    {
      path: '/lessons/:id',
      component: LessonDetail
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/topics/new',
      component: NewTopic
    }
  ]
})
