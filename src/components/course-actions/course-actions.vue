<template>
  <div class="action-list">
    <action :icon="courseDetail.praise ? 'icon-praise-solid' : 'icon-praise'"
            :count="courseDetail.praises_count"
            @handleClick="handlePraise"
            class="icon-wrapper"
    >
    </action>

    <action :icon="courseDetail.star ? 'icon-star-solid' : 'icon-star'"
            :count="courseDetail.stars_count"
            @handleClick="handlePraise"
            class="icon-wrapper"
    >
    </action>

    <share-action
      :count="courseDetail.shares_count"
      class="icon-wrapper"
    >
    </share-action>

  </div>
</template>

<script>
  import Action from 'components/actions/action'
  import ShareAction from 'components/actions/share-action'
  import {mapActions} from 'vuex'
  import {getCourseAccountStatus} from '@/api/course_api'

  export default {
    name: "course-actions",
    components: {
      Action,
      ShareAction
    },
    props: {
      courseDetail: {
        type: Object
      }
    },
    data() {
      return {
      }
    },
    created() {
    },

    computed: {
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
        const course_path = window.location.href
        let shareSuccess = false
        const response = window.wechatShare({
          title: this.courseDetail.name,
          desc: this.courseDetail.intro,
          link: course_path,
          image_url: this.courseDetail.cover_url,
          success: (res) => {
            shareSuccess = true
            this.courseCreateAction({course_id: this.courseDetail.id, type: 'share'})
          }
        });
        console.log('response', response)
        if (shareSuccess) {
          this.courseCreateAction({course_id: this.courseDetail.id, type: 'share'})
        }
      }
    },

  }
</script>

<style scoped lang="scss">
  .action-list {
    display: flex;
    .icon-wrapper {
      flex: 1;
      margin-left: 20px;
    }

  }
</style>
