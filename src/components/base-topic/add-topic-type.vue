<template>
<div>
<LeftSlider v-if="type==1" :index="no" @deleteItem="deleteItem" @moveTo="moveTo" class="type1 item">
  <p>添加招聘填写学习过程和见解展示照片填写学习成果，会让你的学习更上一层楼哦~</p>
  <div class="upload">
    <div class="innerItem">
      <i class="上传+号"></i>
      <span>添加照片</span>
    </div>
  </div>
</LeftSlider>
<LeftSlider v-if="type==2" :index="no" @deleteItem="deleteItem" @moveTo="moveTo" class="type2 item">
  <p>添加招聘填写学习过程和见解展示照片填写学习成果，会让你的学习更上一层楼哦~</p>
</LeftSlider>
</div>
</template>

<script>
  import LeftSlider from './../../components/base-topic/leftSlider.vue';
  export default {
    name: "base-topic",
     props: {
      no: Number,
      type: Number
    },
    components: {
      LeftSlider
    },
    methods: {
      deleteItem: function(index){
        this.$emit("deleteItem", index);
      },
      moveTo: function(dom){
        this.$emit("moveTo", dom);
      }
    }
  }
</script>

<style lang="scss">
.content{
  border: 1px solid #eee;
  border-radius: 8px;
}
.item{
  margin-bottom: 14.5px;
}
.type1{
  .slider{
    height: 101px;
    box-sizing: border-box;
    padding: 1px;
    p{
      padding-left: 10px;
      display: table-cell;
      vertical-align: middle;
      height: 101px;
      width: 51%;
      font-size: 13px;
      line-height: 17px;
      color: #9e9e9e;
    }
    .upload{
      display: table-cell;
      vertical-align: middle;
      font-size: 15px;
      .innerItem{
        border: 1px solid #eee;
        border-radius: 8px;
        padding-top: 19.5px;
        padding-bottom: 24.5px;
        margin-left: 30px;
        margin-right: 20px;
        text-align: center;
      }
      span{
        font-size: 12px;
      }
    }
  }
}
.type2{
  .slider{
    height: 101px;
    box-sizing: border-box;
    padding: 1px;
    p{
      padding-left: 10px;
      padding-right: 10px;
      display: table-cell;
      vertical-align: middle;
      height: 101px;
      width: 51%;
      font-size: 13px;
      color: #9e9e9e;
      line-height: 17px;
    }
  }
}
.type2{
  .slider{
    height: 101px;
    box-sizing: border-box;
    padding: 1px;
    p{
      padding-left: 10px;
      padding-right: 10px;
      display: table-cell;
      vertical-align: middle;
      height: 101px;
      width: 51%;
      font-size: 13px;
      color: #9e9e9e;
      line-height: 17px;
    }
  }
}
</style>
