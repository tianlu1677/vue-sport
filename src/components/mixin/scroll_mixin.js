
export const ScrollMixin = {
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
      busy: false
    }
  },

  components: {
  },
  created() {
    if (!this._isKeepAlive()) {
      console.log('ssss', this._isKeepAlive())
      this.itemList = []
      this.loadMore()
    }
  },

  mounted() {

  },
  activated() {
    this.itemList = []
    this.paginate = {hasMore: true}
    this.loadMore()
  },

  methods: {
    _isKeepAlive() {
      return this.$route && this.$route.meta.keepAlive
    },

    getItemList(param = {page: 1}) {
      throw new Error('must implement this')
    },

    async loadMore() {
      this.busy = true
      if (!this.paginate.hasMore) {
        this.busy = false
        return
      }
      try {
        // const app = document.querySelector('.scroll-content')
        // const height = app.clientHeight;
        // app.style.height = height + 10 + 'px';
        await this.getItemList({page: this.paginate.nextPage})
        // 避免滑动太快
        setTimeout(() => {
        }, 500)
        this.busy = false
      } catch (e) {
        this.busy = false
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
    }
  }
}
