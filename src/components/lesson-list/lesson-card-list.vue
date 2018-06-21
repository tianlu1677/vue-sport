<template>
  <div class="list-wrapper" v-if="lessonList.length > 0">
    <div class="list">
      <ul class="item-list">
        <li class="item" v-for="lesson in lessonList" :key="lesson.id">
          <lesson-card :baseLesson="lesson" :link="link" :show_learning="show_learning"
                       @select="selectItem"></lesson-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import LessonCard from 'components/lesson-card/lesson-card';

  const EVENT_SELECT = 'select';
  export default {
    name: 'lesson-card-list',
    props: {
      lessonList: {
        type: Array,
      },
      link: {
        type: Boolean,
        default: true,
      },
      show_learning: {
        type: Boolean,
        default: true,
      },
    },
    components: {
      LessonCard,
    },
    methods: {
      selectItem(item) {
        this.$emit(EVENT_SELECT, item);
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-wrapper {
    .list {
      .item-list {
        margin-top: 17.5px;
        .item {
          margin-bottom: 15px;
        }
      }
    }
  }

</style>
