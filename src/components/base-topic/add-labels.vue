<template>
<div class="modal-label">
  <div class="box">
    <div class="title">填写标签</div>
    <div class="info">
      <span v-for="item in labels">{{item}}</span>
      <input type="text" placeholder="多个标签用空格分隔" @keyup="keyup($event)" v-model="inputLabel">
    </div>
    <div class="label-handle">
      <a href="javaScript:;" class="clean" @click="clean">取消</a>
      <a href="javaScript:;" :class="disable" @click="submit">保存</a>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "add-labels",
    props:{
      parentlabels: Array
    },
    data(){
      return {
        inputLabel: "",
        labels:this.parentlabels,
        disable: "disable"
      }
    },
    methods: {
      clean(){
        this.$emit("cleanLabelModal");
        this.labels = [];
        this.input = "";
      },
      submit(){
        if(this.disable == "disable") return;
        if(this.labels.length > 0)this.$emit("addLabels", this.labels);
        this.$emit("cleanLabelModal");
        this.labels = [];
        this.input = "";
      },
      keyup(e){
        if(e.keyCode == 32){
          if(!!this.inputLabel){
            this.labels.push(this.inputLabel);
            this.inputLabel = "";
            if(this.labels.length > 0){
              this.disable = "";
            }
          }
        }else if(e.keyCode == 8){
          if(!this.inputLabel){
            this.labels.pop();
            if(this.labels.length > 0){
              this.disable = "";
            }else{
              this.disable = "disable";
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss">
.modal-label{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(#000, .3);
  .box{
    width: 300px;
    margin: 80px auto;
    background: #fff;
    border-radius: 8px;
    .title{
      font-size: 16px;
      text-align: center;
      padding-top: 17.5px;
      margin-bottom: 40px;
    }
    .info{
      margin-left: 17.5px;
      margin-right: 17.5px;
      margin-bottom: 36.5px;
      overflow: hidden;
      border-bottom: 1px solid #eee;
      input{
        width: 120px;
        margin-bottom: 10px;
        padding-left: 5px;
        font-size: 13px;
        outline: none;
      }
      span{
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        padding-top: 6px;
        padding-bottom: 6px;
        padding-right: 9px;
        padding-left: 9px;
        border-radius: 8px;
        border: 1px solid #333;
        font-size: 13px;
      }
    }
    .label-handle{
      padding-left: 8px;
      padding-right: 8px;
      zoom: 1;
      &:after{
        content: "\20";
        clear: both;
        display: block;
      }
      a{
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
        &.clean{
          color: #9e9e9e;
          background: #e9e9ea;
        }
        &.disable{
          color: #9e9e9e;
          background: #e9e9ea;
        }
      }
    }
  }
}
</style>
