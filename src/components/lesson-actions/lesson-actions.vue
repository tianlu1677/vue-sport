<template>
  <div class="action-list">
    <action icon="icon-write"
            :count="lessonDetail.topics_count"
            @handleClick="goNewTopic"
            class="icon-wrapper"
    >
    </action>

    <action :icon="lessonDetail.praise ? 'icon-praise-solid' : 'icon-praise'"
            :count="lessonDetail.praises_count"
            @handleClick="handlePraise"
            class="icon-wrapper"
    >
    </action>

    <action :icon="lessonDetail.star ? 'icon-star-solid' : 'icon-star'"
            :count="lessonDetail.stars_count"
            @handleClick="handleStar"
            class="icon-wrapper"
    >
    </action>

    <share-action
      :count="lessonDetail.shares_count"
      class="icon-wrapper"
    >
    </share-action>
  </div>
</template>

<script>
  import Action from 'components/actions/action';
  import ShareAction from 'components/actions/share-action';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: 'lesson-actions',
    components: {
      Action,
      ShareAction,
    },
    props: {},
    data() {
      return {};
    },
    created() {
    },

    computed: {
      ...mapGetters({
        lessonDetail: 'lessonDetail',
      }),
    },
    methods: {
      ...mapActions([
        'lessonCreateAction',
        'lessonDestroyAction',
      ]),
      handlePraise() {
        if (this.lessonDetail.praise) {
          this.lessonDestroyAction({lesson_id: this.lessonDetail.id, type: 'praise'});
        } else {
          this.lessonCreateAction({lesson_id: this.lessonDetail.id, type: 'praise'});
        }
      },
      handleStar() {
        if (this.lessonDetail.star) {
          this.lessonDestroyAction({lesson_id: this.lessonDetail.id, type: 'star'});
        } else {
          this.lessonCreateAction({lesson_id: this.lessonDetail.id, type: 'star'});
        }
      },
      handleShare() {
        console.log('share');
        this.lessonCreateAction({lesson_id: this.lessonDetail.id, type: 'share'});
      },
      goNewTopic() {
        this.$router.push({
          path: `/topics/new?course_id=${this.lessonDetail.id}&type=lesson`,
        });
      },
    },

  };
</script>

<style scoped lang="scss">
  .action-list {
    display: flex;
    .icon-wrapper {
      flex: 1;
      margin-left: 10px;
    }
  }
</style>
