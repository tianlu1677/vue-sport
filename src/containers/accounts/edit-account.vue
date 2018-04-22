<template>
  <div class="edit-account">

    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <div class="edit-form">
        <cube-form-group>
          <cube-form-item :field="field" v-for="field in fields">

          </cube-form-item>
        </cube-form-group>
        <div class="border-bottom-1px"></div>
      </div>

      <cube-form-group>
        <cube-button type="submit" class="submit-button">保存</cube-button>
      </cube-form-group>
    </cube-form>

  </div>

</template>

<script>
  import {Form} from 'cube-ui'

  export default {
    name: "edit-account",
    components: {
      'cube-form': Form
    },
    data() {
      return {
        validity: {},
        valid: undefined,
        model: {
          nickname: '张三',
          gender: '',
          birthday: '',
          city: '',
          intro: ''
        },
        fields: [
          {
            type: 'input',
            modelKey: 'nickname',
            label: '昵称',
            props: {
              option: {}
            },
            rules: {
              required: true
            },
            messages: {
              required: '请输入您的昵称'
            }
          },
          {
            type: 'radio-group',
            modelKey: 'gender',
            label: '性别',
            props: {
              options: ['男', '女']
            },
            rules: {
              required: true
            },
            messages: {
              required: '请选择性别'
            }
          },
          {
            type: 'input',
            modelKey: 'birthday',
            label: '生日',
            props: {
              option: {}
            },
            rules: {
              required: true
            },
            messages: {
              required: '请输入您的生日'
            }
          },
          {
            type: 'input',
            modelKey: 'city',
            label: '地区',
            props: {
              option: {}
            },
            rules: {
              required: true
            },
            messages: {
              required: '请输入地区'
            }
          },
          {
            type: 'textarea',
            modelKey: 'intro',
            label: '简介',
            props: {
              placeholder: '请输入您的简介',
              maxlength: 100,
              autofocus: true
            },
            rules: {
              required: true
            },
            messages: {
              required: '请输入您的简介'
            },
            debounce: 100
          },
        ],
        schema: {
          groups: [
            {},

          ]
        },
        options: {
          scrollToInvalidField: false,
          layout: 'standard' // classic fresh
        }
      }
    },

    methods: {
      submitHandler(e) {
        e.preventDefault()
        console.log('submit', e)
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      resetHandler(e) {
        console.log('reset', e)
      }
    }

  }
</script>

<style scoped lang="scss">
  .edit-account {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .edit-form {
      padding: 17.5px;
    }
    .submit-button {
      margin-top: 10px;
      /*position: fixed;*/
      /*left: 0;*/
      /*right: 0;*/
      /*bottom: 0;*/
      background-color: $blue;
      font-size: 16px
    }

  }

</style>
