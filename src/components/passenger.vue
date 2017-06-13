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
      else if(this.chooseType == '学生'){
        if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.card)) {
          this.inputRemind = true
          setTimeout(() => this.inputRemind = false,1000)
          document.querySelector('.remind').innerHTML = '身份证号格式不正确'
        }
        else if (this.school == '') {
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
      }
      else {
        this.$store.state.passenger.name = this.name
        this.$store.state.passenger.gender = this.chooseGender
        this.$store.state.passenger.card = this.card
        this.$store.state.passenger.type = this.chooseType
        this.$store.state.passengerList.push(this.$store.state.passenger)
        this.$store.state.passenger = {}
        this.$store.state.index++
        this.$router.back(-1)
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
.weui_cells
  margin-top 1.17647059em
  background-color #fff
  line-height 1.41176471em
  font-size 17px
  overflow hidden
  position relative
  .weui_cell
    padding 0.266667rem 0.4rem
    position relative
    display flex
    align-items center
    -webkit-tap-highlight-color rgba(0,0,0,0.2)
    &:after
      content ''
      position absolute
      bottom 0
      right 0
      left 0
      height 1px
      background-color #d9d9d9
      transform scaleY(.5)
      transform-origin 0 0
    .weui_cell_primary
      flex 1
    .weui_cell_ft
      text-align right
      &.after
        &:after
          content ''
          display inline-block
          width 0.213333rem
          height 0.213333rem
          border-width 1px 1px 0 0
          border-color #a9a9a9
          border-style solid
          transform rotate(45deg)
          margin-left 0.053333rem
      input
        text-align right
      input::-webkit-input-placeholder
        color #ccc
        text-align right
.botton
  width 98%
  height 1.066667rem
  text-align center
  line-height 1.066667rem
  background-color #099fde
  color #fff
  font-size 16px
  margin 0 auto
  border-radius 4px
  margin-top 0.266667rem
.remind
  width 4.0rem
  height 0.8rem
  line-height 0.8rem
  text-align center
  margin 0 auto
  border-radius 5px
  margin-top 0.8rem
  font-size 12px
  color #fff
  background-color #424242
.mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0,0,0,.5)
  z-index 990
.pop-up-box
  position fixed
  width 90%
  top 50%
  left 50%
  transform translate(-50%,-50%)
  border-radius 5px
  background #fff
  z-index 3001
  .choose
    .description
      font-size 14px
      text-align center
      padding 0.426667rem 0
    .gender
      p
        margin-bottom 0.08rem
        input
          display none
        label
          display inline-block
          width 100%
          padding 0.426667rem 0
          font-size 14px 
          text-align center
          &.selected
            background-color #e5e5e5
.pop-up-enter-active,.pop-up-leave-active
  transition all .5s
  opacity 1
.pop-up-enter,.pop-up-leave-active
  opacity 0
.mask-enter-active,.mask-leave-active
  transition all .5s
  opacity 1
.mask-enter,.mask-leave-active
  opacity 0
</style>
