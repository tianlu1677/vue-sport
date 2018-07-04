<template>
  <div class="sign-in">
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="true"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler"
      @reset="resetHandler">

    </cube-form>
  </div>
</template>

<script>
  import {setCookie} from "@/common/js/cookies";
  import {signIn} from '@/api/sign_api';

  export default {
    data() {
      return {
        validity: {},
        valid: false,
        model: {
          phone: '',
          password: '',
        },
        schema: {
          groups: [
            {
              legend: '登录每日新学',
              fields: [
                {
                  type: 'input',
                  modelKey: 'phone',
                  label: '手机号',
                  props: {
                    placeholder: '请输入',
                    type: 'number',
                    maxlength: 11,
                  },
                  rules: {
                    required: true,
                  },
                  trigger: 'blur',
                },
                {
                  type: 'input',
                  modelKey: 'password',
                  label: '密码',
                  props: {
                    placeholder: '请输入',
                  },
                  rules: {
                    required: true,
                  },
                  // validating when blur
                  trigger: 'blur',
                },


              ],
            },

            {
              fields: [
                {
                  type: 'submit',
                  label: '登陆',
                },
                {
                  type: 'reset',
                  label: '重置',
                },
              ],
            },
          ],
        },
        options: {
          scrollToInvalidField: true,
          layout: 'standard', // classic fresh
        },
      };
    },
    methods: {
      async submitHandler(e) {
        e.preventDefault();
        if (this.valid) {
          const res = await signIn({
            phone: this.model.phone,
            password: this.model.password,
          });
          if (res.status === 200) {
            localStorage.setItem('token', res.auth_token);
            setCookie('remember_token', res.auth_token)
            this.$router.push({path: '/home'});
          } else {
            alert(res.msg);
          }
        }
      },
      validateHandler(result) {
        this.validity = result.validity;
        this.valid = result.valid;
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex);
      },
      resetHandler(e) {
        console.log('reset', e);
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
