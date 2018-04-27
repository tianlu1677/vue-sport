<template>
  <div class="detail">
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
</template>

<script>
  import {mapGetters} from 'vuex'
  import {courseDetail} from "@/store/getters";
  import Tag from 'base/tag/tag'

  export default {
    name: "course-info",
    components: {
      Tag
    },

    data() {
      return {
        detailShow: true,
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
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    color: $black;
    background: $white;
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
</style>
