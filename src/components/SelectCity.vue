<template lang="html">
  <div>
    <div class="city-title">
      <div>
        选择城市
        <router-link to="/home/trainticket">
          <span class="sure" @click="sure">确定</span>
        </router-link>
      </div>
      <div class="input">
        <input type="text" class="start" :class="{focus:$store.state.startFocus}" @click="$store.state.startFocus=true;$store.state.reachFocus=false" v-model="startCity">
        <input type="text" class="reach" :class="{focus:$store.state.reachFocus}" @click="$store.state.startFocus=false;$store.state.reachFocus=true" v-model="reachCity">
      </div>
    </div>
    <div class="city-list">
      <div class="city-category" id="历史城市">
        <h3>历史</h3>
        <ul @click="chooseCity">
          <li v-for="item in $store.state.setHistory">
            <a href="javascript:;">{{item}}</a>
          </li>
        </ul>
      </div>
      <div class="city-category" id="热门城市">
        <h3>热门</h3>
        <ul @click="chooseCity">
          <li>
            <a href="javascript:;">上海</a>
          </li>
          <li>
            <a href="javascript:;">苏州</a>
          </li>
          <li>
            <a href="javascript:;">天津</a>
          </li>
          <li>
            <a href="javascript:;">武汉</a>
          </li>
          <li>
            <a href="javascript:;">广州</a>
          </li>
          <li>
            <a href="javascript:;">长沙</a>
          </li>
        </ul>
      </div>
      <div class="city-category" v-for="list in cityList">
        <h3 :id="list.letter">{{list.letter}}</h3>
        <ul @click="chooseCity">
          <li v-for="item in list.city">
            <a href="javascript:;">{{item}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="city-index left-in">
      <ul>
        <li @click="goAnchor('历史城市')">
          <a>历史</a>
        </li>
        <li @click="goAnchor('热门城市')">
          <a>热门</a>
        </li>
        <li v-for="letter in letterList" @click="goAnchor(letter)"> 
          <a>{{letter}}</a>
        </li>
      </ul>
    </div>
    <div class="showletter" v-if="show">{{showletter}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      startCity: this.$store.state.startCity,
      reachCity: this.$store.state.reachCity,
      startFocus: true,
      reachFocus: false,
      showletter: '',
      show: false,
      letterList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      cityList: [
        {
          "letter":"A",
          "city":["安徽","安庆"]
        },
        {
          "letter":"B",
          "city":["北京"]
        },
        {
          "letter":"C",
          "city":["长沙","长春","重庆"]
        },
        {
          "letter":"D",
          "city":["东莞","大连"]
        },
        {
          "letter":"E",
          "city":[]
        },
        {
          "letter":"F",
          "city":["福建","抚州"]
        },
        {
          "letter":"G",
          "city":["高安","广东","桂林"]
        },
        {
          "letter":"H",
          "city":["海口","合肥"]
        },
        {
          "letter":"I",
          "city":[]
        },
        {
          "letter":"J",
          "city":[]
        },
        {
          "letter":"K",
          "city":[]
        },
        {
          "letter":"L",
          "city":[]
        },
        {
          "letter":"M",
          "city":[]
        },
        {
          "letter":"N",
          "city":[]
        },
        {
          "letter":"O",
          "city":[]
        },
        {
          "letter":"P",
          "city":[]
        },
        {
          "letter":"Q",
          "city":[]
        },
        {
          "letter":"R",
          "city":[]
        },
        {
          "letter":"S",
          "city":[]
        },
        {
          "letter":"T",
          "city":[]
        },
        {
          "letter":"U",
          "city":[]
        },
        {
          "letter":"V",
          "city":[]
        },
        {
          "letter":"W",
          "city":[]
        },
        {
          "letter":"X",
          "city":[]
        },
        {
          "letter":"Y",
          "city":[]
        },
        {
          "letter":"Z",
          "city":[]
        }
      ]
    }
  },
  mounted () {
    this.history()
  },
  methods: {
    chooseCity (e) {
      if(this.$store.state.startFocus){
        this.startCity = e.target.innerHTML;
        this.$store.state.startCity = e.target.innerHTML;
      }
      if(this.$store.state.reachFocus){
        this.reachCity = e.target.innerHTML;
        this.$store.state.reachCity = e.target.innerHTML;
      }
      this.$store.state.startFocus = !this.$store.state.startFocus
      this.$store.state.reachFocus = !this.$store.state.reachFocus
    },
    sure () {
      this.$store.state.startCity = this.startCity;
      this.$store.state.reachCity = this.reachCity;
    },
    history () {
      if(this.$store.state.history.length >= 6) {
        this.$store.state.history.splice(4,2)
      }
      this.$store.state.history.unshift(this.startCity)
      this.$store.state.history.unshift(this.reachCity)
      if(this.$store.state.history.length > 0) {
        this.$store.state.setHistory = Array.from(new Set(this.$store.state.history))
        localStorage.setItem('history', JSON.stringify(this.$store.state.setHistory))
      }
    },
    goAnchor(selector) {
        var anchor = document.querySelector(`#${selector}`).offsetTop
        document.querySelector('.city-list').scrollTop = anchor - 90
        this.showletter = selector
        this.show = true
        setTimeout(() => this.show = false,800)
    }
  }
}
</script>

<style lang="stylus" scoped>
.city-title
  position fixed
  top 0
  width 100%
  height 9rem
  background #fff
  color #000
  font-size 16px
  line-height 4.5rem
  text-align center
  .sure
  	position absolute
  	display block
  	top 0
  	right 1rem
  	width 4rem
  	height 4rem
  	color blue
  	text-align center
  	font-size 16px
  .input
    width 100%
    height 4.5rem
    border-top 1px solid #e9e9e9 
    display flex
    flex-direction row
    align-items center
    justify-content center
    input
      height 3rem
      border 1px solid #bbb
      border-radius .5rem
      padding-left 1rem
    .start
      width 30%
      margin-right 1rem
      &.focus
        width 55%
        color blue
    .reach
      width 30%
      &.focus
        width 55%
        color blue
.city-list
  box-sizing border-box
  padding 9rem 0 0
  width 90%
  height 100%
  overflow-x hidden
  overflow-y scroll
  -webkit-overflow-scrolling touch
  background #fff
  color #777
  font-size 12px
  h3
    margin 0
    padding .9rem 1.2rem
    background #e9e9e9
    font-size 12px
  li
  	a
  	  display block
  	  border-bottom 1px solid #e5e7e7
  	  padding 1.2rem
  	  overflow hidden
  	  color #000
  	  background #fcfcfc
  	  font-size 15px
  #历史城市,#热门城市
  	ul
  	  font-size 0
  	  li
  	  	display inline-block
  	  	width 33.33%
  	  	text-align center
.city-index
  height 87%
  width 10%
  position fixed
  background #EEE9E9
  top 9rem
  right 0
  ul
  	height 100%
  	display flex
  	flex-direction column
  	li
  	  flex 1
  	  text-align center
  	  a
  	    font-size 14px
  	    color #CDC9C9
.showletter
  position fixed
  padding 15px 35px
  border-radius 4px
  top 50%
  left 50%
  transform translate(-50%,-50%)
  color #fff
  background #099fde
  font-size 18px
</style>
