<template>
  <div class="add-topic-type">
<LeftSlider v-if="type==1" :index="no" @deleteItem="deleteItem" @moveTo="moveTo" class="type1 item">
  <p @click="clickAdd(no)">{{!!formDate&&!!formDate.font ? formDate.font : "添加招聘填写学习过程和见解展示照片填写学习成果，会让你的学习更上一层楼哦~"}}</p>
  <div class="upload">
    <div class="innerItem">
      <cube-upload
          ref="upload"
          v-model="files"
          :action="action"
          @file-success="fileSuccess(no)">
          <div class="clear-fix">
            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
            <cube-upload-btn :multiple="false">
              <div>
                <img src="imagePath" v-if="img"/>
                <i v-if="!img" class="icon-topic-add-photo"></i>
                <span v-if="!img">添加照片</span>
              </div>
            </cube-upload-btn>
          </div>
        </cube-upload>
    </div>
  </div>
</LeftSlider>
<LeftSlider v-if="type==2" :index="no" @deleteItem="deleteItem" @moveTo="moveTo" class="type2 item">
  <p @click="clickAdd(no)">{{!!formDate&&!!formDate.font ? formDate.font : "添加招聘填写学习过程和见解展示照片填写学习成果，会让你的学习更上一层楼哦~"}}</p>
</LeftSlider>
</div>
</template>

<script>
  import LeftSlider from './../../components/base-topic/leftSlider.vue';
  export default {
    name: "base-topic",
     props: {
      no: Number,
      type: Number,
      formDate: Object
    },
    components: {
      LeftSlider
    },
    data() {
      return {
        action: 'http://localhost:8888/common/upload.htm',
        files: [],
        img:false,
        imagePath: ""
      }
    },
    methods: {
      fileSuccess(res){
        this.img = true;
        this.imgPath = res.data;
      },
      clickAdd(index){
        this.$emit("clickAdd", index);
      },
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
  .add-topic-type {
    .content {
      border: 1px solid #eee;
      border-radius: 8px;
    }
    .item {
      margin-bottom: 14.5px;
    }
    .type1 {
      .slider {
        height: 101px;
        box-sizing: border-box;
        padding: 1px;
        .icon-topic-add-photo {
          display: block;
          margin-bottom: 10px;
        }
        p {
          padding-left: 10px;
          display: table-cell;
          vertical-align: middle;
          height: 101px;
          width: 51%;
          font-size: 13px;
          line-height: 17px;
          color: #9e9e9e;
        }
        .upload {
          width: 166px;
          display: table-cell;
          vertical-align: middle;
          font-size: 15px;
          .innerItem {
            overflow: hidden;
            border: 1px solid #eee;
            border-radius: 8px;
            margin-left: 30px;
            margin-right: 20px;
            text-align: center;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          i {
            padding-top: 19.5px;

          }
          span {
            display: inline-block;
            padding-bottom: 24.5px;
          }
          .cube-upload-file-state {
            background: none;
          }
          .cube-upload-file-status {
            display: none;
          }
          .cube-upload-file-def {
            width: 100%;
          }
          .cubeic-wrong {
            display: none;
          }
          .cube-upload-file {
            display: none;
          }
          span {
            font-size: 12px;
          }
        }
      }
    }
    .type2 {
      .slider {
        height: 101px;
        box-sizing: border-box;
        padding: 1px;
        p {
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
    .type2 {
      .slider {
        height: 101px;
        box-sizing: border-box;
        padding: 1px;
        p {
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
}
</style>
