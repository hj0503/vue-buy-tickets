<template>
  <div class="resume">
  <div class="about">
    <h1 class="name">黄俊</h1>
    <div class="intention">求职意向：</br><span>web前端工程师</span></div>
    <div class="info">
      <div class="info-title">个人信息：</div>
    <div class="info-item">
      <i class="icon school"></i>
      <span>东华理工大学(本科)</span>
    </div>
    <div class="info-item">
      <i class="icon major"></i>
      <span>软件工程(2018届毕业)</span>
    </div>
    <div class="info-item">
      <i class="icon phone"></i>
      <span>18279185695</span>
    </div>
    <div class="info-item">
      <i class="icon email"></i>
      <span>857131753@qq.com</span>
      </div>
    </div>
  </div>
  <div class="power">
    <div class="power-item">
        <div class="title">
          <i class="icon technology"></i>
            <span class="name">技术栈</span>
        </div>
        <div class="technology-item">
            <span>【前端】</span>
            HTML/HTML5 &nbsp CSS/CSS3 &nbsp JavaScript(ES6,ES5) &nbsp SASS &nbsp Stylus &nbsp Vue.JS &nbsp AJAX &nbsp jQuery &nbsp 微信小程序 &nbsp Babel
        </div>
        <div class="technology-item">
            <span>【后端】</span>Node.js (express)
        </div>
        <div class="technology-item">
            <span>【数据库】</span>MongoDB
        </div>
        <div class="technology-item">
            <span>【自动化构建】</span>Webpack
        </div>
        <div class="technology-item">
            <span>【版本管理】</span>git
        </div>         
      </div>
      <div class="power-item">
        <div class="title">
          <i class="icon evaluation"></i>
          <span class="name">个人评价</span>
        </div>
        <div class="myevaluation">本人是软件学院的学生，在校学习了多门编程语言，有良好的编程思想。课外学习主要是看书，逛一些技术社区，以及看视屏，学习好的分享技术.技术发展太快，我会以更开发的心态去接受新技术，不断扩展自己。我相信自己可以做好本职工作。我相信自己可以很快的融入公司的技术团队。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.resume
  display: flex
  position absolute
  top 0
  bottom 1.333333rem
  width 100%
  overflow hidden
  .about
    width: 4.0rem
    height 100%
    background-color #099fde
    padding: 0.053333rem
    box-sizing: border-box
    color: #fff
    .name
      text-align: center
      margin: 0.533333rem auto 1.066667rem
      font-size: 0.426667rem
      font-weight: 600
    .intention
      font-size: 14px
      span
        display: block
        text-align: right
        font-size: 12px
        line-height: 0.48rem
        margin: 0.533333rem 0
        letter-spacing: 1px
    .info
      .info-title
        font-size: 14px
      .info-item
        display: flex
        margin: 0.266667rem 0 0.533333rem 0
        height: 1.066667rem
        line-height: 1.066667rem
        align-items center
        .icon
          width: 0.533333rem
          height: 0.533333rem
          background-color: #fff
          border-radius: 50%
          margin-right: 0.053333rem
          background-position: center
          background-repeat: no-repeat
          background-size: 26px
          // &.school
          //       background-image: url(school.png)
          // &.major
          //       background-image: url(major.png)
          // &.phone
          //       background-image: url(phone.png)
          //       background-size: 32px
          // &.email
          //       background-image: url(email.png)
  .power
    flex: 1
    overflow-y: auto
    padding 0.266667rem
    background-color: #fff
    .power-item
      color: #099fde
      .title
        display: flex
        margin-bottom: 0.533333rem
        .icon
          display: inline-block
          width: 1.066667rem
          height: 1.066667rem
          background-color: #099fde
          border-radius: 50%
          margin-right: 0.266667rem
          background-position: center
          background-repeat: no-repeat
          background-size: 0.8rem
          // &.technology
          //   background-size: 35px
          //   background-image: url(technology.png)
          // &.evaluation
          //   background-image: url(evaluation.png)
        .name
          flex: 1
          display: inline-block
          height: 1.066667rem
          font-size: 0.533333rem
          font-weight: 600
          line-height: 1.066667rem
          box-sizing: border-box
          border-bottom: 2px solid #099fde
      .technology-item
        margin: 0.266667rem auto
        font-size: 14px
        line-height: 0.533333rem
        span
          display: inline-block
          font-size: 18px
      .myevaluation
        font-size 14px
        line-height 0.533333rem
</style>
