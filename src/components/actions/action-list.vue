<template>
  <ul class="actions">
    <li class="item">
      <new-topic-icon></new-topic-icon>
    </li>
    <li class="item">
      <praise-icon></praise-icon>
    </li>
    <li class="item">
      <star-icon></star-icon>
    </li>
    <li class="item">
      <share-icon></share-icon>
    </li>
  </ul>
</template>

<script>

  import NewTopicIcon from 'components/actions/new-topic-icon'
  import PraiseIcon from 'components/actions/praise-icon'
  import ShareIcon from 'components/actions/share-icon'
  import StarIcon from 'components/actions/star-icon'

  export default {
    name: "action-list",
    components: {

      NewTopicIcon,
      PraiseIcon,
      ShareIcon,
      StarIcon,
    },
  }
</script>

<style scoped lang="scss">
  .actions {
    display: flex;
    top: 0;
    right: 20.5px;
    .item {
      margin: 0 20px 0 0;
    }
    .item:last-child {
      margin: 0;
    }
  }

</style>
