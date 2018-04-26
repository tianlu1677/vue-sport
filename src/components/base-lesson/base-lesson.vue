<template>
  <router-link :to="{path: `/lessons/${baseLesson.id}`}" exact>
    <div class="lesson-wrapper">
    <div class="lesson">
      <div class="cover">
        <img :src="baseLesson.cover_url" alt="" height="47.5" width="68.5">
      </div>
      <div class="name">
        <span>{{baseLesson.name}}</span>
      </div>
    </div>
  </div>
  </router-link>
</template>

<script>
  export default {
    name: "base-lesson",
    props: {
      baseLesson: {
        type: Object,
        default: function () {
          return {
            id: '',
            cover_ur: '',
            name: ''
          }
        }
      }
    },

    methods: {
      goLessonDetail() {
        this.$router.push({name: 'lessonDetail', params: {id: this.baseLesson.id}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .lesson-wrapper {
    display: inline-block;
    border: solid 1px $gray;
    border-radius: 10px;
    word-break: break-word;
    overflow: hidden;
    .lesson {
      display: flex;
      padding: 10px;
      height: 47.5px;
      .cover {
        > img {
          border-radius: 10px;
        }
      }
      .name {
        flex: 1;
        height: 47.5px;
        padding-left: 7.5px;
        overflow: hidden;
        font-size: 13px;
        font-weight: bolder;
        line-height: 15.5px;
      }
    }
  }

</style>
