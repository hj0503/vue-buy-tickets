<template lang="html">
  <div>
    <div class="header">
      <div class="cm-header">
        <span class="cm-header-icon" @click="$router.back(-1)">
          <i class="icon-back"></i>
        </span>
        <h1 class="cm-page-title">添加乘客</h1>
      </div>
    </div>
    <div class="weui_cells weui_cells_access">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>姓名:</p>
        </div>
        <div class="weui_cell_ft">
          <input type="text" placeholder="请输入姓名" v-model="name">
        </div>
      </div>
      <div class="weui_cell no_access" @click="showGender = true">
        <div class="weui_cell_bd weui_cell_primary">
          <p>性别:</p>
        </div>
        <div class="weui_cell_ft after">
          {{chooseGender}}
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>身份证号:</p>
        </div>
        <div class="weui_cell_ft">
          <input type="text" placeholder="请输入身份证号" v-model="card">
        </div>
      </div>
      <div class="weui_cell" @click="showType = true">
        <div class="weui_cell_bd weui_cell_primary">
          <p>旅客类型:</p>
        </div>
        <div class="weui_cell_ft after">
          {{chooseType}}
        </div>
      </div>
    </div>
    <div class="weui_cells weui_cells_access" v-if="chooseType == '学生'">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>学 校:</p>
        </div>
        <div class="weui_cell_ft">
          <input type="text" v-model="school">
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>学 号:</p>
        </div>
        <div class="weui_cell_ft">
          <input type="text" v-model="number">
        </div>
      </div>
      <div class="weui_cell no_access" @click="showYearSystem = true">
        <div class="weui_cell_bd weui_cell_primary">
          <p>学制:</p>
        </div>
        <div class="weui_cell_ft after">
          {{chooseYearSystem}}
        </div>
      </div>
      <div class="weui_cell" @click="showStartYear = true">
        <div class="weui_cell_bd weui_cell_primary">
          <p>入学年份:</p>
        </div>
        <div class="weui_cell_ft after">
          {{chooseStartYear}}
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>优惠区间:</p>
        </div>
        <div class="weui_cell_ft">
          <input type="text" v-model="from">
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <p>优惠区间:</p>
        </div>
        <div class="weui_cell_ft">
          <input type="text" v-model="to">
        </div>
      </div>
    </div>
    <transition name="pop-up">
      <div class="pop-up-box" v-if="showStartYear">
        <div class="choose">
          <p class="description">
            选择学制
          </p>
          <div class="gender">
            <p>
              <input type="radio" id="threen" value="2016年入学" v-model="chooseStartYear">
              <label for="threen" :class="{selected:chooseStartYear == '2016年入学'}"  @click="showStartYear = false;showMask = false">2016年入学</label>
            </p>
            <p>
              <input type="radio" id="four" value="2015年入学" v-model="chooseStartYear">
              <label for="four" :class="{selected:chooseStartYear == '2015年入学'}"  @click="showStartYear = false;showMask = false">2015年入学</label>
            </p>
             <p>
              <input type="radio" id="five" value="2014年入学" v-model="chooseStartYear">
              <label for="five" :class="{selected:chooseStartYear == '2014年入学'}"  @click="showStartYear = false;showMask = false">2014年入学</label>
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="pop-up">
      <div class="pop-up-box" v-if="showYearSystem">
        <div class="choose">
          <p class="description">
            选择学制
          </p>
          <div class="gender">
            <p>
              <input type="radio" id="threen" value="3年制" v-model="chooseYearSystem">
              <label for="threen" :class="{selected:chooseYearSystem == '3年制'}"  @click="showYearSystem = false;showMask = false">3年制</label>
            </p>
            <p>
              <input type="radio" id="four" value="4年制" v-model="chooseYearSystem">
              <label for="four" :class="{selected:chooseYearSystem == '4年制'}"  @click="showYearSystem = false;showMask = false">4年制</label>
            </p>
             <p>
              <input type="radio" id="five" value="5年制" v-model="chooseYearSystem">
              <label for="five" :class="{selected:chooseYearSystem == '5年制'}"  @click="showYearSystem = false;showMask = false">5年制</label>
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="pop-up">
      <div class="pop-up-box" v-if="showGender">
        <div class="choose">
          <p class="description">
            选择性别
          </p>
          <div class="gender">
            <p>
              <input type="radio" id="man" value="男" v-model="chooseGender">
              <label for="man" :class="{selected:chooseGender == '男'}"  @click="showGender = false;showMask = false">男</label>
            </p>
            <p>
              <input type="radio" id="woman" value="女" v-model="chooseGender">
              <label for="woman" :class="{selected:chooseGender == '女'}"  @click="showGender = false;showMask = false">女</label>
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="pop-up">
      <div class="pop-up-box" v-if="showType">
        <div class="choose">
          <p class="description">
            选择旅客类型
          </p>
          <div class="gender">
            <p>
              <input type="radio" id="adult" ref="adultNc" value="成人" v-model="chooseType">
              <label for="adult" :class="{selected:chooseType == '成人'}"  @click="showType = false;showMask = false">成人</label>
            </p>
            <p>
              <input type="radio" id="student" value="学生" v-model="chooseType">
              <label for="student" :class="{selected:chooseType == '学生'}"  @click="showType = false;showMask = false">学生</label>
            </p>
            <p>
              <input type="radio" id="child" value="儿童" v-model="chooseType">
              <label for="child" :class="{selected:chooseType == '儿童'}"  @click="showType = false;showMask = false">儿童</label>
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="mask" v-if="showGender || showType || showYearSystem || showStartYear"  @click="showGender = false,showType = false,showYearSystem = false,showStartYear = false"></div>
    </transition>
    <div class="botton" @click="sure">确定</div>
    <div class="remind" v-show="inputRemind"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      card: '',
      school: '',
      number: '',
      from: '',
      to: '',
      inputRemind: false,
      showGender: false,
      showType: false,
      showYearSystem: false,
      showStartYear: false,
      showMask: false,
      chooseGender: '男',
      chooseType: '成人',
      chooseYearSystem: '4年制',
      chooseStartYear: '2015年入学'
    }
  },
  methods: {
    sure () {
      if(this.name == '') {
        this.inputRemind = true
        setTimeout(() => this.inputRemind = false,1000)
        document.querySelector('.remind').innerHTML = '名字不能为空' 
      } 
      else if(this.card == '') {
        this.inputRemind = true
        setTimeout(() => this.inputRemind = false,1000)
        document.querySelector('.remind').innerHTML = '身份证号不能为空'
      } 
      else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.card)) {
        this.inputRemind = true
        setTimeout(() => this.inputRemind = false,1000)
        document.querySelector('.remind').innerHTML = '身份证号格式不正确'
      }
      else if(this.chooseType == '学生'){
        if (this.school == '') {
          this.inputRemind = true
          setTimeout(() => this.inputRemind = false,1000)
          document.querySelector('.remind').innerHTML = '学校名不能为空'
        }
        else if (this.number == '') {
          this.inputRemind = true
          setTimeout(() => this.inputRemind = false,1000)
          document.querySelector('.remind').innerHTML = '学号不能为空'
        }
        else if (this.from == '' || this.to == '') {
          this.inputRemind = true
          setTimeout(() => this.inputRemind = false,1000)
          document.querySelector('.remind').innerHTML = '区间不能为空'
        }
        else {
          this.$store.state.passenger = {}
          this.$store.state.passenger.name = this.name
          this.$store.state.passenger.gender = this.chooseGender
          this.$store.state.passenger.card = this.card
          this.$store.state.passenger.type = this.chooseType
          this.$store.state.passengerList.push(this.$store.state.passenger)
          this.$router.back(-1)
        } 
      }
      else {
        this.$store.state.passenger = {}
        this.$store.state.passenger.name = this.name
        this.$store.state.passenger.gender = this.chooseGender
        this.$store.state.passenger.card = this.card
        this.$store.state.passenger.type = this.chooseType
        this.$store.state.passengerList.push(this.$store.state.passenger)
        this.$router.back(-1)
      } 
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../common/stylus/passenger.styl'
</style>
