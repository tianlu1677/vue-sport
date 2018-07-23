<template>
  <div class="message" v-if="message_count > 0">
    <span class="icon-unread-messages"></span>
    <span class="messages-count">{{message_count}}</span>
  </div>
</template>

<script>
  export default {
    name: "message",
    components: {},
    props: {
      message_count: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {}

  }
</script>

<style scoped lang="scss">
  .message {
    .icon-unread-messages {
      font-size: 19px;
    }
    .messages-count {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      text-align: center;
      font-size: 10px;
      line-height: 18px;
      border-radius: 50%;
      color: $white;

    }
  }

</style>
