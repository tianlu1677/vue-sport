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

  export default {
    name: "lesson-actions",
    props: {
      courseDetail: {
        type: Object
      }
    },
    data() {
      return {}
    },
    created() {

    },

    computed: {},
    methods: {
      ...mapActions([
        'lessonCreateAction',
        'lessonDestroyAction'
      ]),
      handlePraise() {
        if (this.courseDetail.praise) {
          this.lessonDestroyAction({lesson_id: this.courseDetail.id, type: 'praise'})
        } else {
          this.lessonCreateAction({lesson_id: this.courseDetail.id, type: 'praise'})
        }
      },
      handleStar() {
        if (this.courseDetail.star) {
          this.lessonDestroyAction({lesson_id: this.courseDetail.id, type: 'star'})
        } else {
          this.lessonCreateAction({lesson_id: this.courseDetail.id, type: 'star'})
        }
      },
      handleShare() {
        console.log('share')
        this.lessonCreateAction({lesson_id: this.courseDetail.id, type: 'share'})
      }
    },

  }
</script>

<style scoped lang="scss">
  .action-list {
    li.icon-block {
      display: inline-block;
      position: relative;
      /*margin: 0 20px 0 0;*/
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
