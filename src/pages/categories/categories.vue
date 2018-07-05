<template>
  <div class="categories scroll-wrapper">
    <div class="domain-list" v-for="(category, index) in categories">
      <h1 class="name">{{category.name}}</h1>
      <ul class="item-list" v-for="(subCategory, index) in group(category.sub_categories, 4)">
        <li class="item" v-for="(sub_category, index) in (subCategory)" :key="index">
          <category :category="sub_category"></category>
        </li>
      </ul>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import Category from 'components/category/category';
  import BottomNav from 'components/bottom-nav/bottom-nav';
  import {getCategories} from '@/api/category_api';

  export default {
    name: 'categories',
    components: {
      Category,
      BottomNav,
    },

    data() {
      return {
        categories: [],
      };
    },

    created() {
      this._getCategories();
      window.wechatShare({title: '每日新学兴趣广场'})
    },
    methods: {
      async _getCategories() {
        const response = await getCategories();
        this.categories = response.categories;
      },

      group(array, subGroupLength) {
        let index = 0;
        let newArray = [];

        while (index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
      }
    },
  };
</script>

<style scoped lang="scss">
  .categories {
    padding: 17.5px 17.5px 0 17.5px;
    margin-bottom: 50px;
    .domain-list {
      padding-bottom: 11px;
      .name {
        font-size: 22px;
        line-height: 22px;
        font-weight: bolder;
        padding-bottom: 14px;
      }
      .item-list {
        .item {
          margin-right: 15px;
          display: inline-block;
          margin-bottom: 16.5px;
        }
        .item:last-child {
          margin-right: 0;
        }
      }
    }
    .domain-list:last-child {
      margin-bottom: 20px;
    }
  }

</style>
