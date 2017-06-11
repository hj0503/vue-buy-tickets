<template lang="html">
  <div>
    <div class="header">
      <div class="cm-header">
      	<h1 class="cm-page-title">火车票订单</h1>
      </div>
    </div>
    <div class="view">
      <ul class="order-list">
      	<li v-for="(order,index) in $store.state.getOrderList" @click="displayTicket(index)">
      	  <div class="order-left">
      	  	<p class="bold">
      	  	  <strong class="city">{{order.start_station}}</strong>
      	  	  <strong class="train">{{order.end_station}}</strong>
      	  	</p>
      	  	<p class="time">{{order.date}} {{order.leave_time}}</p>
      	  	<span class="name" v-for="passengerName in $store.state.passengerList">{{passengerName.name}}</span>
      	  </div>
      	  <div class="order-right">
      	  	<p class="status">已出票</p>
      	  	<p class="price">{{order.price*length | formatMoney}}</p>
      	  </div>
      	</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      length: 0
    }
  },
  filters:{
    formatMoney:function(value){
      return "￥"+value;
    }
  },
  mounted () {
    this.information()
  },
  methods: {
    information () {
      this.$store.state.getOrderList = JSON.parse(localStorage.getItem('trainticket'))
      console.log(this.$store.state.getOrderList.length)
      console.log(this.$store.state.getOrderList[0].date)
      this.length = this.$store.state.passengerList.length
    },
    displayTicket (id) {
      this.$router.push(
        {name: 'orderdetails', params: { 'id': id }}
      )
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
  	height 4.4rem
  	line-height 4.4rem
  	text-align center
  	background-color #099fde
  	color #fff
  	z-index 100
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
  position absolute
  width 100%
  bottom 0
  top 4.4rem
  .order-list
    position absolute
    top 0
    bottom 50px
    width 100%
    overflow auto
  	li
  	  margin-bottom 1rem
  	  padding 1.5rem 
  	  background #fff
  	  overflow hidden
  	  color #8b7d6b
  	  .order-left
  	  	float left
  	  	p
  	  	  padding-bottom 1rem
  	  	  font-size 1.2rem
  	  	  &.bold
  	  	  	color #000
  	  	  	font-size 1.4rem
  	  	  	strong
  	  	  	  font-weight bold
      .name 
        margin-right 5px   
  	  .order-right
  	  	float right
  	  	p
          text-align right
          padding-bottom 1rem
          font-size 1.2rem
</style>
