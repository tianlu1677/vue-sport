export const paginationMixin = {
  data() {
    return {
      itemList: [],
      paginate: {
        currentPage: 1,
        perPage: 5,
        nextPage: 1,
        prevPage: 0,
        total: 1,
        hasMore: true,
      },
      scrollOptions: {
        pullUpLoad: {
          threshold: 10,
          txt: {
            more: false,
            noMore: '没有更多啦'
          }
        },
        bounce: {
          top: false
        },
        bounceTime: 500,
        pullDownRefresh: false,
        refreshDelay: 5
        // stopPropagation: true
      },
    }
  },

  watch: {
    itemList() {
      if (this.itemList.length < 1) {
        // this.$refs.scroll.forceUpdate()
        // this.scrollOptions.pullUpLoad = {}
      }
    }
  },
  created() {
    // this.itemList = []
  },

  activated() {
    this.itemList = []
    this.getItemList()
    this._refresh()
  },

  methods: {
    getItemList(param = {page: 1}) {
      throw new Error('must implement this')
    },
    onPullingDown() {
      if (this.itemList.length < 1) {
        this.$refs.scroll.forceUpdate()
        return
      }
      this.loadMatch('down')
    },
    onPullingUp() {
      this.loadMatch('up')
    },
    loadMatch(type) {
      if (type === 'up') {
        if (!this.paginate.hasMore) {
          this.$refs.scroll.forceUpdate()
          return
        }
        try {
          this.getItemList({page: this.paginate.nextPage})
        } catch (e) {
          this.$refs.scroll.forceUpdate()
        }
      } else {
        // console.log('up....')
      }
    },
    pagination(headers = {}) {
      let currentPage = parseInt(headers['x-current-page'])
      let perPage = parseInt(headers['x-per-page'])
      let total = parseInt(headers['x-total'])
      this.paginate.currentPage = currentPage
      this.paginate.total = total
      this.paginate.perPage = perPage
      this.paginate.nextPage = currentPage + 1
      this.paginate.prevPage = currentPage - 1
      this.paginate.hasMore = currentPage * perPage < total
    },
    _refresh() {
      if (this.$refs.scroll) {
        this.$refs.scroll.refresh()
      }
    },
  }
}
