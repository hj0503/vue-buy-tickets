<template lang="html">
  <div>
    <div class="header">
      <div class="cm-header">
      	<span class="cm-header-icon" @click="back">
      	  <i class="icon-back"></i>
      	</span>
      	<h1 class="cm-page-title">{{TrainTicketsList[0].trainOpp}}</h1>
      </div>
    </div>
    <div class="view">
      <div>
      	<ul class="train-book-modify">
      	  <li class="from">
      	  	<strong>{{TrainTicketsList[0].start_station}}</strong>
      	  	<span>{{TrainTicketsList[0].leave_time}}</span>
      	  </li>
      	  <li class="to">
      	  	<strong>{{TrainTicketsList[0].end_station}}</strong>
      	  	<span>{{TrainTicketsList[0].arrived_time}}</span>
      	  </li>
      	  <li class="mid">
      	  	<span class="jt-info"></span>
      	  </li>
      	</ul>
      </div>
      <div class="wrapper">
      	<ul class="train-list" v-for="(train,index) in TrainTicketsList[0].price_list">
      	  <li class="seat">{{train.price_type}}</li>
      	  <li class="price">{{train.price}}</li>
      	  <li class="ticket" v-if="train.number.substring(0,train.number.length-1) > 0">{{train.number}}</li>
          <li class="ticket" v-if="train.number.substring(0,train.number.length-1) == 0">无票</li>
      	  <li class="grab">
            <span v-if="train.number.substring(0,train.number.length-1) > 0" @click="displayBooking(index)">预定</span>
            <span class="red" v-if="train.number.substring(0,train.number.length-1) == 0" @click="buy(index)">抢票</span>
          </li>
      	</ul>
      </div>
    </div>
    <div class="bottom">
      <ul class="train-choose">
      	<li>快速抢票</li>
      	<li>在线选座</li>
      	<li>智能查询</li>
      </ul>
    </div>
    <transition name="pop-up">
      <div class="pop-up-box" v-if="show">
        <!-- <div class="remind" v-if="showBuyRemind">
          <p class="description">
            购票成功，留在此页还是返回首页？
          </p>
          <p class="two">
            <span class="go-home" @click="$router.push('/order')">查看订单</span>
            <span class="here" @click="show = false">留在此页</span>
          </p>
        </div> -->
        <div class="remind" v-if="showGradRemind">
          <p class="description">
            亲,抢票功能待开发中
          </p>
          <p class="two">
            <span class="go-home" @click="$router.push('/home/trainticket')">回到首页</span>
            <span class="here" @click="show = false">留在此页</span>
          </p>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="mask" v-if="show"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
  	return {
  	  count: 0,
      show: false,
      showGradRemind: false,
      showBuyRemind: false
  	}
  },
  mounted () {
    this.$store.state.ticketBooking = this.TrainTicketsList
  },
  computed: {
  	TrainTicketsList () {
  	  return this.$store.state.TrainTicketsList.filter((traintickets) => {
  	    return traintickets.trainOpp.indexOf(this.$route.params.id) > -1
  	  })
  	}
  },
  methods: {
  	back () {
  	  this.$router.push('/showtickets')
  	},
    buyticket () {

    },
  	buy (index) {
        this.show = true
        this.showBuyRemind = false
        this.showGradRemind = true
  	},
    displayBooking (id) {
      this.$router.push(
        {name: 'ticketbooking', params: { 'id': id }}
      )
    }
  }
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
  .train-book-modify
  	background #099fde
  	overflow hidden
  	li
  	  padding 0.16rem 0 0.48rem
  	  w30p	
  	  text-align center
  	  color #fff
  	  font-size 14px
  	  position relative
  	  strong
  	  	display block
  	  	font-size 25px
  	  	line-height 2em
  	  	font-weight bold
  	  &.from
  	  	text-align left
  	  	padding-left 0.4rem 
  	  	float left
  	  &.to
  	  	text-align right
  	  	padding-right 0.4rem
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
  .wrapper
  	margin-top 0.266667rem
  	background #fff
	  .train-list
	  	height 1.333333rem
	  	font-size 0.373333rem
	  	position relative
	  	display flex
	  	flex-direction row
	  	align-items center
	  	li
	  	  text-align center
	  	  flex 1
	  	  &.price
	  	  	font-weight 600
	    &:after
	      content ''
	      position absolute
	      bottom 0
	      right 0
	      left 0
	      height 1px
	      background #ccc
	      transform scaleY(.5)
	      transform-origin 0 0
.bottom
  position fixed
  bottom 0
  right 0
  left 0
  background #fff
  .train-choose
  	height 1.173333rem
  	font-size 12px
  	display flex
  	align-items center
	li
	  flex 1
	  text-align center
	  &.grab
	  	span
	  	  color #fff
	  	  padding 0.133333rem 0.533333rem
	  	  border-radius 3px
	  	  background-color #099fde
      &.red
        background-color #FF7F24
.mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0,0,0,.5)
  z-index 990
.pop-up-box
  position fixed
  width 8.0rem
  height 4.0rem
  top 50%
  left 50%
  margin-left -4.0rem
  margin-top -2.0rem
  border-radius 0.266667rem
  background #fff
  z-index 3001
  .remind
    text-align center
    padding 1.066667rem 0.533333rem 0 0.533333rem
    p
      font-size 0.426667rem
      padding-bottom 0.8rem
      &.two
        overflow hidden
        span
          display inline-block
          padding 0.266667rem
          color #fff
          border-radius 5px
          &.go-home
            float left
            background #7ec0ee
          &.here
            float right
            background #7ec0ee
.pop-up-enter-active,.pop-up-leave-active
  transition all .5s
  transform translateY(0)
  opacity 1
.pop-up-enter,.pop-up-leave-active
  transform translateY(-100%)
  opacity 0
.mask-enter-active,.mask-leave-active
  transition all .5s
  opacity 1
.mask-enter,.mask-leave-active
  opacity 0
</style>
