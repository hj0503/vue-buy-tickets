<template lang="html">
  <div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer-nav">
      <ul class="nav">
        <li>
          <router-link to="/home/trainticket" class="tab">
            <i class="iconfont icon-home">&#xe79d;</i>
            <span>首页</span>
          </router-link>
        </li>
        <li>
          <router-link to="/grabvotes" class="tab">
            <i class="iconfont icon-timing">&#xe607;</i>
            <span>抢票</span>
          </router-link>
        </li>
        <li>
          <router-link to="/order" class="tab">
            <i class="iconfont icon-order">&#xe62a;</i>
            <span>订单</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my" class="tab">
            <i class="iconfont icon-my1">&#xe66e;</i>
            <span>我的</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
// @import '../common/fonts/index/iconfont.css'
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_9kyq7u5b4fdbcsor.eot');
  src: url('//at.alicdn.com/t/font_9kyq7u5b4fdbcsor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_9kyq7u5b4fdbcsor.woff') format('woff'),
  url('//at.alicdn.com/t/font_9kyq7u5b4fdbcsor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_9kyq7u5b4fdbcsor.svg#iconfont') format('svg');
}
.iconfont
  font-family "iconfont"
  font-size 2.2rem
  font-style normal
  font-weight bold
.footer-nav
  width 100%
  background-color #fff
  position fixed
  bottom 0
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
          color #099def
</style>
