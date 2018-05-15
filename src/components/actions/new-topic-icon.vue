<template>
  <div class="icon-block" @click="goNewTopic">
    <div class="content">
      <i :class="icon"></i>
      <span class="text" v-if="text">{{text}}</span>
      <span class="count" v-if="count">{{count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "new-topic-icon",
    components: {

    },
    props: {
      icon: {
        type: String,
        default: 'icon-write'
      },
      course_id: {
        type: Number,
      },
      course_type: {
        type: String
      },
      text: {
        type: String,
        default: ''
      },
      count: {
        type: String,
        default: ''
      }
    },
    methods: {
      goNewTopic() {
        if (this.course_id && this.course_type) {
          this.$router.push({
            path: `/topics/new?course_id=${this.course_id}&type=${this.course_type}`
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .icon-block {
    position: relative;
    font-size: 0;
    height: 21px;
    .content {
      display: flex;
      font-size: 21px;
      .text {
        margin: auto 11px;
        font-size: 11px;
      }
      .count {
        margin: auto 5px;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
</style>

