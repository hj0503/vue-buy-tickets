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
@import '../common/stylus/orderDetails.styl'
</style>
