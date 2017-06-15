<template lang="html">
  <div>
    <div class="header">
      <div class="cm-header">
      	<span class="cm-header-icon" @click="back">
      	  <i class="icon-back"></i>
      	</span>
      	<h1 class="cm-page-title">{{$store.state.startCity}} ⇀ {{$store.state.reachCity}}</h1>
      </div>
      <div>
      	<ul class="train-listdate">
      	  <li class="prev fl" :class="{noTrain:noPrev}" @click="prev">前一天</li>
      	  <li class="now">
      	  	<div @click="$router.push('/showcalendarinput')">
              <span>{{$store.state.month}}月{{$store.state.day}}日 {{$store.state.week}}</span></div>
      	  </li>
      	  <li class="next fr" @click="next">后一天</li>
      	</ul>
      </div>
    </div>
    <div class="view">
      <ul class="train-common-content">
      	<li class="train-sel-box"  v-for="(ticket, index) in $store.state.TrainTicketsList" @click="displayTicket(ticket.trainOpp)">
      	  <div class="train-sel-bd">
      	  	<div class="sel-from">
      	  	  <strong>{{ticket.leave_time}}</strong>
      	  	  <p>{{ticket.start_station}}</p>
      	  	</div>
      	  	<div class="sel-checi">
      	  	  <p>{{ticket.trainOpp}}</p>
      	  	  <div class="mid-box">
      	  	  	<i class="from shizhong"></i>
      	  	  	<span class="mid-border"></span>
      	  	  	<i class="to shizhong"></i>
      	  	  </div>
      	  	  <p>{{ticket.time_spent}}</p>
      	  	</div>
      	  	<div class="sel-to">
      	  	  <strong>{{ticket.arrived_time}}</strong>
      	  	  <p>{{ticket.end_station}}</p>
      	  	</div>
      	  	<div class="sel-price">
      	  	  <span class="train-price">
      	  	    {{ticket.money | formatMoney}}起
      	  	  </span>
      	  	</div>
      	  </div>
      	  <ul class="sel-info">
      	  	<li v-for="price in $store.state.TrainTicketsList[index].price_list">
      	  	  {{price.price_type}}:{{price.price | formatMoney}}
      	  	</li>
      	  </ul>
      	</li>
      </ul>
    </div>
    <div class="remind" v-if="$store.state.noTrain">
      <i></i>
      <span>抱歉，没有帮您找到符合条件的车次~</span>
    </div>
    <ul class="train-filterbar">
      <li @click="show = true">高级筛选</li>
      <li :class="{selected:selected=='出发时间'}" @click="startTime">出发时间</li>
      <li :class="{selected:selected=='旅游耗时'}" @click="timeSpent">旅行耗时</li>
      <li :class="{selected:selected=='所需票价'}" @click="price">所需票价</li>
    </ul>
    <transition name="filter-box">
      <section class="train-tip-bot" v-show="show">
      	<div class="train-cui-hd">
      	  <div class="train-cancel-btn" @click="show = false">取消</div>
      	  <div class="train-center-title">
      	  	<span>筛选</span>
      	  </div>
      	  <div class="train-ok-btn" @click="inquire"><p @click="show = false">确定</p></div>
      	</div>
      	<div class="train-filter-box">
      	  <p>车次类型</p>
      	  <ul class="train-filter-list">
      	  	<li>
      	  	  <input type="checkbox" id="checkgt" value="高铁" v-model="$store.state.checkedValue">
      	  	  <label for="checkgt"></label>
      	  	  <span>高铁(G)</span>
      	  	</li>
      	  	<li>
      	  	  <input type="checkbox" id="checkdc" value="动车" v-model="$store.state.checkedValue">
      	  	  <label for="checkdc"></label>
      	  	  <span>动车(D)</span>
      	  	</li>
      	  	<li>
      	  	  <input type="checkbox" id="checkpt" value="普通" v-model="$store.state.checkedValue">
      	  	  <label for="checkpt"></label>
      	  	  <span>普通(Z/K/T)</span>
      	  	</li>
      	  	<li>
      	  	  <input type="checkbox" id="checkqt" value="其他" v-model="$store.state.checkedValue">
      	  	  <label for="checkqt"></label>
      	  	  <span>其他(L/Y/等)</span>
      	  	</li>
      	  </ul>
      	</div>
      </section>
    </transition>
    <transition name="mask">
      <div class="mask"  @click="show = false" v-show="show"></div>
    </transition>	
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
  	return {
  	  month: this.$store.state.month,
  	  day: this.$store.state.day,
  	  selected: '出发时间',
  	  show: false
  	}
  },
  filters:{
    formatMoney:function(value){
      return "￥"+value;
    }
  },
  mounted () {
  	this.showRemind()
    this.$store.state.checkedValue = []
  },
  updated () {
    this.showRemind()
    this.$store.state.checked = ''
  },
  computed: {
    noPrev () {
      if(this.$store.state.day === new Date().getDate() && this.$store.state.month === new Date().getMonth() + 1) {
        return true
      }
    }
  },
  methods: {
  	...mapActions ([
      'prev',
      'next',
      'inquire'
    ]),
    displayTicket (id) {
      this.$router.push(
        {name: 'buyticket', params: { 'id': id }}
      )
    },
  	startTime () {
  	  this.$store.state.TrainTicketsList.sort( (a,b) => { return a.leave_time > b.leave_time ? 1 : -1 })
  	  this.selected = '出发时间'
  	},
  	timeSpent () {
  	  this.$store.state.TrainTicketsList.sort( (a,b) => { return a.time_spent.replace(/[^0-9]/ig,"") - b.time_spent.replace(/[^0-9]/ig,"") || a.oldIndex - b.oldIndex })
  	  this.selected = '旅游耗时'
  	},
  	price () {
  	  this.$store.state.TrainTicketsList.sort( (a,b) => { return a.money - b.money || a.oldIndex - b.oldIndex })
  	  this.selected = '所需票价'
  	},
  	back () {
  	  this.$router.push('/home/trainticket ')
  	},
  	showRemind () {
  	  if(this.$store.state.TrainTicketsList.length <= 0) {
  	  	this.$store.state.noTrain = true
  	  }else {
  	  	this.$store.state.noTrain = false
  	  }
  	}
  }
}
</script>

