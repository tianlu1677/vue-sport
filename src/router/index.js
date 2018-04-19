import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from 'containers/home/home'
import Categories from 'containers/categories/categories'
import Account from 'containers/accounts/account'
import CourseDetail from 'containers/courses/course-detail'
import LessonDetail from 'containers/lessons/lesson-detail'
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
      component: Account
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
    }
  ]
})
