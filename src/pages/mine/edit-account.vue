<template>
  <div class="edit-account">
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <div class="edit-form">
        <cube-form-group>
          <cube-form-item :field="{label: '头像'}" class="item">
            <img :src="model.avatar" alt="" class="avatar">
          </cube-form-item>

          <cube-form-item :field="fields[0]" class="item">

          </cube-form-item>
          <cube-form-item :field="fields[1]" class="item">

          </cube-form-item>
          <cube-form-item :field="fields[2]" class="item">
            <p @click="showDatePicker">{{model.birthday || '请选择您的生日'}}</p>
            <date-picker ref="datePicker" :min="[1980, 1, 1]" :max="[2014, 1, 1]" startColumn="year"
                         :format="{year: 'YYYY年', month: 'MM月', date: 'DD日'}"
                         :value="new Date()"

                         @select="dateSelectHandler"></date-picker>
          </cube-form-item>
          <cube-form-item :field="fields[3]" class="item">

          </cube-form-item>
          <cube-form-item :field="fields[4]" class="item">

          </cube-form-item>
        </cube-form-group>
        <div class="border-bottom-1px"></div>
      </div>
      <cube-form-group>
        <cube-button type="submit" :disabled="!valid" class="submit-button">保存</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex';
  import {DatePicker} from 'cube-ui';

  export default {
    name: 'edit-account',
    components: {
      DatePicker,
    },
    data() {
      return {
        validity: {},
        valid: undefined,
        model: {
          avatar: '',
          nickname: '',
          gender: '',
          birthday: '',
          city: '',
          intro: '',
        },
        fields: [
          {
            type: 'input',
            modelKey: 'nickname',
            label: '昵称',
            props: {
              maxlength: 20,
              option: {},
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请输入您的昵称',
            },
          },
          {
            type: 'select',
            modelKey: 'gender',
            label: '性别',
            props: {
              options: [
                {value: 'man', text: '男'},
                {value: 'woman', text: '女'},
                {value: 'other', text: '未知'},
              ],
            },
            // props: {
            //   options: ['男', '女'],
            //   horizontal: true
            // },
            rules: {
              required: true,
            },
            messages: {
              required: '请选择性别',
            },
          },
          {
            type: 'input',
            modelKey: 'birthday',
            label: '生日',
            props: {
              disabled: true,
              option: {},
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请输入您的生日',
            },
          },
          {
            type: 'textarea',
            modelKey: 'intro',
            label: '简介',
            props: {
              placeholder: '请输入您的简介',
              maxlength: 50,
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请输入您的简介',
            },
            debounce: 100,
          },
          {
            type: 'input',
            modelKey: 'city',
            label: '地区',
            props: {
              disabled: true,
              option: {},
            },
            rules: {
              // required: true
            },
            messages: {
              required: '请输入地区',
            },
          },

        ],
        schema: {
          groups: [
            {},

          ],
        },
        options: {
          scrollToInvalidField: false,
          layout: 'standard', // classic fresh
        },
      };
    },
    watch: {
      currentAccount() {

      },
    },
    mounted() {
      this.setDefaultAccount();
    },
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount',
      }),
    },
    methods: {
      ...mapActions({
        updateAccount: 'updateAccount',
      }),
      submitHandler(e) {
        e.preventDefault();
        this.updateAccount({
          id: this.currentAccount.id,
          account: {
            nickname: this.model.nickname,
            intro: this.model.intro,
            gender: this.model.gender,
            birthday: this.model.birthday,
          },
        });
        const toast = this.$createToast({
          txt: '更新成功',
          type: 'correct',
          mask: false,
          time: 1000,
        });
        toast.show();

        this.$router.replace({path: '/mine'});
      },
      validateHandler(result) {
        this.validity = result.validity;
        this.valid = result.valid;
      },
      resetHandler(e) {
      },
      showDatePicker() {
        this.$refs.datePicker.show();
      },
      dateSelectHandler(selectedVal) {
        const defaultDate = new Date(selectedVal);
        const curr_date = defaultDate.getDate();
        const curr_month = defaultDate.getMonth() + 1; // Months are zero based
        const curr_year = defaultDate.getFullYear();
        this.model.birthday = `${curr_year}-${curr_month}-${curr_date}`;
      },
      setDefaultAccount() {
        if (this.currentAccount) {
          this.model.nickname = this.currentAccount.nickname;
          this.model.gender = this.currentAccount.gender;
          this.model.birthday = this.currentAccount.birthday;
          this.model.city = this.currentAccount.city;
          this.model.intro = this.currentAccount.intro;
          this.model.avatar = this.currentAccount.avatar_url;
      }
      },
    },

  };
</script>

<style scoped lang="scss">
  .edit-account {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .edit-form {
      padding: 27.5px 17.5px 17.5px 17.5px;;
      .item {
        min-height: 60px;
      }
      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        /*margin-bottom: 10px;*/
      }
    }
    .submit-button {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $blue;
      font-size: 16px
    }
  }
</style>