<style lang="stylus" scoped>
.header
  .cm-header
  	position fixed
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
  .train-listdate
  	position fixed
  	top 1.173333rem
  	background #099fde
  	color #fff
  	padding 0.266667rem 0
  	margin-bottom -1px
  	width 100%
  	overflow hidden
  	text-align center
  	z-index 100
  	li
  	  line-height 0.8rem
  	  position relative
  	  vertical-align middle
  	  display inline-block
  	  font-size 0.373333rem
  	  text-align center
  	  &.fl
  	  	float left
  	  &.fr
  	  	float right
  	  &.prev
  	    padding-left 0.8rem
  	    font-size 0.346667rem
  	    text-align left
  	    width 1.333333rem
  	    padding-right 0.4rem
  	    &.noTrain
  	      color #ccc
  	      &:after
  	      	border-top 2px solid #ccc
  	  	    border-right 2px solid #ccc
  	    &:after
  	  	  content ''
  	  	  position absolute
  	  	  width 0.16rem
  	  	  height 0.16rem
  	  	  border-top 2px solid #fff
  	  	  border-right 2px solid #fff
  	  	  transform rotate(-135deg)
  	  	  left 0.4rem
  	  	  top 50%
  	  	  margin-top -0.1rem
  	  &.now
  	  	position relative
  	  	width 35%
  	  	text-indent -0.4rem
  	  	background #fff
  	  	border-radius 4px
  	  	color #099fde
  	  	line-height 0.853333rem
  	  	height 0.8rem
  	  	overflow hidden
  	  	&:after
  	  	  content ''
  	  	  position absolute
  	  	  width 0.16rem
  	  	  height 0.16rem
  	  	  border-top 2px solid #099fde
  	  	  border-right 2px solid #099fde
  	  	  transform rotate(135deg)
  	  	  right 0.32rem
  	  	  top 50%
  	  	  margin-top -0.16rem
  	  &.next
  	  	padding-right 0.8rem
  	  	font-size 0.346667rem
  	  	text-align right
  	  	width 1.333333rem
  	  	padding-left 0.4rem
  	  	&:after
  	  	  content ''
  	  	  position absolute
  	  	  width 0.16rem
  	  	  height 0.16rem
  	  	  border-top 2px solid #fff
  	  	  border-right 2px solid #fff
  	  	  transform rotate(45deg)
  	  	  right 0.4rem
  	  	  top 50%
  	  	  margin-top -0.1rem
