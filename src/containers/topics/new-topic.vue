<template>
<div class="container">
  <a href="javaScript:;" class="change-lessons"><i class="icon-add "></i><span>选择课程</span></a>
  <addType v-for="item in doms" :type="item.type" :no="item.index" @moveTo="moveTo" @deleteItem="deleteItem"></addType>
  <div class="handle">
    <div class="addItem" v-show="showAddTopic">
        <a href="javaScript:;" class="icon-add addFont" @click="addFont">文字</a>
        <a href="javaScript:;" class="icon-add addPhoto" @click="addPhoto">照片</a>
    </div>
     <a href="javaScript:;" :class="addTopicClass" class="addTopic" @click="addTopic"></a>
    <div class="labes"><i class="icon-tag"></i><span>标签</span><i class="icon-arrow-right"></i></div>
    <a href="javaScript:;" class="sbumit">发布</a>
  </div>
</div>
</template>

<script>
  import addType from './../../components/base-topic/add-topic-type.vue';
  export default {
    name: "base-topic",
    data(){
      return{
        addTopicClass: 'icon-add',
        showAddTopic: false,
        lastMove:Object,
        index: 2,
        doms:[{
          index: 1,
          type:1
        }]
      }
    },
    components: {
      addType
    },
    methods: {
      deleteItem: function(index){
        var res = [];
        console.info(this.doms.length)
        for(var i = 0; i < this.doms.length; i++){
          var item = this.doms[i];
          if(item.index != index){
            res.push(item);
          }
        }
        this.doms = res;
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
      },
      addFont: function(){
        this.doms.push({
          index: this.index,
          type:2
        });
        this.index ++;
      },
      addTopic: function(){
        this.lastMove.deleteSlider = "transform:translateX(0px)";
        if(this.addTopicClass == "icon-chose-course"){
          this.addTopicClass = "icon-add";
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
  .icon-add{
    width: 50%;
    display: table-cell;
    vertical-align: middle;
    text-align: right;
  }
  .icon-add:before{
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
    color: #9e9e9e;
    background: #e9e9ea;
  }
  .labes{
    height: 62.5px;
    margin: 14.5px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
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
  }
}

</style>
