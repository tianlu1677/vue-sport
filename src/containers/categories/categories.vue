<template>
  <div class="categories">
    <div class="domain-list" v-for="(category, index) in categories">
      <h1 class="name">{{category.name}}</h1>
      <ul class="item-list">
        <li class="item" v-for="(sub_category, index) in category.sub_categories">
          <category :category="sub_category"></category>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Category from 'components/category/category'
  import {getCategories} from '@/api/category_api'

  export default {
    name: "categories",
    components: {
      category: Category,
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 17.5px;
    .domain-list {
      .name {
        font-size: 22px;
        font-weight: bolder;
        padding-bottom: 17px;
      }
      .item-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 16.5px;
        margin-bottom: 27.5px;
        justify-items: center;
        .item {
          display: inline-block;
          margin-bottom: 16.5px;
        }
      }
    }
  }

</style>
