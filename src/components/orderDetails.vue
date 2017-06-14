<template lang="html">
  <div>
    <div class="header">
      <div class="cm-header">
      	<span class="cm-header-icon" @click="$router.push('/order')">
      	  <i class="icon-back"></i>
      	</span>
      	<h1 class="cm-page-title">订单详情</h1>
      </div>
    </div>
    <div class="view">
  	  <div class="remind">
  	    <div class="number">取票号:<span>EB9909685</span></div>
  	    <div class="wait">候车点:<span>二层候车室</span></div>
  	  </div>
  	  <div class="order">
	  	<ul class="train-book-modify">
	  	  <li class="time">{{$store.state.year}}-{{$store.state.month}}-{{$store.state.day}} {{$store.state.week}} 开</li>
  	      <li class="from">
  	  	    <strong>{{$store.state.setOrderList[$route.params.id].start_station}}</strong>
  	  	    <span>{{$store.state.setOrderList[$route.params.id].leave_time}}</span>
  	      </li>
  	      <li class="to">
  	  	    <strong>{{$store.state.setOrderList[$route.params.id].end_station}}</strong>
  	  	    <span>{{$store.state.setOrderList[$route.params.id].arrived_time}}</span>
  	      </li>
  	      <li class="mid">
  	  	    <span class="jt-info"></span>
  	  	    <span class="train-name">{{$store.state.setOrderList[$route.params.id].trainOpp}}</span>
  	      </li>
  	    </ul>
  	  	<div class="order-information" v-for="passenger in $store.state.setOrderList[$route.params.id].passengerList">
  	  	  <div class="sel-left">
  	  	  	<p class="my">
  	  	  	  <span class="name">{{passenger.name}}</span>
  	  	  	  <span class="type">{{passenger.type}}票</span>
  	  	  	</p>
  	  	  	<p class="card">{{passenger.card}}</p>
  	  	  	<p class="status">已出票</p>
  	  	  </div>
  	  	  <div class="sel-right">
  	  	  	<p class="number">12车厢06F号</p>
  	  	  	<p class="price-list">
  	  	  	  <span class="price-seat">{{$store.state.setOrderList[$route.params.id].type}}</span>
  	  	  	  <span class="price">￥{{$store.state.setOrderList[$route.params.id].price}}</span>
  	  	  	</p>
  	  	  </div>
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
.header
  .cm-header
  	position relative
  	top 0
  	left 0
  	right 0
  	height 1.173333rem
  	line-height 1.173333rem
  	text-align center
  	background-color #099fde
  	color #fff
  	z-index 100
  	.cm-header-icon
  	  width 1.173333rem
  	  height 1.173333rem
  	  display inline-block
  	  text-align center
  	  cursor pointer
  	  float left
  	  .icon-back
  	  	line-height 1.173333rem
  	  	width 1.173333rem
  	  	height 1.173333rem
  	  	font-weight 400
  	  	&:before
  	  	  content ''
  	  	  display inline-block
  	  	  width 0.266667rem
  	  	  height 0.266667rem
  	  	  vertical-align middle
  	  	  border-left 2px solid #fff
  	  	  border-bottom 2px solid #fff
  	  	  transform rotate(45deg)
  	  	  box-sizing border-box
  	.cm-page-title
  	  position absolute
  	  left 2.346667rem
  	  right 2.346667rem
  	  line-height 1.173333rem
  	  font-size 18px
  	  overflow hidden
  	  text-overflow ellipsis
  	  white-space nowrap
  	  font-weight 400
  	  font-family inherit
.view
  .remind
  	width 100%
  	text-align center
  	margin 0.266667rem 0
  	div
  	  display inline-block
  	  font-size 14px
  	  padding 0 0.266667rem
  	  letter-spacing 2px
  	  span
  	  	padding-left 0.266667rem
  	  &.wait
  	  	color #66cd00
  .order
  	width 95%
  	margin 0 auto
  	border-radius 0.213333rem 0.213333rem 0 0
  	background #fff
	  .train-book-modify
	  	border-radius 0.213333rem 0.213333rem 0 0
	  	background #099fde
	  	overflow hidden
	  	li
	  	  padding 0.16rem 0 0.48rem
	  	  text-align center
	  	  color #fff
	  	  font-size 14px
	  	  position relative
	  	  strong
  	  	    display block
  	  	    font-size 25px
  	  	    padding-bottom 0.533333rem
  	  	    font-weight bold
  	  	  &.time
  	  	  	padding 0.266667rem 0.266667rem 0.16rem 0.266667rem
	  	  &.from
	  	  	text-align left
	  	  	padding-left 0.4rem
	  	  	float left
	  	  &.to
	  	  	text-align right
	  	  	padding-right 0.4rem
	  	  	padding-left 0.533333rem
	  	  	float right
	  	  &.mid
	  	  	padding 0.666667rem 0 0
	  	  	overflow hidden
	  	  	height 1.333333rem
	  	  	.jt-info
	  	  	  display block
	  	  	  font-size 11px
	  	  	  border-radius 4px
	  	  	  width 1.466667rem
	  	  	  height 50%
	  	  	  margin 0.053333rem auto
	  	  	  position relative
	  	  	  &:before
	  	  	  	position absolute
	  	  	  	content ''
	  	  	  	top 0
	  	  	  	left 0
	  	  	  	width 100%
	  	  	  	height 100%
	  	  	  	border-radius 4px
	  	  	  	box-sizing border-radius
	  	  	  	transform rotate(.5)
	  	  	  	transform-origin left top
	  	  	  	border 1px solid #fff
	  	  	  	content '经停信息'
	  	  	  	font-size 10px
	  	  	  	height 0.466667rem
	  	  	  	line-height 0.466667rem 
	  	  	  	text-align center
	  	  	  	background #099fde
	  	  	  	z-index 2
	  	  	  &:after
	  	  	  	width 2.133333rem
	  	  	  	height 1px
	  	  	  	position absolute
	  	  	  	content ''
	  	  	  	background hsla(0,0%,100%,.5)
	  	  	  	left 50%
	  	  	  	top 0.24rem
	  	  	  	margin-left -1.066667rem
	  	  	  	z-index 1
	  	  	.train-name
	  	  	  display block
	  	  	  text-align center
	  .order-information
	  	overflow hidden
	  	padding 0.4rem 0.266667rem 0.266667rem 0.266667rem
	  	font-size 14px
	  	.sel-left
	  	  float left
	  	  color #a9a9a9
	  	  p
	  	  	padding 0.266667rem
	  	  	.name
	  	  	  font-size 16px
	  	  	  color #000
	  	  	  padding-right 0.266667rem
	  	.sel-right
	  	  color #8b7d6b
	  	  float right
	  	  p
	  	  	padding 0.266667rem	  	 
</style>
