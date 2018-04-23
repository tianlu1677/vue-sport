import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from 'containers/home/home'

//领域
import Categories from 'containers/categories/categories'
import RecommendCourses from 'containers/recommend/recommend-courses'

// 用户相关
import AccountDetail from 'containers/accounts/account-detail'
import EditAccount from 'containers/accounts/edit-account'
import Mine from 'containers/mine/mine'
import NewFeedback from 'containers/feedbacks/new-feedback'

//课程与课时
import CourseDetail from 'containers/courses/course-detail'
import LessonDetail from 'containers/lessons/lesson-detail'
import NewTopic from 'containers/topics/new-topic'

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
    },
    {
      path: '/feedbacks/new',
      component: NewFeedback
    }

  ]
})
