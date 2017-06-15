<template lang="html">
  <div>
    <section class="train">
      <ul class="train-custom">
      	<li class="train-station">
      	  <router-link to="/selectcity" class="tab">
            <dd class="from" @click="startFocus" :class="{exchange:exchange}">{{ from }}</dd>
          </router-link>
      	  <router-link to="/selectcity" class="tab">
            <dd class="to" @click="reachFocus" :class="{exchange:exchange}">{{ to }}</dd>
          </router-link>
      	  <dt @click="change">
            <i class="icon-change"></i> 
          </dt>
      	</li>
      	<li class="train-time">
          <router-link to="/showcalendarinput" class="tab">
      	    <dd>
              <em>{{$store.state.month}}月{{$store.state.day}}日</em>
              <span>{{ $store.state.week }}</span>  
            </dd>
          </router-link>
      	</li>
      </ul>
      <div class="checkbox">
      	<div class="left">
      	  <span>高铁动车</span>
      	  <input type="checkbox" id="checkgt" value="高铁动车" v-model="$store.state.checkedValue">
      	  <label for="checkgt" class="label1"></label>
      	</div>
      	<div class="right">
      	  <span>学生票</span>
      	  <input type="checkbox" id="checkstu" value="学生票" v-model="$store.state.checkedValue">
      	  <label for="checkstu" class="label2"></label>
      	</div>
      </div>
      <div class="clear"></div>
      <div class="train-btnbox">
        <router-link class="btn" @click.native="inquire" to="/showtickets">查询</router-link> 
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
  	return {
  	  exchange: false,
      count: 0,
      from: this.$store.state.startCity,
      to: this.$store.state.reachCity
  	}
  },
  mounted () {
    this.$store.dispatch('saveForm')
  },
  methods: {
  	change (e) {
      this.exchange=!this.exchange 
      this.hj = this.$store.state.startCity 
      this.$store.state.startCity = this.$store.state.reachCity
      this.$store.state.reachCity = this.hj
      this.count += 360 
      document.querySelector('.train-station dt').style.transform = `rotate(${this.count}deg)`
  	},
    ...mapActions ([
      'inquire',
      'startFocus',
      'reachFocus'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/TrainTicket.styl'
// .train
//   background-color #fff
//   padding 0.266667rem 0.533333rem 0.533333rem
//   .train-custom
//   	li
//   	  position relative
//   	  height 1.333333rem
//   	  line-height 1.333333rem
//   	  dd
//   	    height 1.333333rem
//   	    position absolute
//   	    top 0
//   	    border-style solid
//   	    border-width 0
//   	    border-color #d1d1d1
//   	    border-bottom-width 1px 
//     .train-station
//       font-size 18px
//       dt
//         width 14%
//         height 1.173333rem
//         position absolute
//         top 0
//         left 43%
//         transition all .3s ease
//         .icon-change
//           width 0.853333rem
//           height 0.853333rem
//           position absolute
//           left 50%
//           top 50%
//           margin -0.426667rem 0 0 -0.426667rem
//         &:after
//           width 0.586667rem
//           height 0.586667rem
//           position absolute
//           content ""
//           left 50%
//           top 50%
//           margin -0.293333rem 0 0 -0.32rem
//           background-image url(//pic.c-ctrip.com/train/h5/train/train-index-jb.png)
//           background-repeat no-repeat
//           background-size 1.706667rem
//           background-position -0.853333rem 0
//   	  .tab
//         color #000 
//         dd 
//           width 38%
//           transition all .5s ease-out 
//           &.to
//             right 0
//             text-align right 
//             &.exchange
//               text-align left
//               transform translateX(-163%)
//           &.from
//             &.exchange
//               text-align right
//               transform translateX(163%)  
//     .train-time
//   	  font-size 18px
//   	  dd
//   	    width 100%
//   .checkbox
//   	margin-top 0.32rem
//   	font-size 14px
//   	color #7e8c8d
//   	.left
//   	  position relative
//   	  float left
//   	  span
//   	  	vertical-align middle
//   	  input
//   	  	display none
//   	  input[type=checkbox]:checked + label
//   	  	background #099fde
//   	  .label1
//   	    cursor pointer
//   	    display inline-block
//   	    position relative
//   	    width 0.48rem
//   	    height 0.48rem
//   	    top 0
//   	    left 0
//   	    box-sizing border-box
//   	    border 1px solid #ddd
//   	    border-radius 3px
//   	    vertical-align middle
//   	    &:after
//   	      content ' '
//   	      position absolute
//   	      width 0.213333rem
//   	      height 0.133333rem
//   	      background transparent
//   	      top 0.08rem
//   	      left 0.08rem
//   	      border 2px solid #fff
//   	      border-top none
//   	      border-right none
//   	      transform rotate(-45deg)
//   	.right
//   	  position relative
//   	  float right
//   	  span
//   	  	vertical-align middle
//   	  input
//   	    display none
//   	  input[type=checkbox]:checked + label
//   	  	background #099fde
//   	  .label2
//   	    cursor pointer
//   	    display inline-block
//   	    position relative
//   	    width 0.48rem
//   	    height 0.48rem
//   	    top 0
//   	    left 0
//   	    box-sizing border-box
//   	    border 1px solid #ddd
//   	    border-radius 3px
//   	    vertical-align middle
//   	    &:after
//   	      content ' '
//   	      position absolute
//   	      width 0.213333rem
//   	      height 0.133333rem
//   	      background transparent
//   	      top 0.08rem
//   	      left 0.08rem
//   	      border 2px solid #fff
//   	      border-top none
//   	      border-right none
//   	      transform rotate(-45deg)
//   .clear
//   	clear both
//   .train-btnbox
//   	margin-top 0.8rem
//   	.btn
//       font-size 18px
//       color #fff
//       width 100%
//       height 1.066667rem
//       line-height 1.066667rem
//       display block
//       border 0
//       border-radius 3px
//       margin 0 auto
//       text-align center
//       background-color #099fde
//       -webkit-tap-highlight-color blue
//       outline none
</style>
