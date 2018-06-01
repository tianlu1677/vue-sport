<template>
  <div class="categories scroll-wrapper">
    <div class="domain-list" v-for="(category, index) in categories">
      <h1 class="name">{{category.name}}</h1>
      <ul class="item-list">
        <li class="item" v-for="(sub_category, index) in category.sub_categories" :key="index">
          <category :category="sub_category"></category>
        </li>
      </ul>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import Category from 'components/category/category'
  import BottomNav from 'components/bottom-nav/bottom-nav'
  import {getCategories} from '@/api/category_api'

  export default {
    name: "categories",
    components: {
      Category,
      BottomNav
    },

    data() {
      return {
        categories: []
      }
    },

    created() {
      this._getCategories()
    },
    methods: {
      async _getCategories() {
        const response = await getCategories()
        this.categories = response.categories
      }
    }
  }
</script>

<style scoped lang="scss">
  .categories {
    padding: 0 17.5px;
    margin-bottom: 50px;

    .domain-list {
      display: inline-block;
      margin-bottom: 17.5px;
      .name {
        font-size: 22px;
        font-weight: bolder;
        padding-bottom: 17px;
      }
      .item-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 16.5px;
        justify-items: start;
        .item {
          display: inline-block;
          margin-bottom: 16.5px;
        }
      }
    }
    .domain-list:last-child {
      margin-bottom: 20px;
    }
  }

</style>
