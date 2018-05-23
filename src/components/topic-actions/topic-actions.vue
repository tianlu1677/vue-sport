<template>
  <div class="action-list">
      <!--点赞-->
    <action :icon="praise ? 'icon-praise-solid' : 'icon-praise'"
            :count="praises_count"
            @handleClick="handlePraise"
            v-if="actions.praise"
            class="icon-wrapper"
    >
    </action>

    <!--收藏-->

    <action :icon="star ? 'icon-star-solid' : 'icon-star'"
            :count="stars_count"
            @handleClick="handleStar"
            v-if="actions.star"
            class="icon-wrapper"
    >
    </action>

    <!--分享-->
    <action icon="icon-share"
            :count="shares_count"
            @handleClick="handleShare"
            v-if="actions.share"
            class="icon-wrapper"
    >
    </action>
  </div>
</template>

<script>
  import Action from 'components/actions/action'
  import {mapActions} from 'vuex'

  export default {
    name: "topic-actions",
    components: {
      Action
    },
    props: {
      topicDetail: {
        type: Object
      },
      actions: {
        type: Object,
        default: function () {
          return {
            praise: true,
            share: true,
            star: true
          }
        }
      }
    },
    data() {
      return {
        praises_count: this.topicDetail.praises_count,
        stars_count: this.topicDetail.stars_count,
        shares_count: this.topicDetail.shares_count,
        praise: this.topicDetail.praise,
        star: this.topicDetail.star,
      }
    },
    watch: {
      topicDetail() {
        this._syncTopicCount()
      }
    },
    methods: {
      ...mapActions([
        'topicCreateAction',
        'topicDestroyAction'
      ]),
      handlePraise() {
        if (this.praise) {
          this.praises_count -= 1
          this.praise = false
          this.topicDestroyAction({topic_id: this.topicDetail.id, type: 'praise'})
        } else {
          this.praises_count += 1
          this.praise = true
          this.topicCreateAction({topic_id: this.topicDetail.id, type: 'praise'})
        }
      },
      handleStar() {
        if (this.star) {
          this.stars_count -= 1
          this.star = false
          this.topicDestroyAction({topic_id: this.topicDetail.id, type: 'star'})
        } else {
          this.stars_count += 1
          this.star = true
          this.topicCreateAction({topic_id: this.topicDetail.id, type: 'star'})
        }
      },
      handleShare() {
        const toast = this.$createToast({
          txt: '点击右上角分享',
          type: 'correct',
          mask: false,
          time: 1000
        })
        toast.show()

        // this.shares_count += 1
        // this.topicCreateAction({topic_id: this.topicDetail.id, type: 'share'})
      },
      _syncTopicCount() {
        this.praises_count = this.topicDetail.praises_count
        this.stars_count = this.topicDetail.stars_count
        this.shares_count = this.topicDetail.shares_count
        this.praise = this.topicDetail.praise
        this.star = this.topicDetail.star
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
