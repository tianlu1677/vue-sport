<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="main">
        <div class="cover">
          <img :src="course.cover_url" width="109" height="76" style="border-radius: 10px">
        </div>
        <div class="content">
          <h2 class="name">{{course.name}}</h2>
          <div class="bottom-wrapper">
            <div class="count">
              <span class="icon-learn-count"></span>
              <span>{{course.views_count}}</span>
            </div>
            <div class="time">
              <span class="icon-learn-count"></span>
              <span>{{course.published_at}}</span>
            </div>
          </div>

        </div>
      </div>

      <div class="intro-wrapper">
        <div class="intro">
          <span>简介：{{course.intro}}</span>
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
      <img :src="course.cover_url" width="100%" height="100%" alt="">
    </div>

    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <ul>
              <li class="intro item">
                <div class="content-wrapper">
                  <h1 class="title">简介</h1>
                  <span class="icon-cancel cancel" @click="hideDetail"></span>
                  <div class="circle"></div>
                  <p>{{course.intro}}</p>
                </div>
              </li>

              <li class="item" v-for="(info, index) in infos">
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
                    <p>{{info.value}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--<div class="detail-close" @click="hideDetail">-->
        <!--<i class="icon-close"></i>-->
        <!--</div>-->
      </div>
    </transition>
  </div>
</template>

<script>
  import Tag from 'base/tag/tag'

  export default {
    name: "course-header",
    components: {Tag},
    props: {
      course: {}
    },
    data() {
      return {
        detailShow: false
      }
    },

    computed: {
      infos() {
        let pretty_infos = []
        pretty_infos = this.course.course_info.pretty_infos.filter((info) => {
          if (info.value && info.value !== "") {
            return info
          }
        })

        pretty_infos.push({key: 'tags', text: '标签', value: this.course.tag_list})
        return pretty_infos
      },

      tags() {
        return this.course.tags
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

<style lang="scss">
  .header {
    position: relative;
    width: 100%;
    height: 217px;
    background: rgba(1, 1, 1, 0.5);
    .header-wrapper {
      padding: 16.5px;
      color: $white;
      overflow: hidden;
      text-overflow: ellipsis;
      .main {
        display: flex;
        position: relative;
        .cover {
          flex: 0 0 76px;
          margin-right: 17.5px;
        }
        .content {
          flex: 1;
          .name {
            line-height: 18px;
            font-size: $font-middle;
            margin-bottom: 5px;
          }
          .bottom-wrapper {
            position: absolute;
            bottom: 0;
            font-size: 12px;
          }
        }
      }
      .intro-wrapper {
        .intro {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          position: relative;
          overflow: hidden;
          font-size: 12px;
          line-height: 15px;
          margin-top: 16.5px;
          margin-right: 50px;
        }
        .detail-arrow {
          position: absolute;
          margin-top: -28px;
          font-size: 15px;
          right: 17.5px;
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
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
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
          .content-wrapper {
            .title {
              font-size: 17px;
              font-weight: bold;
              padding-bottom: 18px;
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
              p {
                flex: 1;
                font-size: 14px;
                line-height: 22px;
                overflow: auto;
                word-break: break-word;
              }
            }
          }
        }
      }

    }
  }
</style>
