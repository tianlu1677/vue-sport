<template>
<div class="container">
  <a v-show="!type_1 && !type_2" @click="changeLesson" href="javaScript:;" class="change-lessons"><i class="icon-topic-add"></i><span>选择课程</span></a>
  <div class="type_1" v-if="type_1" @click="changeLesson">
    <img src="http://static.bolzjb.com/assist/images/index-header-banner.jpg">
      <div class="info">
        <h1>基本动作教学基本动作教学基本动作教学基本动作</h1>
        <p>
          <span>56874学过</span>
          <span>56篇心得</span>
        </p>
      </div>
  </div>
  <div class="type_2" v-if="type_2" @click="changeLesson">
    <h1>基本动作教学基本动作教学基本动作教学基本动作</h1>
    <a>来自课程[这就是街舞-选手舞蹈动]</a>
    <p>
      <span>5.5k人学过</span>
      <span>38篇心得</span>
    </p>
  </div>
  <addType v-for="item in doms" :type="item.type" :formDate="formData[item.index]" :no="item.index" @moveTo="moveTo"
           @clickAdd="clickAdd" @deleteItem="deleteItem" :key="index"></addType>
  <div class="handle">
    <div class="addItem" v-show="showAddTopic">
        <a href="javaScript:;" class="icon-topic-add-text addFont" @click="addFont">文字</a>
        <a href="javaScript:;" class="icon-topic-add-media addPhoto" @click="addPhoto">照片</a>
    </div>
     <a href="javaScript:;" :class="addTopicClass" class="addTopic" @click="addTopic"></a>
    <div class="labes" @click="openWriteLabel">
      <i class="icon-tag"></i><span>标签</span>
      <div class="labels-box">
        <span v-for="item in labels">{{item}}</span>
      </div>
      <i class="icon-arrow-right"></i>
    </div>
    <a href="javaScript:;" :class="disable" class="sbumit">发布</a>
  </div>
  <addWrite v-show="showModal" @cleanModal="cleanModal" @submitWrite="submitWrite"></addWrite>
  <addLabels :parentlabels="labels" v-show="showLabelModal" @cleanLabelModal="cleanLabelModal" @addLabels="addLabels"></addLabels>
  <addLesson v-show="showLessonModal" @changeType_1="changeType_1" @changeType_2="changeType_2" @cleanModal="cleanLessonModal" @submitWrite="submitWrite"></addLesson>
</div>
</template>

<script>
  import addType from './../../components/base-topic/add-topic-type.vue';
  import addWrite from './../../components/base-topic/add.vue';
  import addLabels from './../../components/base-topic/add-labels.vue';
  import addLesson from './../../components/base-topic/add-lesson.vue';
  export default {
    name: "base-topic",
    data(){
      return{
        addTopicClass: 'icon-topic-add',
        showAddTopic: false,
        lastMove:Object,
        index: 2,
        showModal: false,
        showLabelModal: false,
        showLessonModal: false,
        type_1: false,
        type_2: false,
        writeIndex: null,
        disable: "disable",
        labels:['90','adfafd','90','adfafd','90','adfafd','90','adfafd'],
        doms:[{
          index: 1,
          type:1
        }],
        formData:{}
      }
    },
    components: {
      addType,
      addWrite,
      addLabels,
      addLesson
    },
    methods: {
      changeLesson(){
        this.showLessonModal = true;
      },
      changeType_1(data){
        //TODO data值为课程信息
        this.type_1 = true;
        this.type_2 = false;
        this.showLessonModal = false;
      },
      changeType_2(data){
         //TODO data值为课程信息
         this.type_2 = true;
         this.type_1 = false;
         this.showLessonModal = false;
      },
      openWriteLabel(){
        this.showLabelModal = true;
      },
      cleanLessonModal(){
        this.showLessonModal = false;
      },
      cleanLabelModal(){
        this.showLabelModal = false;
      },
      addLabels(labels){
        this.labels = labels;
      },
      clickAdd(index){
        this.showModal = true;
        this.writeIndex = index;
      },
      cleanModal(){
        this.showModal = false;
        this.writeIndex = null;
      },
      submitWrite(data){
        var info = {font: data}
        this.formData[this.writeIndex] = info;
        this.cleanModal();
        if(JSON.stringify(this.formData) == "{}"){
          this.disable = "disable";
        }else{
          this.disable = "";
        }
      },
      deleteItem: function(index){
        var res = [];
        for(var i = 0; i < this.doms.length; i++){
          var item = this.doms[i];
          if(item.index != index){
            res.push(item);
          }else{
            delete this.formData[i];
          }
        }
        this.doms = res;
        if(JSON.stringify(this.formData) == "{}"){
          this.disable = "disable";
        }else{
          this.disable = "";
        }
      },
      moveTo: function(moveDom){
        this.lastMove.deleteSlider = "transform:translateX(0px)";
        this.lastMove = moveDom;

      },
      addPhoto: function(){
        this.doms.push({
          index: this.index,
          type:1
        });
        this.index ++;
        this.showAddTopic = false;
        this.addTopicClass = "icon-topic-add";
      },
      addFont: function(){
        this.doms.push({
          index: this.index,
          type:2
        });
        this.index ++;
        this.addTopicClass = "icon-topic-add";
        this.showAddTopic = false;
      },
      addTopic: function(){
        this.lastMove.deleteSlider = "transform:translateX(0px)";
        if(this.addTopicClass == "icon-chose-course"){
          this.addTopicClass = "icon-topic-add";
          this.showAddTopic = false;
        }else{
          this.addTopicClass = "icon-chose-course";
          this.showAddTopic = true;
        }
      }
    },
    mounted(){
      var self = this;
      window.addEventListener("click", function(){
         if(!!self.lastMove){self.lastMove.deleteSlider = "transform:translateX(0px)"};
      });
    }
  }
