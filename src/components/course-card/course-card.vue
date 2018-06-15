<!--<template>-->
<!--<div class="base-course-wrapper" @click="goToCourseDetail">-->
<!--<div class="cover">-->
<!--<img :src="baseCourse.cover_url" :alt="baseCourse.id">-->
<!--</div>-->
<!--<div class="course-content">-->
<!--<h2 class="name">{{baseCourse.name}}</h2>-->
<!--<div class="bottom-wrapper">-->
<!--<span class="text">{{baseCourse.views_count}}人学过</span>-->
<!--<span>{{baseCourse.topics_count}}篇心得</span>-->
<!--</div>-->
<!--</div>-->

<!--<div class="learned" v-if="learning.id">-->
<!--<i class="icon-learned"></i>-->
<!--<span class="text">已学过</span>-->
<!--</div>-->

<!--<div class="no-learned" v-if="!learning.id">-->
<!--<i class="icon-no-learn"></i>-->
<!--<span class="text">去学习</span>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->

<!--const EVENT_SELECT = 'select'-->
<!--export default {-->
<!--name: 'course-card',-->
<!--props: {-->
<!--link: {-->
<!--type: Boolean,-->
<!--default: true-->
<!--},-->
<!--learning: {-->
<!--type: Object,-->
<!--default() {-->
<!--return {}-->
<!--}-->
<!--},-->
<!--baseCourse: {-->
<!--type: Object,-->
<!--default: function () {-->
<!--return {-->
<!--id: 0,-->
<!--name: "",-->
<!--account_id: 0,-->
<!--account: {},-->
<!--type: "course",-->
<!--views_count: 0,-->
<!--topics_count: 0,-->
<!--cover_url: '',-->
<!--published_at: ""-->
<!--}-->
<!--}-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--goToCourseDetail() {-->
<!--if (this.link) {-->
<!--this.$router.push({-->
<!--path: `/courses/${this.baseCourse.id}`-->
<!--})-->
<!--}-->
<!--this.$emit(EVENT_SELECT, this.baseCourse)-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--@import "../../common/styles/mixin";-->

<!--.base-course-wrapper {-->
<!--display: flex;-->
<!--.cover {-->
<!--flex: 0 0 109px;-->
<!--box-sizing: border-box;-->
<!--padding-right: 18px;-->
<!--&gt; img {-->
<!--width: 109px;-->
<!--height: 76px;-->
<!--border-radius: 10px;-->
<!--}-->
<!--}-->
<!--.course-content {-->
<!--flex: 1;-->
<!--position: relative;-->
<!--.name {-->
<!--@include multi-line-text(2);-->
<!--line-height: 18px;-->
<!--font-size: 14px;-->
<!--font-weight: bold;-->
<!--}-->
<!--.course-name {-->
<!--@include multi-line-text(1);-->
<!--margin-top: 8px;-->
<!--font-size: 14px;-->
<!--line-height: 18px;-->
<!--color: $gray;-->
<!--}-->
<!--.bottom-wrapper {-->
<!--position: absolute;-->
<!--bottom: 0;-->
<!--line-height: 16px;-->
<!--font-size: 12px;-->
<!--color: $blue;-->
<!--.text {-->
<!--margin-right: 25px;-->
<!--}-->
<!--}-->

<!--}-->

<!--.learned, .no-learned {-->
<!--display: flex;-->
<!--flex-direction: column;-->
<!--margin-top: 9px;-->
<!--margin-left: 25px;-->
<!--text-align: center;-->
<!--font-size: 26px;-->
<!--.text {-->
<!--margin-top: 7.5px;-->
<!--font-size: 10px;-->
<!--}-->
<!--}-->
<!--.learned {-->
<!--color: $gray;-->
<!--}-->
<!--.no-learned {-->
<!--color: $blue;-->
<!--}-->
<!--}-->
<!--</style>-->
