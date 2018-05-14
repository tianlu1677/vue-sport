<template>
  <div class="action-list">
    <ul>
      <!--点赞-->
      <li class="icon-block" @click="handlePraise" v-if="actions.praise">
        <div class="content">
          <i :class="[topicDetail.praise ? 'icon-praise-solid' : 'icon-praise']"></i>
          <span class="text">{{topicDetail.praises_count}}</span>
        </div>
      </li>
      <!--收藏-->
      <li class="icon-block" @click="handleStar" v-if="actions.star">
        <div class="content">
          <i :class="[topicDetail.star ? 'icon-star-solid' : 'icon-star']"></i>
          <span class="text">{{topicDetail.stars_count}}</span>
        </div>
      </li>
      <!--分享-->
      <li class="icon-block" @click="handleShare" v-if="actions.share">
        <div class="content">
          <i class="icon-share"></i>
          <span class="text">{{topicDetail.shares_count}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "topic-actions",
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
      return {}
    },
    created() {
      // this.topicCreateAction({topic_id: this.topicDetail.id, type: 'view'})
    },

    computed: {},
    methods: {
      ...mapActions([
        'topicCreateAction',
        'topicDestroyAction'
      ]),
      handlePraise() {
        if (this.topicDetail.praise) {
          this.topicDetail.praises_count += 1
          this.topicDestroyAction({topic_id: this.topicDetail.id, type: 'praise'})
        } else {
          this.topicCreateAction({topic_id: this.topicDetail.id, type: 'praise'})
        }
      },
      handleStar() {
        if (this.topicDetail.star) {
          this.topicDestroyAction({topic_id: this.topicDetail.id, type: 'star'})
        } else {
          this.topicCreateAction({topic_id: this.topicDetail.id, type: 'star'})
        }
      },
      handleShare() {
        console.log('share')
        this.topicCreateAction({topic_id: this.topicDetail.id, type: 'share'})
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
