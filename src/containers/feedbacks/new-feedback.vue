<template>
  <div class="new-feedback">
    <cube-form :model="model" @validate="validateHandler" @submit.stop.prevent="submitHandler">
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
        <div class="button-wrapper">
          <cube-button type="submit" :disabled="!valid">
            提交
          </cube-button>
        </div>
      </cube-form-group>
    </cube-form>
  </div>

</template>

<script>
  import {createFeedback} from "@/api/feedback_api";

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
            modelKey: 'content',
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
            modelKey: 'contract',
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
        this.submitFeedback()
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },

      async submitFeedback() {
        const response = await createFeedback({
          content: this.model.content,
          contact: this.model.contract
        })
        this.$createToast({
          type: 'correct',
          txt: '创建成功',
          time: 1000
        }).show()
        setTimeout(() => {
          this.$router.push({path: '/mine'})
        }, 1000)


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
    .button-wrapper {
      position: fixed;
      bottom: 0;
      margin: 0;
      width: 100%;

      .submit-button {
        padding: 17px 16px;
        text-align: center;
        white-space: nowrap;
        font-size: 16px;
        color: $white;

      }
    }

  }

</style>
