<template>
  <div class="topic-wrapper">
    <div class="account-wrapper">
      <avatar :account="baseTopic.account" :desc="desc"></avatar>
    </div>
    <div class="main">
      <h2 class="lesson-name">基本动作20</h2>
      <router-link :to="{path: `/topics/${baseTopic.id}` }" tag="div">
        <div class="content-wrapper">
          <div class="content">哈哈哈</div>
          <div class="media">ssss</div>
        </div>
      </router-link>
      <h2 class="course-name">这就是街舞</h2>
    </div>
    <div class="bottom">
      <ul class="actions">
        <li class="item">
          <praise-icon></praise-icon>
        </li>
        <li class="item">
          <comment-icon></comment-icon>
        </li>
        <li class="item">
          <share-icon></share-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Avatar from 'components/avatar/avatar'
  import PraiseIcon from 'components/actions/praise-icon'
  import ShareIcon from 'components/actions/share-icon'
  import CommentIcon from 'components/actions/comment-icon'

  export default {
    name: "base-topic",
    components: {
      Avatar,
      PraiseIcon,
      ShareIcon,
      CommentIcon
    },
    props: {
      desc: '发布了一篇心得',
      baseTopic: {
        type: Object
      }
    }
  }
</script>

<style scoped lang="scss">
  .topic-wrapper {
    .main {
      padding-top: 17.5px;
      .lesson-name {
        padding-bottom: 15px;
        font-size: 15px;
        font-weight: bold;
      }
      .content-wrapper {
        .content {
          font-size: 14px;
          line-height: 22.5px;
        }
        .media {
          padding-top: 15px;
        }
        .course-name {
          padding-top: 15px;
          font-size: 13px;
          font-weight: bold;
        }
      }
    }
    .bottom {
      padding-top: 20px;
      height: 22px;
      .actions {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        .item {
        }
      }
    }
  }

</style>