</script>

<style lang="scss">
.container{
  padding: 17.5px;
  min-height: 100%;
  padding-bottom: 130px;
  position: relative;
}
.change-lessons{
  display: table;
  width: 100%;
  height: 100px;
  margin-bottom: 14.5px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-sizing: border-box;
  vertical-align: middle;
  zoom: 1;
  &:after{
    content: "\20";
    display: block;
    clear: both;
  }
  .icon-topic-add{
    width: 50%;
    display: table-cell;
    vertical-align: middle;
    text-align: right;
  }
  .icon-topic-add:before{
    margin-top: 33px;
    margin-right: 5px;
    font-size: 35px;
    color: #000;
  }
  span{
    width: 50%;
    display: table-cell;
    vertical-align: middle;
    padding-right: 5px;
    font-size: 15px;
    color: #000;
  }
}
.handle{
  background: #fff;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100%;
  .addTopic{
    position: absolute;
    right: 20px;
    bottom: 150px;
    font-size: 35px;
    &.icon-chose-course{
      transform:rotate(45deg);
    }
  }
  .addPhoto{
    display: block;
    position: absolute;
    right: 20px;
    bottom: 200px;
    &::before{
      display: block;
      margin-bottom: 7px;
      font-size: 35px;
    }
    text-align: center;
    font-size: 13px;
  }
  .addFont{
    display: block;
    position: absolute;
    right: 20px;
    bottom: 270px;
    &::before{
      display: block;
      margin-bottom: 7px;
      font-size: 35px;
    }
    text-align: center;
    font-size: 13px;
  }
  .sbumit{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 51.5px;
    font-size: 16px;
    color: #fff;
    background: #09a5ef;
    &.disable{
      color: #9e9e9e;
      background: #e9e9ea;
    }

  }
  .labes{
    min-height: 62.5px;
    margin: 14.5px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 13px;
    zoom: 1;
    &:after{
      content: "\20";
      clear: both;
      display: block;
    }
    i{
      display: block;
      margin-top: 24.5px;
      float: left;
      &.icon-arrow-right{
        float: right;
      }
    }
    span{
      margin-top: 24.5px;
      margin-left: 8px;
      display: block;
      float: left;
    }
    .labels-box{
      float: left;
      width: 76%;
      margin-left: 15px;
      margin-top: 21px;
      span{
        display: inline-block;
        margin-top: 0;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
        padding: 3px 6px;;
        border-radius: 4px;
        border: 1px solid #09a5ef;
        color: #09a5ef;
      }
    }
  }
}
.type_1{
  list-style: none;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  zoom: 1;
  &:after{
    content: "\20";
    display: block;
    clear: both;
  }
  img{
    display: block;
    float: left;
    width: 109.5px;
    height: 70.5px;
    border-radius: 8px;
  }
  .info{
    float: left;
    width: 56%;
    margin-left: 16.5px;
    h1{
      line-height: 17px;
      font-size: 14px;
    }
    a{
      display: block;
      margin-top: 4px;
      font-size: 12px;
    }
    p{
      margin-top: 15px;
      span{
        color: #09a5ef;
        font-size: 12px;
        display: inline-block;
        margin-right: 25px;
        i{
          margin-right: 4px;
        }
      }
    }
  }
}
.type_2{
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  h1{
    font-size: 14px;
    margin-bottom: 10px;
  }
  a{
    display: block;
    margin-bottom: 10px;
    font-size: 13px;
    color: #9e9e9e;
  }
  p{
    span{
      display: inline-block;
      margin-right: 28px;
      font-size: 13px;
      color: #09a5ef;
    }
  }
}

</style>
