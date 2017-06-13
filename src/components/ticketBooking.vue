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
    show (item) {
      // if(this.count == 0) {
      //   this.count ++
      //   this.showDelete = index
      // }
      // else {
      //   this.showDelete = ''
      //   this.count --
      // }
      // item.change = !item.change
      this.$set(item,'change',!item.change)
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
        padding-left 0.133333rem
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
          height 50%
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
            font-size 0.266667rem
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
        .train-name
          display block
          text-align center
  .seat
    overflow hidden
    height 1.066667rem
    padding 0 0.533333rem
    background #5cacee
    color #fff
    font-size 14px
    .type
      height 100%
      line-height 1.066667rem
      float left
    .price
      height 100%
      line-height 1.066667rem
      float right
.content
  height 1.066667rem
  width 100%
  background #fff
  margin-top 0.266667rem
  text-align center
  line-height 1.066667rem
  cursor pointer
  .text
    font-size 14px
    color #099fde
    vertical-align middle
  .icon
    display inline-block
    width 0.4rem
    height 0.4rem
    border 1px solid #099fde
    vertical-align middle
    border-radius 50%
    margin-left 0.133333rem
    position relative
    &:after
      content ''
      position absolute
      top 50%
      right 0.08rem
      left 0.08rem
      height 1px
      background #099fde
    &:before
      content ''
      position absolute
      left 50%
      top 0.08rem
      bottom 0.08rem
      width 1px
      background #099fde
      transform scaleX(.5)
.bottom
  position fixed
  bottom 0
  right 0
  left 0
  height 1.333333rem
  background #099fde
  color #fff
  text-align center
  line-height 1.333333rem
  font-size 16px
.passenger-list
  margin-top 0.266667rem
  ul
    li
      background #fff
      position relative
      overflow hidden
      height 1.6rem
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
        width 1.6rem
        height 100%
        z-index 1
        cursor pointer
        i
          position relative
          top 50%
          left 50%
          margin-left -0.266667rem
          margin-top -0.266667rem
          display inline-block
          width 0.533333rem
          height 0.533333rem
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
            right 0.08rem
            left 0.08rem
            height 1px
            background #099fde
            transform scaleY(.5)
      .list
        width 100%
        height 100%
        transform translateX(2.666667rem)
        transition all .5s ease-in-out
        box-sizing border-box
        &.show
          transform translateX(0)
      .left
        float left
        padding 10px 0
        transform translateX(-0.8rem)
        .passenger
          margin-bottom 0.266667rem
          .name
            margin-right 0.266667rem
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
        width 2.666667rem
        height 100%
        text-align center
        line-height 1.6rem
        font-size 16px
        color #fff
        background-color #FF7F24
        cursor pointer
.remind
  position fixed
  top 50%
  left 50%
  transform translate(-50%,-50%)
  width 4.0rem
  height 0.8rem
  line-height 0.8rem
  text-align center
  margin 0 auto
  border-radius 3px
  margin-top 0.8rem
  font-size 12px
  color #fff
  background-color #424242
</style>
