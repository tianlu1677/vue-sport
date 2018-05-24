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
            @handleClick="handleStar"
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
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "lesson-actions",
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
    display: flex;
    .icon-wrapper {
      flex: 1;
      margin-left: 20px;
    }
  }
</style>
