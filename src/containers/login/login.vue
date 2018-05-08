<template>
  <div>
    登录中...
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        token: this.$route.query.token
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'currentAccount'
      ])
    },
    created() {
      if (!this.token || this.token === 'error') {
        this.loginError()
        //  跳转到首页
      } else if (this.token && this.token.length > 10) {
        this.loginSuccess()
      }
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
      // 跳转到登录界面
      loginError() {
        console.log('error')
      },
      async loginSuccess() {
        localStorage.setItem('token', this.token)
        if (localStorage.getItem('token')) {
          let last_path = localStorage.getItem('last_path') || '/home'
          this.$router.push({path: last_path})
          console.log('success login')
        } else {
          this.$router.push({path: '/home'})
        }
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