.view
  position absolute
  width 100%
  bottom 0
  top 2.506667rem
	.train-common-content
    position absolute 
    width 100%
    top 0
    bottom 1.333333rem
    overflow auto
	  .train-sel-box
	  	margin 0.16rem
	  	background #fff
	  	border-radius 4px
	  	padding 0.133333rem 0
	  	overflow hidden
	  	line-height 0.72rem
	  	.train-sel-bd
	  	  padding 0.266667rem 0.133333rem
	  	  overflow hidden
	  	  .sel-from
	  	  	width 27%
	  	  	float left
	  	  	font-size 18px
	  	  	p
	  	  	  font-size 15px
	  	  	strong
	  	  	  font-size 20px
	  	  .sel-checi
	  	  	width 19%
	  	  	float left
	  	  	text-align center
	  	  	p
	  	  	  font-size 12px
	  	  	.mid-box
	  	  	  height 0.266667rem
	  	  	  display flex
	  	  	  align-items center
	  	  	  justify-content space-between
	  	  	  margin -0.16rem 0
	  	  	  i
	  	  	  	border-radius 50%
	  	  	  	vertical-align middle
	  	  	  .shizhong
	  	  	  	width 0.213333rem
	  	  	  	height 0.213333rem
	  	  	  	background #e5e5e5
	  	  	  .mid-border
	  	  	  	height 0.053333rem
	  	  	  	background #f0f0f0
	  	  	  	width 0.533333rem
	  	  	  	flex 1
	  	  	  	vertical-align middle
	  	  .sel-to
	  	  	text-align right
	  	  	width 27%
	  	  	float left
	  	  	font-size 18px
	  	  	p
	  	  	  font-size 15px
	  	  	strong
	  	  	  font-size 20px
	  	  .sel-price
	  	  	float right
	  	  	text-align right
	  	  	width 27%
	  	  	color #ff9a14
	  	  	.train-price
	  	  	  font-size 16px
	  	.sel-info
	  	  line-height 25px
	  	  clear both
	  	  padding 0.133333rem 0.133333rem 0
	  	  font-size 10px
	  	  li
	  	  	float left
	  	  	white-space nowrap
	  	  	&:first-child
	  	  	  width 27%
	  	  	&:nth-child(2)
	  	  	  width 19%
	  	  	  text-align center
	  	  	&:nth-child(3)
	  	  	  width 27%
	  	  	  text-align right
.train-filterbar
  height 1.28rem
  border-top 1px solid #293443
  background rgba(40,56,71,.9)
  overflow hidden
  display flex
  position fixed
  left 0
  right 0
  bottom 0
  z-index 100
  li
  	flex 1
  	text-align center
  	line-height 1.28rem
  	font-size 12px
  	color #fff
  	position relative
  	&:after
  	  content ''
  	  position absolute
  	  top 0.426667rem
  	  bottom 0.426667rem
  	  right 0
  	  width 1px
  	  background #fff
  	&:last-child:after
  	  content ''
  	  width 0
  	&.selected
      color #099fde
.remind
  width 100%
  position absolute
  top 50%
  transform translateY(-50%)
  text-align center
  span
  	font-size 14px
  	color #999
  i
    width 4.0rem
    height 4.0rem
    margin 1.333333rem auto 0.4rem
    display block
    background url(http://pic.c-ctrip.com/h5/train/dolphins_fail.png) no-repeat
    background-size cover
.train-tip-bot
  position fixed
  left 0
  right 0
  bottom 0
  z-index 3001
  .train-cui-hd
    background rgba(40,56,71,.95)
    color #fff
    font-size 17px
    display table
    width 100%
    padding 0.213333rem 0
    height 0.746667rem
    overflow hidden
    min-width 8.533333rem
    div
  	  display table-cell
  	  line-height 0.8rem
  	  text-align center
  	  &.train-cancel-btn
  	    padding-left 0.4rem
  	    text-align left
  	    width 20%
  	  &.train-ok-btn
  	    padding-right 0.4rem
  	    text-align right
  	    width 20%
  	    color #099fde
  .train-filter-box
    padding 0.4rem 0.8rem 0.4rem 0.8rem
    overflow hidden
    background #fff
    p
      font-size 15px
      line-height 0.533333rem
      text-align center
      color #ccc
    .train-filter-list
  	  overflow hidden
  	  margin 0.266667rem 0 0.266667rem
  	  li
  	    float left
  	    width 50%
  	    font-size 15px
  	    padding-bottom 0.533333rem
  	    input
  	  	  display none
  	    input[type=checkbox]:checked + label
  	      background #099fde
  	    label
  	      cursor pointer
  	      display inline-block
  	      position relative
  	      width 0.48rem
  	      height 0.48rem
  	      top 0
  	      left 0
  	      margin-right 0.266667rem
  	      box-sizing border-box
  	      border 1px solid #ddd
  	      border-radius 3px
  	      vertical-align middle
  	      &:after
  	  	    content ''
  	  	    position absolute
  	  	    width 0.213333rem
  	  	    height 0.133333rem
  	  	    background transparent
  	  	    top 0.08rem
  	  	    left 0.08rem
  	  	    border 2px solid #fff
  	  	    border-top none
  	  	    border-right none
  	  	    transform rotate(-45deg)
.mask
  z-index 990
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0,0,0,.5)
.filter-box-enter-active,.filter-box-leave-active
  transition all .5s
  transform translateY(0)
.filter-box-enter,.filter-box-leave-active
  transform translateY(100%)
.mask-enter-active,.mask-leave-active
  transition all .5s
  opacity 1
.mask-enter,.mask-leave-active
  opacity 0
</style>
