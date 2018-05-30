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
            noMore: ''
          }
        },
        bounce: {
          top: false,
          bottom: true
        },
        bounceTime: 400,
        pullDownRefresh: false,
        refreshDelay: 5
        // stopPropagation: true
      },
    }
  },

  watch: {
    itemList() {
      if (this.itemList.length < 1) {
        // this.scrollOptions.pullUpLoad.txt.noMore = ''
        // this.$refs.scroll.forceUpdate()
        // this.scrollOptions.pullUpLoad = {}
      }
    }
  },
  created() {
    this.itemList = []
    this.getItemList()
    this._refresh()
  },

  mounted() {

  },

  activated() {
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
          if (!this.paginate.hasMore) {
            this.$refs.scroll.forceUpdate()
          }
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
      let hasMore = currentPage * perPage < total
      let nextPage = hasMore ? currentPage + 1 : currentPage
      let prevPage = currentPage > 1 ? currentPage - 1 : 1

      this.paginate.currentPage = currentPage
      this.paginate.total = total
      this.paginate.perPage = perPage
      this.paginate.nextPage = nextPage
      this.paginate.prevPage = prevPage
      this.paginate.hasMore = hasMore
    },
    _refresh() {
      if (this.$refs.scroll) {
        this.$refs.scroll.refresh()
      }
    },
  }
}
