<template>
  <div class="action-list">
    <ul>
      <!--点赞-->
      <li class="icon-block" @click="handlePraise">
        <div class="content">
          <i :class="[courseDetail.praise ? 'icon-praise-solid' : 'icon-praise']"></i>
          <span class="text">{{courseDetail.praises_count}}</span>
        </div>
      </li>
      <!--收藏-->
      <li class="icon-block" @click="handleStar">
        <div class="content">
          <i :class="[courseDetail.star ? 'icon-star-solid' : 'icon-star']"></i>
          <span class="text">{{courseDetail.stars_count}}</span>
        </div>
      </li>
      <!--分享-->
      <li class="icon-block" @click="handleShare">
        <div class="content">
          <i class="icon-share"></i>
          <span class="text">{{courseDetail.shares_count}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {getCourseAccountStatus} from '@/api/course_api'

  export default {
    name: "course-actions",
    props: {
      course_id: {
        type: Number
      }
    },
    data() {
      return {
        praise: false,
        star: false
      }
    },
    created() {

      // this._getAccountCourseStatus()
    },

    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail'
      })
    },
    methods: {
      ...mapActions([
        'courseCreateAction',
        'courseDestroyAction'
      ]),
      handlePraise() {
        if (this.courseDetail.praise) {
          this.courseDestroyAction({course_id: this.courseDetail.id, type: 'praise'})
        } else {
          this.courseCreateAction({course_id: this.courseDetail.id, type: 'praise'})
        }
      },
      handleStar() {
        if (this.courseDetail.star) {
          this.courseDestroyAction({course_id: this.courseDetail.id, type: 'star'})
        } else {
          this.courseCreateAction({course_id: this.courseDetail.id, type: 'star'})
        }
      },
      handleShare() {
        console.log('share')
      }
    },

  }
</script>

<style scoped lang="scss">
  .action-list {
    li.icon-block {
      display: inline-block;
      position: relative;
      margin: 0 20px 0 0;
      font-size: 0;
      height: 21px;
      .content {
        display: flex;
        font-size: 21px;
        .text {
          margin: auto 5px;
          font-size: 14px;
          line-height: 21px;
        }
      }
    }
    li:last-child {
      margin: 0;
    }
  }
</style>
