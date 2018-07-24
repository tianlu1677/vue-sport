<template>
  <div class="comment-list">
    <div class="content">
      <h2 class="text">评论</h2>
      <span class="comments-count">{{comments_count}}</span>
    </div>
    <ul>
      <li v-for="(comment, index) in commentList" :id="`comment-${comment.id}`">
        <comment :comment="comment">
        </comment>
      </li>
    </ul>
  </div>
</template>

<script>
  import Comment from 'components/comments/comment'

  export default {
    name: "comment-list",
    components: {
      Comment,
    },
    props: {
      commentList: {
        type: Array
      },
      comments_count: {
        type: Number
      }
    },
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .comment-list {
    .content {
      display: flex;
      align-items: flex-end;
      padding: 0 0 17.5px 0;
      .text {
        font-size: 22px;
        font-weight: bolder;
        vertical-align: baseline;
      }
      .comments-count {
        flex: 1;
        padding-left: 7.5px;
        color: $gray;
        font-size: 12px;
      }
    }
    li:last-child {
      .comment {
        margin-bottom: 0;
      }
    }
  }
</style>
