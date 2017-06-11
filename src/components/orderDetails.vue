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
  	  	    <strong>{{$store.state.getOrderList[$route.params.id].start_station}}</strong>
  	  	    <span>{{$store.state.getOrderList[$route.params.id].leave_time}}</span>
  	      </li>
  	      <li class="to">
  	  	    <strong>{{$store.state.getOrderList[$route.params.id].end_station}}</strong>
  	  	    <span>{{$store.state.getOrderList[$route.params.id].arrived_time}}</span>
  	      </li>
  	      <li class="mid">
  	  	    <span class="jt-info"></span>
  	  	    <span class="train-name">{{$store.state.getOrderList[$route.params.id].trainOpp}}</span>
  	      </li>
  	    </ul>
  	  	<div class="order-information" v-for="passenger in $store.state.passengerList">
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
  	  	  	  <span class="price-seat">{{$store.state.getOrderList[$route.params.id].type}}</span>
  	  	  	  <span class="price">￥{{$store.state.getOrderList[$route.params.id].price}}</span>
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
  	height 4.4rem
  	line-height 4.4rem
  	text-align center
  	background-color #099fde
  	color #fff
  	z-index 100
  	.cm-header-icon
  	  width 4.4rem
  	  height 4.4rem
  	  display inline-block
  	  text-align center
  	  cursor pointer
  	  float left
  	  .icon-back
  	  	line-height 4.4rem
  	  	width 4.4rem
  	  	height 4.4rem
  	  	font-weight 400
  	  	&:before
  	  	  content ''
  	  	  display inline-block
  	  	  width 1rem
  	  	  height 1rem
  	  	  vertical-align middle
  	  	  border-left 2px solid #fff
  	  	  border-bottom 2px solid #fff
  	  	  transform rotate(45deg)
  	  	  box-sizing border-box
  	.cm-page-title
  	  position absolute
  	  left 8.8rem
  	  right 8.8rem
  	  line-height 4.4rem
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
  	margin 1rem 0
  	div
  	  display inline-block
  	  font-size 1.4rem
  	  padding 0 1rem
  	  letter-spacing 2px
  	  span
  	  	padding-left 1rem
  	  &.wait
  	  	color #66cd00
  .order
  	width 95%
  	margin 0 auto
  	border-radius .8rem .8rem 0 0
  	background #fff
	  .train-book-modify
	  	border-radius .8rem .8rem 0 0
	  	background #099fde
	  	overflow hidden
	  	li
	  	  padding .6rem 0 1.8rem
	  	  text-align center
	  	  color #fff
	  	  font-size 1.4rem
	  	  position relative
	  	  strong
  	  	    display block
  	  	    font-size 2.5rem
  	  	    padding-bottom 2rem
  	  	    font-weight bold
  	  	  &.time
  	  	  	padding 1rem 1rem .6rem 1rem
	  	  &.from
	  	  	text-align left
	  	  	padding-left 1.5rem
	  	  	float left
	  	  &.to
	  	  	text-align right
	  	  	padding-right 1.5rem
	  	  	padding-left 2rem
	  	  	float right
	  	  &.mid
	  	  	padding 2.5rem 0 0
	  	  	overflow hidden
	  	  	height 5rem
	  	  	.jt-info
	  	  	  display block
	  	  	  font-size 1.1rem
	  	  	  border-radius 4px
	  	  	  width 5.5rem
	  	  	  height 50%
	  	  	  margin .2rem auto
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
	  	  	  	font-size 1rem
	  	  	  	height 1.75rem
	  	  	  	line-height 1.75rem
	  	  	  	text-align center
	  	  	  	background #099fde
	  	  	  	z-index 2
	  	  	  &:after
	  	  	  	width 8rem
	  	  	  	height 1px
	  	  	  	position absolute
	  	  	  	content ''
	  	  	  	background hsla(0,0%,100%,.5)
	  	  	  	left 50%
	  	  	  	top 0.9rem
	  	  	  	margin-left -4rem
	  	  	  	z-index 1
	  	  	.train-name
	  	  	  display block
	  	  	  text-align center
	  .order-information
	  	overflow hidden
	  	padding 1.5rem 1rem 1rem 1rem
	  	font-size 1.4rem
	  	.sel-left
	  	  float left
	  	  color #a9a9a9
	  	  p
	  	  	padding 1rem
	  	  	.name
	  	  	  font-size 1.6rem
	  	  	  color #000
	  	  	  padding-right 1rem
	  	.sel-right
	  	  color #8b7d6b
	  	  float right
	  	  p
	  	  	padding 1rem	  	 
</style>
