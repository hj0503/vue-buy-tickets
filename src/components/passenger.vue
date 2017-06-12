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
      <div class="mask" v-if="showGender || showType"></div>
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
      inputRemind: false,
      showGender: false,
      showType: false,
      showMask: false,
      chooseGender: '男',
      chooseType: '成人'
    }
  },
  methods: {
    sure () {
      if(this.name == '') {
        this.inputRemind = true
        setTimeout(() => this.inputRemind = false,1000)
        document.querySelector('.remind').innerHTML = '名字不能为空' 
        this.$refs.adultNc.value = 'hj'
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
.weui_cells
  margin-top 1.17647059em
  background-color #fff
  line-height 1.41176471em
  font-size 17px
  overflow hidden
  position relative
  .weui_cell
    padding 10px 15px
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
          width 8px
          height 8px
          border-width 1px 1px 0 0
          border-color #a9a9a9
          border-style solid
          transform rotate(45deg)
          margin-left 2px
      input
        text-align right
      input::-webkit-input-placeholder
        color #ccc
        text-align right
.botton
  width 98%
  height 40px
  text-align center
  line-height 40px
  background-color #099fde
  color #fff
  font-size 16px
  margin 0 auto
  border-radius 4px
  margin-top 10px
.remind
  width 150px
  height 30px
  line-height 30px
  text-align center
  margin 0 auto
  border-radius 5px
  margin-top 30px
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
      padding 16px 0
    .gender
      p
        margin-bottom 3px
        input
          display none
        label
          display inline-block
          width 100%
          padding 16px 0
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
