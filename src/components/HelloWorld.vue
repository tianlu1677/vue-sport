<template>
  <div class="hello">
    <h1>
      <span>
        {{ msg }}
        <button @click="clickAccount">Accounts1</button>
          <cube-button>show dialog</cube-button>

      </span>

    
  </h1>    
  </div>
</template>

<script>
import { getAccounts } from '@/api/account'
import { Button } from 'cube-ui'

export default {
  name: 'HelloWorld',
  components: {
    'cube-button': Button
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  methods: {
    async clickAccount() {
      await this.fetchAccounts()
      console.log('hello')
    },

    async fetchAccounts() {
      await getAccounts()  
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-weight: normal;
  span {
    color: red;
  }
}
// h1, h2 {
//   font-weight: normal;
// }
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
</style>
