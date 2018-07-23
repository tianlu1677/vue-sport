export const InfiniteMixin = {
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
    };
  },

  components: {},
  created() {

  },

  mounted() {

  },
  activated() {
  },

  methods: {

    getItemList(param = {page: 1}) {
      throw new Error('must implement this');
    },

    async loadMore($state) {
      if (!this.paginate.hasMore) {
        $state.complete();
        return;
      }
      try {
        await this.getItemList({page: this.paginate.nextPage});

        if (this.paginate.hasMore) {
          $state.loaded()
        } else {
          $state.complete();
        }
        // $state.loaded()
      } catch (e) {
        $state.complete();
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
