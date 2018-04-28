import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from 'containers/home/home'

//领域
import Categories from 'containers/categories/categories'
import RecommendCourses from 'containers/recommend/recommend-courses'
import RecommendTopic from 'containers/recommend/recommend-topic'

// 用户相关
import AccountDetail from 'containers/accounts/account-detail'
import EditAccount from 'containers/mine/edit-account'
import Mine from 'containers/mine/mine'
import NewFeedback from 'containers/feedbacks/new-feedback'
import PublishTopics from 'containers/accounts/views/publish-topics'
import PublishCourses from 'containers/accounts/views/publish-courses'
import LearnCourses from 'containers/accounts/views/learn-courses'

//课程与课时
import CourseDetail from 'containers/courses/course-detail'
import CourseInfo from 'containers/courses/course-info'
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
      component: RecommendTopic
    },

    // 课程相关
    {
      path: '/courses/:id',
      name: 'courseDetail',
      component: CourseDetail
    },
    {
      path: '/courses/:id/info',
      name: 'courseInfo',
      component: CourseInfo
    },
    {
      path: '/lessons/:id',
      name: 'lessonDetail',
      component: LessonDetail
    },

    // 心得相关
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
    },

    // 用户相关
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/mine/edit',
      name: 'editAccount',
      component: EditAccount
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
        }
      ]
    },
    {
      path: '/feedbacks/new',
      name: 'newFeedback',
      component: NewFeedback
    },
  ]
})
