<template>
  <div class="modal-label">
    <div class="box">
      <div class="title">填写标签</div>
      <div class="info">
        <span class="tag" v-for="item in labelList">{{item}}</span>
        <input type="text" placeholder="多个标签用空格分隔"
               class="edit-tag"
               @keyup="keyup($event)"
               v-model="inputTag">
      </div>
      <div class="label-handle">
        <a href="javaScript:;" class="clean" @click="clean">取消</a>
        <a href="javaScript:;" @click.prevent="submit">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "edit-tag",
    props: {
      tag_list: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        labelList: [],
        inputTag: undefined,
      }
    },
    watch: {
      tag_list() {
        this.labelList = this.tag_list
      }
    },

    methods: {
      clean() {
        this._refreshTag()
      },
      submit() {
        this.$emit('submitTag', this.labelList)
        this.$emit('hideEditTag')
      },
      keyup(e) {
        if (e.keyCode === 32) {
          if (!!this.inputTag.trim()) {
            if (this.labelList.length < 7) {
              this.labelList.push(this.inputTag)
              this.inputTag = ''
            } else {
              this.inputTag = ''
            }
          }
        } else if (e.keyCode === 8) {
          if (!this.inputTag) {
            this.labelList.pop();
          }
        }
      },
      _refreshTag() {
        this.labelList = [].concat(this.tag_list)
        this.$emit('hideEditTag')
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal-label {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(#000, .3);
    .box {
      width: 300px;
      margin: 80px auto;
      background: #fff;
      border-radius: 8px;
      .title {
        font-size: 16px;
        text-align: center;
        padding-top: 17.5px;
        margin-bottom: 40px;
      }
      .info {
        margin-left: 17.5px;
        margin-right: 17.5px;
        margin-bottom: 36.5px;
        overflow: hidden;
        border-bottom: 1px solid #eee;
        .edit-tag {
          width: 120px;
          margin-bottom: 10px;
          padding-left: 5px;
          font-size: 13px;
          outline: none;
        }
        .tag {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          padding-top: 6px;
          padding-bottom: 6px;
          padding-right: 9px;
          padding-left: 9px;
          border-radius: 6px;
          border: 1px solid #333;
          font-size: 13px;
        }
      }
      .label-handle {
        padding-left: 8px;
        padding-right: 8px;
        zoom: 1;
        &:after {
          content: "\20";
          clear: both;
          display: block;
        }
        a {
          display: block;
          float: left;
          width: 120px;
          margin-left: 8px;
          margin-right: 8px;
          margin-bottom: 20px;
          border: 1px solid #eee;
          color: #fff;
          background: #09a5ef;
          line-height: 41px;
          font-size: 16px;
          text-align: center;
          border-radius: 8px;
          &.clean {
            color: #9e9e9e;
            background: #e9e9ea;
          }
          &.disable {
            color: #9e9e9e;
            background: #e9e9ea;
          }
        }
      }
    }
  }
</style>
