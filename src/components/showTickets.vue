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
@import '../common/stylus/showTickets.styl'
</style>
