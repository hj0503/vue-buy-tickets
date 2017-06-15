<template lang="html">
  <div>
    <div class="header">
      <div class="cm-header">
      	<h1 class="cm-page-title">火车票订单</h1>
      </div>
    </div>
    <div class="view">
      <ul class="order-list">
      	<li v-for="(order,index) in $store.state.setOrderList" @click="displayTicket(index)">
      	  <div class="order-left">
      	  	<p class="bold">
      	  	  <strong class="city">{{order.start_station}}</strong>
      	  	  <strong class="train">{{order.end_station}}</strong>
      	  	</p>
      	  	<p class="time">{{order.date}} {{order.leave_time}}</p>
      	  	<span class="name" v-for="passengerName in order.passengerList">{{passengerName.name}}</span>
      	  </div>
      	  <div class="order-right">
      	  	<p class="status">已出票</p>
      	  	<p class="price">{{order.price*order.passengerList.length | formatMoney}}</p>
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
      length: 0,
      passengerList: []
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
      // this.$store.state.getOrderList = JSON.parse(localStorage.getItem('trainticket'))
      // this.passengerList = JSON.parse(localStorage.getItem('passengerList'))
      // this.length = JSON.parse(localStorage.getItem('passengerList')).length
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
@import '../common/stylus/order.styl'
</style>
