<template>
  <div>
    <div id="counter-event-example">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:hide="show" v-show="showFlag"></button-counter>

      <p @hide="hide">显示</p>
    </div>
  </div>
</template>

<script>
  import ButtonCounter from './button-counter'

  export default {
    name: "recommend-topic",
    components: {
      ButtonCounter
    },
    data() {
      return {
        total: 0,
        showFlag: false
      }
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      },
      show() {
        console.log('xxx')
      },
      hide() {
        console.log('1111')
      }
    },
  }
</script>

<style scoped>

</style>
