<template>
  <dialog v-model="show"
          :title="title"
          :type="type"
          :icon="icon"
          :content="content"
          :showClose="showClose"
          :confirmBtn="confirmBtn"
          :cancelBtn="cancelBtn"
          @confirm="confirm"
          @cancel="cancel"
          @close="close"
  >
    <!--<slot name="title">-->
    <!--<p class="cube-dialog-title-def">{{title}}</p>-->
    <!--</slot>-->
    <slot name="content">
      <div class="cube-dialog-content-def">

      </div>
    </slot>
  </dialog>
</template>

<script>
  import {Dialog} from 'cube-ui'

  const EVENT_CONFIRM = 'confirm'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CLOSE = 'close'

  export default {
    name: "dialog",
    components: {
      Dialog
    },
    props: {
      type: {
        type: String,
        default: 'alert'
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: false
      },
      confirmBtn: {
        type: [Object, String],
        default() {
          return {}
        }
      },
      cancelBtn: {
        type: [Object, String],
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {
      confirm(e) {
        if (this._confirmBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CONFIRM, e)
      },
      cancel(e) {
        if (this._cancelBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CANCEL, e)
      },
      close(e) {
        this.hide()
        this.$emit(EVENT_CLOSE, e)
      }
    }

  }
</script>

<style scoped lang="scss">

</style>
