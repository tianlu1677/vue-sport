<template>
  <div class="login">
    登录中...
  </div>
</template>

<script>
  import {setCookie, deleteToken} from '@/common/js/cookies';

  export default {
    name: 'login',
    data() {
      return {
        token: this.$route.query.token,
      };
    },

    created() {
      if (!this.token || this.token === 'error') {
        this.loginError();
      } else if (this.token && this.token.length > 10) {
        this.loginSuccess();
      } else {
        this.loginError();
      }
    },
    methods: {
      // 跳转到登录界面
      loginError() {
        // console.log('error');
        deleteToken()
        this.$router.replace({path: '/home'});
      },
      loginSuccess() {
        localStorage.setItem('token', this.token);
        setCookie('remember_token', this.token)
        const last_path = localStorage.getItem('lastPath') || '/home';
        this.$router.replace({path: last_path});
        localStorage.removeItem('lastPath');
      },
    },
  };

</script>

<style scoped lang="scss">
  .login {
    text-align: center;
    margin-top: 50%;
  }
</style>
