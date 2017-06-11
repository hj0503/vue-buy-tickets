<template>
  <div id="app">
    <transition name="fade">
      <router-view class="show"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
@import '../static/css/reset.css'
.show
  position absolute
  top 0
  left 0
  width 100%
  height 100%
.fade-enter-active, .fade-leave-active
  transition all .2s ease-in-out
  transform translate3d(0,0,0)
.fade-enter, .fade-leave-active
  transform translate3d(100%,0,0)
</style>
