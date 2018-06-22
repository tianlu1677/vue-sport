<template>
  <!--<router-link :to="`/lessons/${this.baseLesson.id}`" class="lesson-wrapper" tag="div">-->
  <div class="lesson-wrapper" :class="{'border-active': active}" @click="goLesson">
    <div class="lesson">
      <div class="cover">
        <img :src="baseLesson.cover_url" :alt="baseLesson.id">
      </div>
      <div class="name">
        <span :class="{active: active}">{{baseLesson.name}}</span>
      </div>
    </div>
  </div>
  <!--</router-link>-->
</template>

<script>
  export default {
    name: 'base-lesson',
    props: {
      baseLesson: {
        type: Object,
        default() {
          return {
            id: '',
            cover_ur: '',
            name: '',
          };
        },
      },
      active: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      goLesson() {
        this.$router.push({path: `/lessons/${this.baseLesson.id}`});
      },
    },
  };
</script>

<style scoped lang="scss">
  .lesson-wrapper {
    white-space: normal;
    overflow: hidden;
    z-index: 100;
    border: solid 1px $light_gray; /*off*/
    border-radius: 6px;
    .lesson {
      display: flex;
      padding: 9px 10px;
      word-break: break-word;
      .cover {
        font-size: 0;
        > img {
          height: 47.5px;
          width: 68.5px;
          border-radius: 6px;
        }
      }
      .name {
        flex: 1;
        height: 47.5px;
        padding-left: 7.5px;
        overflow: hidden;
        font-size: 13px;
        font-weight: bolder;
        line-height: 16px;
        color: $gray;
        .active {
          color: $red;
        }
      }
    }
  }

  .border-active {
    border: solid 1px $red;
  }

</style>
