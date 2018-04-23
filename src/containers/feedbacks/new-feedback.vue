<template>
  <div class="new-feedback">
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <div class="form">
        <div class="content">
          <cube-form-item :field="fields[0]">
          </cube-form-item>
        </div>
        <div class="border-bottom-1px"></div>
        <div>
          <cube-form-item :field="fields[1]" style="height: 90px">
          </cube-form-item>
        </div>
        <div class="border-bottom-1px"></div>
      </div>

      <cube-form-group>
        <cube-button type="submit" class="submit-button">提交</cube-button>
      </cube-form-group>
    </cube-form>
  </div>

</template>

<script>

  const COMPONENT_NME = 'new-feedback'

  export default {
    name: COMPONENT_NME,

    components: {},
    data() {
      return {
        validity: {},
        valid: undefined,
        model: {
          content: '',
          contract: '',
        },
        fields: [
          {
            type: 'textarea',
            modelKey: 'intro',
            label: false,
            props: {
              placeholder: '请输入你的意见或建议，我们将在第一时间响应。',
              maxlength: 500,
              autofocus: true
            },
            rules: {
              required: true
            },
            messages: {
              required: ''
            }
          },
          {
            type: 'input',
            modelKey: 'nickname',
            label: false,
            props: {
              placeholder: '输入您的手机号/微信号/邮箱'
            },
            rules: {
              required: true
            },
            messages: {}
          },
        ],
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
      }
    }

  }
</script>

<style lang="scss">
  .new-feedback {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .form {
      padding: 17.5px;
      word-break: break-word;
      .content {
        .cube-form-item {
          .cube-textarea-wrapper, .cube-textarea_expanded {
            height: 250px;
          }
          .cube-textarea-indicator {
            display: block;
          }
        }
      }
    }
    .submit-button {
      position: fixed;
      bottom: 0;
      background-color: $blue;
      font-size: 16px
    }
  }

</style>
