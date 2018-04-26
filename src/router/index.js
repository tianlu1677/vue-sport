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

//心得
import NewTopic from 'containers/topics/new-topic'
import EditTopic from 'containers/topics/edit-topic'
import TopicDetail from 'containers/topics/topic-detail'

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
      name: 'recommendCourses',
      component: RecommendCourses
    },

    {
      path: '/accounts/:id',
      name: 'accountDetail',
      component: AccountDetail
    },
    {
      path: '/accounts/:id/edit',
      name: 'editAccount',
      component: EditAccount
    },
    {
      path: '/courses/:id',
      name: 'courseDetail',
      component: CourseDetail,
      children: []
    },
    {
      path: '/lessons/:id',
      name: 'lessonDetail',
      component: LessonDetail
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/feedbacks/new',
      name: 'newFeedback',
      component: NewFeedback
    },
    {
      path: '/topics/new',
      name: 'newTopic',
      component: NewTopic
    },
    {
      path: '/topics/:id',
      name: 'topicDetail',
      component: TopicDetail
    },
    {
      path: '/topics/:id/edit',
      name: 'editTopic',
      component: EditTopic
    }
  ]
})
