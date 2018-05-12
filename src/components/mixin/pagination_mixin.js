export const paginationMixin = {
  data() {
    return {
      itemList: [],
      paginate: {
        currentPage: 1,
        nextPage: 1,
        prevPage: 0,
        total: 1,
        firstPage: true,
        lastPage: false
      },
      scrollOptions: {
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: false,
            noMore: '没有更多啦'
          }
        },
        // stopPropagation: true
      },
    }
  },

  methods: {
    getItemList(param = {page: 1}) {
      throw new Error('must implement this')
    },
    onPullingDown() {
      this.loadMatch('down')
    },
    onPullingUp() {
      this.loadMatch('up')
    },
    refresh() {

    },
    loadMatch(type) {
      if (type === 'up') {
        console.log('up....')
        if (this.paginate.lastPage) {
          this.$refs.scroll.forceUpdate()
          return
        }
        try {
          this.getItemList({page: this.paginate.nextPage})
        } catch (e) {
          console.log('error...', e)
          this.$refs.scroll.forceUpdate()
        }
      } else {
        // console.log('up....')
        //  下拉刷新
      }
    },
    pagination(headers = {}) {
      let currentPage = parseInt(headers['x-current-page'])
      let perPage = parseInt(headers['x-per-page'])
      let total = parseInt(headers['x-total'])
      this.paginate.currentPage = currentPage
      this.paginate.total = total
      this.paginate.nextPage = currentPage + 1
      this.paginate.prevPage = currentPage - 1
      this.paginate.lastPage = currentPage * perPage >= total
      this.paginate.firstPage = currentPage === 1
    }
  }
}
