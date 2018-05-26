<template>
  <list :showEmpty="itemList.length <= 0" class="content">
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-up="onPullingUp"
      v-if="itemList.length > 0"
    >
      <div style="margin-top: 17.5px"></div>
      <topic-list :topicList="itemList"></topic-list>
    </cube-scroll>

    <!--<vue-scroll :ops="ops"-->
    <!--@load-activate="handleActivate"-->
    <!--@load-start="handleStart"-->
    <!--@load-before-deactivate="handleBeforeDeactive"-->
    <!--@load-deactivate="handleDeactive"-->
    <!--&gt;-->

    <!--<topic-list :topicList="itemList"></topic-list>-->
    <!--</vue-scroll>-->
  </list>
</template>

<script>
  import List from 'base/list/list'
  import TopicList from 'components/topic-list/topic-list'
  import Empty from 'components/empty/empty'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getCurrentAccountPublishTopics
  } from "@/api/mine_api"

  export default {
    name: "mine-publish-topics",
    components: {
      TopicList,
      Empty,
      List
    },
    mixins: [paginationMixin],

    props: {
      account_id: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        ops: {
          // vuescroll
          vuescroll: {
            mode: 'slide',
            // vuescroll's size(height/width) should be a percent(100%)
            // or be a number that is equal to its parentNode's width or
            // height ?
            sizeStrategy: 'percent',
            // pullRefresh or pushLoad is only for the slide mode...
            pullRefresh: {
              enable: false,
              tips: {
                deactive: 'Pull to Refresh',
                active: 'Release to Refresh',
                start: 'Refreshing...',
                beforeDeactive: 'Refresh Successfully!'
              }
            },
            pushLoad: {
              enable: true,
              tips: {
                deactive: 'Push to Load',
                active: 'Release to Load',
                start: 'Loading...',
                beforeDeactive: 'Load Successfully!'
              }
            },
            paging: false,
            zooming: true,
            snapping: {
              enable: false,
              width: 100,
              height: 100
            },
            // some scroller options
            scroller: {
              /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
              bouncing: true,
              /** Enable locking to the main axis if user moves only slightly on one of them at start */
              locking: true,
              /** Minimum zoom level */
              minZoom: 0.5,
              /** Maximum zoom level */
              maxZoom: 3,
              /** Multiply or decrease scrolling speed **/
              speedMultiplier: 1,
              /** This configures the amount of change applied to deceleration when reaching boundaries  **/
              penetrationDeceleration: 0.03,
              /** This configures the amount of change applied to acceleration when reaching boundaries  **/
              penetrationAcceleration: 0.08,
              /** Whether call e.preventDefault event when sliding the content or not */
              preventDefault: true
            }
          },
          scrollPanel: {
            // when component mounted.. it will automatically scrolls.
            initialScrollY: false,
            initialScrollX: false,
            // feat: #11
            scrollingX: true,
            scrollingY: true,
            speed: 300,
            easing: undefined
          },
          //
          scrollContent: {
            // customize tag of scrollContent
            tag: 'div',
            padding: "10px",
            props: {},
            attrs: {}
          },
          //
          rail: {
            vRail: {
              width: '6px',
              pos: 'right',
              background: '#01a99a',
              opacity: 0
            },
            //
            hRail: {
              height: '6px',
              pos: 'bottom',
              background: '#01a99a',
              opacity: 0
            }
          },
          bar: {
            //
            vBar: {
              background: '#00a650',
              deltaY: 100,
              keepShow: false,
              opacity: 1,
              hover: false
            },
            //
            hBar: {
              background: '#00a650',
              keepShow: false,
              opacity: 1,
              hover: false
            }
          }
        }
      }
    },
    async created() {
      // await this.getItemList()
    },
    methods: {
      async getItemList(params = {}) {
        const res = await getCurrentAccountPublishTopics(params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      },
      // handleActivate(vm, refreshDom) {
      //   console.log(vm, refreshDom, 'handleActive');
      // },
      // handleStart(vm, refreshDom, done) {
      //   console.log(vm, refreshDom, 'handleStart');
      //   setTimeout(() => {
      //     this.loadMatch('up')
      //     done(); // load finished
      //   }, 2000)
      // },
      // handleBeforeDeactive(vm, refreshDom, done) {
      //   console.log(vm, refreshDom, 'handleDeactive');
      //   done();
      // },
      // handleDeactive(vm, refreshDom) {
      //   console.log(vm, refreshDom, 'handleDeactive');
      // },
      //
      // loadMatch(type) {
      //   if (type === 'up') {
      //     if (!this.paginate.hasMore) {
      //       // this.$refs.scroll.forceUpdate()
      //       return
      //     }
      //     try {
      //       this.getItemList({page: this.paginate.nextPage})
      //       done()
      //     } catch (e) {
      //       // this.$refs.scroll.forceUpdate()
      //     }
      //   } else {
      //     // console.log('up....')
      //   }
      // },


    }
  }
</script>

<style scoped lang="scss">


</style>
