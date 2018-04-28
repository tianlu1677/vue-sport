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
        pullDownRefresh: {
          threshold: 90,
          stop: 50,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 10,
          txt: {
            more: '加载更多',
            noMore: '没有更多啦'
          }
        },

        stopPropagation: true
      },
    }
  },

  methods: {
    getItemList(param = {}) {
      throw new Error('must implement this')
    },
    onPullingDown() {
      this.loadMatch('down')
    },
    onPullingUp() {
      this.loadMatch('up')
    },
    loadMatch(type) {
      setTimeout(() => {
        if (type === 'up') {
          console.log('down.....')
          if (this.paginate.lastPage) {
            this.$refs.scroll.forceUpdate()
            setTimeout(() => {
              this.$refs.scroll.scroll.scrollBy(0, 64, 800)
            }, 1000)
          } else {
            this.getItemList({page: this.paginate.nextPage})
          }
        } else {
          this.itemList = []
          this.getItemList()
        }
      }, 1000)
    },
    pagination(headers = {}) {
      let currentPage = parseInt(headers['x-current-page'])
      let total = parseInt(headers['x-total'])
      this.paginate.currentPage = currentPage
      this.paginate.total = total
      this.paginate.nextPage = currentPage + 1
      this.paginate.prevPage = currentPage - 1
      this.paginate.lastPage = currentPage === total
      this.paginate.firstPage = currentPage === 1
    }
  }
}
