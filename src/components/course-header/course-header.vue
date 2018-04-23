<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="main">
        <div class="cover">
          <img :src="courseDetail.cover_url" width="109" height="76" style="border-radius: 10px">
        </div>
        <div class="content">
          <h2 class="name">{{courseDetail.name}}</h2>
          <div class="bottom-wrapper">
            <div class="count">
              <span class="icon-learn-count icon"></span>
              <span>{{courseDetail.views_count}}</span>
            </div>
            <div class="time">
              <span class="icon-learn-count icon"></span>
              <span>{{courseDetail.published_at}}</span>
            </div>
          </div>

        </div>
      </div>

      <div class="intro-wrapper">
        <div class="intro">
          <span>简介：{{courseDetail.intro}}</span>
        </div>
        <div class="detail-arrow" @click="showDetail">
          <span class="icon-arrow-down"></span>
        </div>
      </div>

      <div class="start-learn">
        <cube-button class="start-button">
          开始学习
        </cube-button>
      </div>
    </div>

    <div class="background">
      <img :src="courseDetail.cover_url" width="100%" height="100%" alt="">
    </div>

    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <ul class="item-list">
              <li class="intro item">
                <div class="content-wrapper">
                  <h1 class="title">简介</h1>
                  <span class="icon-cancel cancel" @click="hideDetail"></span>
                  <div class="content">
                    <div class="circle"></div>
                    <p class="desc">{{courseDetail.intro}}</p>
                  </div>
                </div>
              </li>

              <li class="item" v-for="(info, index) in info_content">
                <div class="content-wrapper" v-if="info.key === 'tags'">
                  <h1 class="title">{{info.text}}</h1>
                  <div class="content">
                    <div class="circle"></div>
                    <span>
                      <tag :tag="tag" v-for="(tag, index) in info.value" :key="tag"></tag>
                    </span>
                  </div>
                </div>

                <div class="content-wrapper" v-else>
                  <h1 class="title">{{info.text}}</h1>
                  <div class="content">
                    <div class="circle"></div>
                    <p class="desc">{{info.value}}</p>
                  </div>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Tag from 'base/tag/tag'
  import {mapGetters} from 'vuex'


  export default {
    name: "course-header",
    components: {Tag},

    data() {
      return {
        detailShow: false
      }
    },

    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail',
        courseInfo: 'courseInfo'
      }),

      info_content() {
        if (this.course_info) {
          let info_content = []
          info_content = this.courseInfo.pretty_infos.filter((info) => {
            if (info.value && info.value !== "") {
              return info
            }
          })
          info_content.push({key: 'tags', text: '标签', value: this.courseDetail.tag_list})
          return info_content
        }
      },

      tags() {
        return this.courseDetail.tags
      }
    },

    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      },
    }
  }
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    height: 217px;
    background: rgba(1, 1, 1, 0.5);
    .header-wrapper {
      position: relative;
      padding: 16.5px;
      color: $white;
      overflow: hidden;
      text-overflow: ellipsis;
      .main {
        display: flex;
        margin-bottom: 16.5px;
        .cover {
          flex: 0 0 76px;
          width: 109px;
          padding-right: 17.5px;
        }
        .content {
          flex: 1;
          .name {
            margin-bottom: 25px;
            font-size: $font-middle;
            line-height: 18px;
          }
          .bottom-wrapper {
            overflow: hidden;
            font-size: 12px;
            .count {
              margin-bottom: 5px;
              .icon {
                font-size: 16px;
              }
            }
          }
        }
      }
      .intro-wrapper {
        display: flex;
        position: relative;
        flex-direction: row;
        justify-content: baseline;

        .intro {
          flex: 0 0 298px;
          height: 30px;
          overflow: hidden;
          position: relative;
          font-size: 12px;
          line-height: 15px;
          margin-right: 35px;
        }
        .detail-arrow {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 15px;
        }
      }

      .start-learn {
        margin: 16.5px 0px 16.5px 0px;
        display: flex;
        height: 42.5px;
        .start-button {
          background-color: $red;
          border-radius: 6px;
          font-size: 18px;
          padding: 0 0;
        }
      }

    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 100;
      color: $black;
      background: $white;
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
          .content-wrapper {
            .title {
              padding-bottom: 18px;
              font-size: 17px;
              font-weight: bold;
            }
            .cancel {
              position: absolute;
              top: 17.5px;
              right: 17.5px;
              font-size: 10px;
            }
            .content {
              display: flex;
              .circle {
                width: 17px;
                height: 22px;
                background: url('../../common/images/circle-solid.png') no-repeat center;
              }
              .desc {
                flex: 1;
                font-size: 14px;
                line-height: 22px;
              }
            }
          }
        }
      }

    }
  }
</style>
