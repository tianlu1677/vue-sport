<template>
  <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <ul>
            <li class="intro item">
              <h1>简介</h1>
              <p>{{course.intro}}</p>
            </li>
            <li class="item">
              <h1>简介</h1>
              <div>
                  <span class="circle">
                  </span>
                <p>{{course.intro}}</p>
              </div>

            </li>
          </ul>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "course-profile"
  }
</script>

<style scoped lang="scss">
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    /*opacity: 1;*/
    color: $black;
    background: $white;
    /*background: rgba(7, 17, 27, 0.8);*/
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s
    }

    &.fade-enter, &.fade-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0)
    }
    .detail-wrapper {
      padding: 17.5px;
      .item {
        padding-bottom: 27.5px;
        h1 {
          font-size: 17px;
          font-weight: bold;
          padding-bottom: 18px;
        }
        .circle {
          background-image: ('../../common/images/circle-solid.png');
        }
        p {
          padding-left: 17px;
          font-size: 14px;
          line-height: 20px;
          /*TODO 这里line-height是多少*/

        }
      }
    }

  }
</style>
