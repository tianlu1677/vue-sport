<template>
<div class="modal">
  <div class="handle-modal">
    <a href="javaScript:;" class="clean" @click="clean">取消</a>
    <a href="javaScript:;" class="submit" @click="submit">完成</a>
  </div>
  <textarea placeholder="请输入新得内容1-5000个字" v-model="data"></textarea>
</div>
</template>

<script>
  export default {
    name: "add",  
    props:{
      index: Number
    },
    data(){
      return{
        data: ""
      }
    },
    methods: {
      clean(){
       this.$emit("cleanModal");
      },
      submit(){
        this.$emit("submitWrite", this.data);
        this.data = "";
      }
    }
  }
</script>

<style lang="scss">
.modal{
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  textarea{
    width: 100%;
    padding: 10px;
    height: 200px;
    box-sizing: border-box;
    background: #e8e8e9;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    border: none;
  }
}
.handle-modal{
  line-height: 49.5px;
  padding:0 6px; 
  zoom: 1;
  &:after{
    clear: both;
    display: block;
    content: "\20";
  }
  .clean{
    float: left;
    font-size: 13px;
  }
  .submit{
    float: right;
    font-size: 13px;
    color: #00a7f5;
  }

}
</style>
