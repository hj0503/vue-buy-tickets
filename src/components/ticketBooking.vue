<template lang="html">
  <div>
    <div class="header">
      <div class="cm-header">
        <span class="cm-header-icon" @click="$router.back(-1)">
          <i class="icon-back"></i>
        </span>
        <h1 class="cm-page-title">车票预订</h1>
      </div>
    </div>
    <div class="view">
      <div>
        <ul class="train-book-modify">
          <li class="from">
            <strong>{{$store.state.ticketBooking[0].start_station}}</strong>
            <span>{{$store.state.ticketBooking[0].leave_time}}</span>
          </li>
          <li class="to">
            <strong>{{$store.state.ticketBooking[0].end_station}}</strong>
            <span>{{$store.state.ticketBooking[0].arrived_time}}</span>
          </li>
          <li class="mid">
            <span class="jt-info"></span>
            <span class="train-name">{{$store.state.ticketBooking[0].trainOpp}}</span>
          </li>
        </ul>
        <div class="seat">
          <span class="type">{{$store.state.ticketBooking[0].price_list[$route.params.id].price_type}}</span>
          <span class="price">￥{{$store.state.ticketBooking[0].price_list[$route.params.id].price}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="add" @click="$router.push('/passenger')">
        <span class="text" >新增乘客</span>
        <i class="icon"></i>
      </div>
    </div>
    <div class="passenger-list">
      <ul>
        <li v-for="(passenger,index) in $store.state.passengerList">
          <div class="icon" @click="show(passenger)">
            <i :class="{rotate:passenger.change}"></i>
          </div>
          <div class="list" :class="{show:passenger.change}">
            <div class="left">
              <p class="passenger">
                <span class="name">{{passenger.name}}</span>
                <span class="type">{{passenger.type}}</span>
              </p>
              <p class="card">{{passenger.card}}</p>
            </div>
            <div class="delete" @click="deletePassenger(index)">删除</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom" @click="buy">立即预订</div>
    <div class="remind" v-if="remind">请添加乘车人</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      remind: false,
      showDelete: '',
      count: 0
    }
  },
  methods: {
    buy () {
      if(this.$store.state.passengerList.length > 0) {
        this.$store.state.orderObject = this.$store.state.ticketBooking[0]
        this.$store.state.orderObject.number = this.$store.state.ticketBooking[0].price_list[this.$route.params.id].number
        this.$store.state.orderObject.price = this.$store.state.ticketBooking[0].price_list[this.$route.params.id].price
        this.$store.state.orderObject.type = this.$store.state.ticketBooking[0].price_list[this.$route.params.id].price_type
        this.$store.state.orderObject.passengerList = this.$store.state.passengerList
        this.$store.state.orderObject._id = this.count
        this.$store.state.setOrderList.push(this.$store.state.orderObject)
        this.$store.state.passengerList = []
        this.$router.push('/order')
      }else{
        this.remind = true
        setTimeout(() => this.remind = false,1000)
      }
    },
    deletePassenger (index) {
      this.$store.state.passengerList.splice(index,1)
    },
    show (item) {
      this.$set(item,'change',!item.change)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../common/stylus/ticketBooking.styl'
</style>
