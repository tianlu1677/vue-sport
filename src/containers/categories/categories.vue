<template>
  <div class="category-list">
    <div class="domain-list" v-for="(category, index) in categories">
      <h1>{{category.name}}</h1>
      <ul>
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
  .category-list {
    padding: 17px;

    .domain-list {
      h1 {
        font-size: 22px;
        line-height: 1;
        padding-bottom: 17px;

      }
      .item {
        display: inline-block;
        padding-right: 16px;
        padding-bottom: 16px;
        &:last-child {
          padding-right: 0;
        }
      }

    }

  }

</style>

<!--.运动 {-->
<!--font-size: 44px;-->
<!--font-family: "PingFang";-->
<!--color: rgb(0, 0, 0);-->
<!--line-height: 1.78;-->
<!--position: absolute;-->
<!--left: 35px;-->
<!--top: 239.461px;-->
<!--z-index: 3;-->
<!--}-->
