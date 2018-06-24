export const TopicScrollMixin = {
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
      busy: false,
      isFirstEnter: false
    };
  },

  components: {},
  created() {
    if (!this._isKeepAlive()) {
      // console.log('ssss', this._isKeepAlive())
      this.itemList = [];
      this.loadMore();
    }

    this.isFirstEnter = true
  },

  mounted() {

  },
  activated() {
    let isFromTopic = this.$route.name === 'topicDetail' && this.$router.params.id

    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.itemList = [];
      this.paginate = {hasMore: true};
      this.loadMore();
    } else if (isFromTopic) {
      let topicId = this.$router.params.id

    }

    this.$route.meta.isBack = false
    this.isFirstEnter = false
  },

  methods: {
    _isKeepAlive() {
      return this.$route && this.$route.meta.keepAlive;
    },

    getItemList(param = {page: 1}) {
      throw new Error('must implement this');
    },

    async loadMore() {
      this.busy = true;
      if (!this.paginate.hasMore) {
        this.busy = false;
        return;
      }
      try {
        // const app = document.querySelector('.scroll-content')
        // const height = app.clientHeight;
        // app.style.height = height + 10 + 'px';
        await this.getItemList({page: this.paginate.nextPage});
        // 避免滑动太快
        setTimeout(() => {
        }, 500);
        this.busy = false;
      } catch (e) {
        this.busy = false;
      }
    },

    pagination(headers = {}) {
      const currentPage = parseInt(headers['x-current-page']);
      const perPage = parseInt(headers['x-per-page']);
      const total = parseInt(headers['x-total']);
      const hasMore = currentPage * perPage < total;
      const nextPage = hasMore ? currentPage + 1 : currentPage;
      const prevPage = currentPage > 1 ? currentPage - 1 : 1;

      this.paginate.currentPage = currentPage;
      this.paginate.total = total;
      this.paginate.perPage = perPage;
      this.paginate.nextPage = nextPage;
      this.paginate.prevPage = prevPage;
      this.paginate.hasMore = hasMore;
    },
  },
};
