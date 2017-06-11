<template lang="html">
  <div>
    <div class="header-nav">
      <ul class="nav">
        <li>
          <router-link to="/home/trainticket" class="tab">
            <i class="iconfont icon-Train">&#xe8bd;</i>
            <span>火车票</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/home/airticket" class="tab">
            <i class="iconfont icon-aircraft01">&#xe63a;</i>
            <span>飞机票</span>
          </router-link>
        </li>
        <li>
          <router-link to="/home/carticket" class="tab">
            <i class="iconfont icon-bus">&#xe612;</i>
            <span>汽车票</span>
          </router-link>
        </li>
        <li>
          <router-link to="/home/hotel" class="tab">
            <i class="iconfont icon-hotel">&#xe6dc;</i>
            <span>酒店</span>
          </router-link>
        </li> -->
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_dcube4tydh392j4i.eot');
  src: url('//at.alicdn.com/t/font_dcube4tydh392j4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_dcube4tydh392j4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_dcube4tydh392j4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_dcube4tydh392j4i.svg#iconfont') format('svg');
}
.iconfont
  font-family "iconfont"
  font-size 2.2rem
  font-style normal
.header-nav
  width 100%
  background-color #099fde
  .nav
    display flex
    flex-direction row
    align-items center
    text-align center
    width: 100%
    height 50px
    font-size 12px
    li
      flex 1
      .tab
        display flex
        flex-direction column
        color #ccc
        &.active
          color #fff
</style>
