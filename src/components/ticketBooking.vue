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
          <span class="price">{{$store.state.ticketBooking[0].price_list[$route.params.id].price}}</span>
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
          <div class="icon" @click="show(index)">
            <i :class="{rotate:showDelete === index}"></i>
          </div>
          <div class="list" :class="{show:showDelete === index}">
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
      count: 0,
    }
  },
  methods: {
    buy () {
      if(this.$store.state.passengerList.length > 0) {
        this.$store.state.orderObject = this.$store.state.ticketBooking[0]
        this.$store.state.orderObject.number = this.$store.state.ticketBooking[0].price_list[this.$route.params.id].number
        this.$store.state.orderObject.price = this.$store.state.ticketBooking[0].price_list[this.$route.params.id].price
        this.$store.state.orderObject.type = this.$store.state.ticketBooking[0].price_list[this.$route.params.id].price_type
        for(let i = 0; i<this.$store.state.passengerList.length; i++) {
          this.$store.state.orderObject['name'+i] = this.$store.state.passengerList[i].name
          this.$store.state.orderObject['card'+i] = this.$store.state.passengerList[i].card
          this.$store.state.orderObject['ticketType'+i] = this.$store.state.passengerList[i].type
        }
        this.$store.state.orderObject._id = this.count
        this.$store.state.setOrderList.push(this.$store.state.orderObject)
        localStorage.setItem('trainticket',JSON.stringify(this.$store.state.setOrderList))
        this.$router.push('/order')
      }else{
        this.remind = true
        setTimeout(() => this.remind = false,1000)
      }
    },
    deletePassenger (index) {
      this.$store.state.passengerList.splice(index,1)
    },
    show (index) {
      if(this.count == 0) {
        this.count ++
        this.showDelete = index
      }
      else {
        this.showDelete = ''
        this.count --
      }
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
  .train-book-modify
    background #099fde
    overflow hidden
    li
      padding .6rem 0 1.8rem
      w30p  
      text-align center
      color #fff
      font-size 1.4rem
      position relative
      strong
        display block
        font-size 2.5rem
        line-height 2em
        font-weight bold
      &.from
        text-align left
        padding-left 1.5rem
        float left
      &.to
        text-align right
        padding-right 1.5rem
        padding-left .5rem
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
  .seat
    overflow hidden
    height 40px
    padding 0 20px
    background #5cacee
    color #fff
    font-size 14px
    .type
      height 100%
      line-height 40px
      float left
    .price
      height 100%
      line-height 40px
      float right
.content
  height 40px
  width 100%
  background #fff
  margin-top 10px
  text-align center
  line-height 40px
  cursor pointer
  .text
    font-size 14px
    color #099fde
    vertical-align middle
  .icon
    display inline-block
    width 15px
    height 15px
    border 1px solid #099fde
    vertical-align middle
    border-radius 50%
    margin-left 5px
    position relative
    &:after
      content ''
      position absolute
      top 50%
      right 3px
      left 3px
      height 1px
      background #099fde
    &:before
      content ''
      position absolute
      left 50%
      top 3px
      bottom 3px
      width 1px
      background #099fde
      transform scaleX(.5)
.bottom
  position fixed
  bottom 0
  right 0
  left 0
  height 50px
  background #099fde
  color #fff
  text-align center
  line-height 50px
  font-size 16px
.passenger-list
  margin-top 10px
  ul
    li
      background #fff
      position relative
      overflow hidden
      height 60px
      box-sizing border-box
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
      .icon
        position absolute
        background-color #fff
        top 0
        left 0
        width 60px
        height 100%
        z-index 1
        cursor pointer
        i
          position relative
          top 50%
          left 50%
          margin-left -10px
          margin-top -10px
          display inline-block
          width 20px
          height 20px
          border 1px solid #099fde
          border-radius 50%
          transition all .5s ease-in-out
          &.rotate
            transform rotate(90deg)
            transform-origin center center
          &:after
            content ''
            position absolute
            top 50%
            right 3px
            left 3px
            height 1px
            background #099fde
            transform scaleY(.5)
      .list
        width 100%
        height 100%
        transform translateX(100px)
        transition all .5s ease-in-out
        &.show
          transform translateX(0)
      .left
        float left
        padding 10px 0
        transform translateX(-30px)
        .passenger
          margin-bottom 10px
          .name
            margin-right 10px
            font-size 16px
          .type
            color #ccc
            font-size 12px
        .card
          font-size 12px
          color #ccc
      .delete
        float right
        box-sizing border-box
        width 100px
        height 100%
        text-align center
        line-height 60px
        font-size 16px
        color #fff
        background-color #FF7F24
        cursor pointer
.remind
  position fixed
  top 50%
  left 50%
  transform translate(-50%,-50%)
  width 150px
  height 30px
  line-height 30px
  text-align center
  margin 0 auto
  border-radius 3px
  margin-top 30px
  font-size 12px
  color #fff
  background-color #424242
</style>
