<template>
<div class="modal-lesson">
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" v-model="keyword" @keyup="keyup" placeholder="请输入课程名或课时名">
    <a href="javaScript:;" @click="cleanMoal">取消</a>
  </div>
  <div class="nav">
    <a href="javaScript:;" :class="active1" @click="change_1">课程</a>
    <a href="javaScript:;" :class="active2" @click="change_2">课时</a>
  </div>
  <ul v-if="active1=='active'" class="classHour">
    <li @click="changeClassHour">
      <img src="http://static.bolzjb.com/assist/images/index-header-banner.jpg">
      <div class="info">
        <h1>基本动作教学基本动作教学基本动作教学基本动作</h1>
        <a class="name"><i class="icon-logo"></i>大葱摩卡</a>
        <p>
          <span><i class="icon-learn-count"></i>56874</span>
          <span><i class="icon-topic-count"></i>56</span>
        </p>
      </div>
    </li>
  </ul>
  <ul v-if="active2=='active'" class="class">
    <li @click="curriculum">
      <h1>基本动作教学基本动作教学基本动作教学基本动作</h1>
      <a>来自课程[这就是街舞-选手舞蹈动]</a>
      <p>
        <span>5.5k人学过</span>
        <span>38篇心得</span>
      </p>
    </li>
  </ul>
</div>
</template>

<script>
  export default {
    name: "add-lesson",
    data(){
      return{
        keyword: "",
        active1: "active",
        active2: "",
      }
    },
    methods:{
      changeClassHour(){
        this.$emit("cleanModal");
        this.$emit("changeType_1");
      },
      curriculum(){
        this.$emit("cleanModal");
        this.$emit("changeType_2");
      },
      change_1(){
        this.active1 = "active";
        this.active2 = "";
        
      },
      change_2(){
        this.active2 = "active";
        this.active1 = "";
        
      },
      keyup(){

      },
      cleanMoal(){
        this.$emit("cleanModal");
      }
    }
  }
</script>

<style lang="scss">
.modal-lesson{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #fff;
  .search-box{
    position: relative;
    margin: 17.5px;
    zoom: 1;
    &:after{
      content: "\20";
      display: block;
      clear: both;
    }
    i{
      position: absolute;
      left: 10px;
      top: 12px;
      &:after{
        position: absolute;
        top: 0px;
        left: 23px;;
        content: "\20";
        display: block;
        height: 15px;
        width: 1px;
        background: #09a5ef;
      }
    }
    input{
      display: block;
      float: left;
      background: #e8e8e9;
      outline: none;
      border: none;
      width: 80%;
      font-size: 13px;
      padding-left: 43.5px;
      line-height: 40px;
      border-radius: 8px;
      box-sizing: border-box;
    }
    a{
      display: block;
      float: left;
      font-size: 13px;
      line-height: 40px;
      margin-left: 20px;
      color: #9e9e9e;

    }
  }
  .nav{
    text-align: center;
    font-size: 14px;
    a{
       display: inline-block;
       margin: 0 25px 16.5px 25px;
       &.active{
         color: #09a5ef;
       }
    }
  }
  ul{
    border-top: 1px solid #eee;
    padding: 17.5px 0;
    margin-left: 17.5px;
    margin-right: 17.5px;
    &.classHour{
      li{
        list-style: none;
        margin-bottom: 15px;
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
            margin-top: 4px;
            span{
              font-size: 12px;
              display: inline-block;
              margin-right: 25px;
              color: #9e9e9e;
              i{
                margin-right: 4px;
              }
            }
          }
        }
      }
    }
    &.class{
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
          color: #9e9e9e;
        }
      }
    }
  }
}
</style>
