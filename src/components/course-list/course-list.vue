<template>
  <div class="list-wrapper">
    <div class="list">
      <ul class="item-list">
        <li class="item" v-for="course in courseList" :key="course.id">
          <base-course :baseCourse="course" :link="link" @select="selectItem"></base-course>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course';

  const EVENT_SELECT = 'select';
  export default {
    name: 'course-list',
    props: {
      courseList: {
        type: Array,
      },
      link: {
        type: Boolean,
        default: true,
      },
    },
    components: {
      BaseCourse,
    },
    methods: {
      selectItem(item) {
        this.$emit(EVENT_SELECT, item);
      },
    },
  };
</script>

<style scoped lang="scss">
  .list {
    .item-list {
      margin-top: 17.5px;
      .item {
        margin-bottom: 15px;
      }
    }
  }
</style>
