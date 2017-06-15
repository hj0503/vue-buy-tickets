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
          "city":["济南","吉安"]
        },
        {
          "letter":"K",
          "city":["昆明","开封"]
        },
        {
          "letter":"L",
          "city":["拉萨","兰州"]
        },
        {
          "letter":"M",
          "city":["麻城","梅州"]
        },
        {
          "letter":"N",
          "city":["南昌","南京"]
        },
        {
          "letter":"O",
          "city":[]
        },
        {
          "letter":"P",
          "city":["平顶山","萍乡"]
        },
        {
          "letter":"Q",
          "city":["青岛","泉州"]
        },
        {
          "letter":"R",
          "city":["融安","瑞金"]
        },
        {
          "letter":"S",
          "city":["上海","石家庄"]
        },
        {
          "letter":"T",
          "city":["天津","太原"]
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
          "city":["武汉","乌鲁木齐"]
        },
        {
          "letter":"X",
          "city":["西安","西昌"]
        },
        {
          "letter":"Y",
          "city":["延安","永川"]
        },
        {
          "letter":"Z",
          "city":["郑州","张家界","自贡","珠海","镇江","张家口","周口","中卫","遵义","资中","株洲","治安","子长","中和","周家","张兰","中宁","张桥"]
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
@import '../common/stylus/selectCity.styl'
</style>
