<template>
  <div class="comment-list">
    <ul>
      <li v-for="(comment, index) in commentList">
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
      Comment
    },
    props: {
      commentList: {
        type: Array
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

  }
</style>
