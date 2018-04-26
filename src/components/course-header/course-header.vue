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
              <i class="icon-learn-count"></i>
              <span class="text">{{courseDetail.views_count}}</span>
            </div>
            <div class="datetime">
              <i class="icon-datetime"></i>
              <span class="text">{{courseDetail.published_at}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="intro-wrapper">
        <div class="intro" v-if="courseDetail.intro">
          <span>简介：{{courseDetail.intro}}</span>
        </div>
        <div class="detail-arrow" @click="showDetail">
          <i class="icon-arrow-down"></i>
        </div>
      </div>

      <div class="start-learn" @click="starToLearn">
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
        <cube-scroll ref="scroll"
        >
          <div class="detail-wrapper clearfix">
          <ul class="item-list">
            <!--简介-->
            <li class="intro item" v-if="courseDetail.intro">
              <div class="content-wrapper">
                <h1 class="title">简介</h1>
                <i class="icon-cancel cancel" @click="hideDetail"></i>
                <div class="content">
                  <div class="circle"></div>
                  <p class="desc">{{courseDetail.intro}}</p>
                </div>
              </div>
            </li>

            <li class="item" v-for="(info, index) in info_content">
              <div class="content-wrapper">
                <h1 class="title">{{info.text}}</h1>
                <div class="content">
                  <div class="circle"></div>
                  <!--内容展示, 1 标签，2 链接，3 普通文本-->
                  <div v-if="info.key === 'tags'">
                    <div class="tag-list">
                      <tag :tag="tag.name" v-for="(tag) in info.value" :key="tag.id"></tag>
                    </div>
                  </div>

                  <div v-else-if="info.key === 'source_link'">
                    <a :href="info.value" target="_blank">{{info.value}}</a>
                  </div>
                  <div v-else>
                    <p class="desc">{{info.value}}</p>
                  </div>
                </div>
              </div>
            </li>
            </ul>
        </div>
        </cube-scroll>
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
        courseDetail: 'courseDetail'
      }),

      info_content() {
        const courseInfo = this.courseDetail.course_info
        if (!!courseInfo.pretty_infos) {
          let infoContent = []
          infoContent = courseInfo.pretty_infos.filter((info) => {
            if (info.value && info.value !== '') {
              return info
            }
          })
          infoContent.push({key: 'tags', text: '标签', value: this.tag_list})
          return infoContent
        }
      },
      tag_list() {
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
      starToLearn() {
        //   跳转到具体的页面
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";
  .header {
    position: relative;
    height: 217px;
    background: rgba(1, 1, 1, 0.5);
    .header-wrapper {
      position: relative;
      padding: 17.5px;
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
          position: relative;
          .name {
            @include multi-line-text(2);
            font-size: 14px;
            line-height: 18px;
          }
          .bottom-wrapper {
            position: absolute;
            bottom: 0;
            overflow: hidden;
            .count {
              margin-bottom: 5px;
            }
            .count, .datetime {
              font-size: 16px;
              .text {
                font-size: 12px;
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
          @include multi-line-text(2);
          position: relative;
          font-size: 12px;
          line-height: 15px;
          margin-right: 35px;
        }
        .detail-arrow {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 14px;
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
      right: 0;
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
