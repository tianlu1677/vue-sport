<template>
  <div class="login">
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

    created() {
      if (!this.token || this.token === 'error') {
        this.loginError()
      } else if (this.token && this.token.length > 10) {
        this.loginSuccess()
      } else {
        this.loginError()
      }
    },
    methods: {
      // 跳转到登录界面
      loginError() {
        console.log('error')
        this.$router.replace({path: '/home'})
      },
      loginSuccess() {
        localStorage.setItem('token', this.token)
        let last_path = localStorage.getItem('last_path') || '/home'
        // console.log(localStorage.getItem('token'))
        this.$router.replace({path: last_path})
        localStorage.removeItem('last_path')
      }
    }
  }

</script>

<style scoped lang="scss">
  .login {
    text-align: center;
  }
</style>
