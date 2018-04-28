<template>
  <div class="list-wrapper">
    <div class="list">
      <ul class="item-list">
        <li class="item" v-for="course in courseList" :key="course.id">
          <base-course :baseCourse="course"></base-course>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course'

  export default {
    name: "course-list",
    props: {
      courseList: {
        type: Array,
        default: []
      }
    },
    components: {
      BaseCourse,
    }
  }
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
