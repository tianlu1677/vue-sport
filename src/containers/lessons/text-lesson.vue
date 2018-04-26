<template>
  <div class="text-lesson">
    <div class="header">
      <h1 class="name">吉他第44讲</h1>
      <div class="course">
        <div class="text">所在课程</div>
        <div class="name">
          [手舞足蹈选手飒飒飒飒飒飒]
        </div>
      </div>
    </div>

    <div class="account-wrapper">
      <avatar :account="lessonDetail.account"></avatar>
    </div>

    <div class="main-content">
      <span v-html="lessonDetail.content">
      </span>
    </div>

    <div>
      课时列表
    </div>
    <div>
      心得列表
    </div>

  </div>

</template>

<script>
  import Avatar from 'components/avatar/avatar'

  export default {
    name: "text-lesson",
    components: {
      Avatar
    },
    props: {
      lessonDetail: {
        type: Object,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .text-lesson {
    padding: 17.5px;
    .header {
      padding-right: 83.5px;
      margin-bottom: 15px;
      .name {
        font-size: 18px;
        font-weight: bolder;
      }
      .course {
        display: flex;
        margin-top: 18.5px;
        .text {
          font-size: 12px;
          color: $gray;
        }
        .name {
          font-size: 12px;
          color: $blue;
        }
      }
    }
    .main-content {
      margin-top: 21px;
      margin-bottom: 29px;
      font-size: 14px;
      line-height: 22px;
      word-break: break-word;
      word-wrap: break-word;
      > img {
        width: 100%;
      }
    }

  }
</style>
