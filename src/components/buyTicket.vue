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
      	  <li class="price">￥{{train.price}}</li>
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
@import '../common/stylus/buyTicket.styl'
</style>
