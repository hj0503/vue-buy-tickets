<template>
  <div>
    <div class="header">
      <div class="cm-header">
        <span class="cm-header-icon" @click="$router.back(-1)">
          <i class="icon-back"></i>
        </span>
        <h1 class="cm-page-title">选择日期</h1>
      </div>
    </div>
    <div class="calendar-input-container" :style="containerStyle">
      <transition name="fade">
        <div id="calendar" v-show="changeShowCalendar">
          <div class="week">
            <span v-for="(item, index) in week" :class="{weekend: index === 0 || index === 6}">
              {{item}}
            </span>
          </div>
          <div id="calendar-header">
            <span class="arrow" @click="subMonth">&lt;</span>
            <span id="date-box">
              {{trueSelectYear}}年{{trueSelectMonth}}月
            </span>
            <span class="arrow" @click="addMonth">&gt;</span>
          </div>
          <div class="days">
            <span v-for="(item, index) in renderData" 
            :class="{ 
              weekend: index % 7 === 0 || index % 7 === 6, 
              unselect: unselectArr.includes(index),
              select: index ===  firstDayInWeek + $store.state.day - 1
            }"
            @click="changeSelectDay(index)">
              {{item}}
            </span>
          </div>
        </div>
      </transition>
    </div>
  </div>      
</template>

<script>
export default {
  name: 'calendar-input',
  props: {
    limit: {  //日期可选范围
      type: Object,
      default() {
        return {
          minYear: 1900,
          minMonth: 1,
          minDay: 1,
          maxYear: 2030,
          maxMonth: 3,
          maxDay: 20
        }
      }
    },
    showCalendar: {  //是否显示日历
      type: Boolean,
      default: true
    },
    containerStyle: { //组件容器样式
      type: Object
    }
  },
  data () {
    return {
      isfocus: true,
      changeShowCalendar: this.showCalendar,
      week: ["日", "一", "二", "三", "四", "五", "六"],
      date: new Date(),
      day: new Date().getDate(),
      selectYear: this.$store.state.year,
      selectMonth: this.$store.state.month,
      selectDay: this.$store.state.year
    }
  },
  methods: {
    back () {
      this.$router.push('/home/trainticket')
    },
    focus() {
      this.isfocus = !this.isfocus;
      this.changeShowCalendar = !this.changeShowCalendar;
    },
    subMonth() {
      if (this.selectMonth === 1) {
        this.selectMonth = 12;
        this.selectYear -= 1;
      } else {
        this.selectMonth -= 1
      }
      if (this.selectYear < this.limit.minYear) this.selectYear = this.limit.minYear;
      if (this.selectYear === this.limit.minYear) {
        if (this.selectMonth <= this.limit.minMonth) {
          this.selectMonth = this.limit.minMonth;
        }
      }
    },
    addMonth() {
      if (this.selectMonth === 12) {
        this.selectMonth = 1;
        this.selectYear += 1;
      } else {
        this.selectMonth += 1
      }
      if (this.selectYear > this.limit.maxYear) this.selectYear = this.limit.maxYear;
      if (this.selectYear === this.limit.maxYear) {
        if (this.selectMonth >= this.limit.maxMonth) {
          this.selectMonth = this.limit.maxMonth;
        }
      }
    },
    changeSelectDay(index) {
      if (this.unselectArr.includes(index)) return false;
      this.selectDay = index - this.firstDayInWeek + 1;
      if(index>6){
        index = index % 7
      }
      this.$store.state.choosedate = `${this.trueSelectMonth}月${this.trueSelectDay}日`;
      this.$store.state.month = this.trueSelectMonth;
      this.$store.state.day = this.trueSelectDay;
      if(this.selectDay === this.date.getDate()) {
        this.$store.state.week = '今天'
      }else {
        this.$store.state.week = `星期${this.week[index]}`;
      }
      this.$store.state.day = this.trueSelectDay;
      this.$store.dispatch('inquire');
      this.$router.back(-1);
    }
  },
  computed: {
    trueSelectYear: function () {
      if (this.selectYear < this.limit.minYear) return this.limit.minYear;
      if (this.selectYear > this.limit.maxYear) return this.limit.maxYear;
      return this.selectYear;
    },
    trueSelectMonth: function () {
      if (this.selectYear === this.limit.minYear && this.selectMonth < this.limit.minMonth) return this.limit.minMonth;
      if (this.selectYear === this.limit.maxYear && this.selectMonth > this.limit.maxMonth) return this.limit.maxMonth;
      return this.selectMonth;
    },
    trueSelectDay: function () {
      if (this.selectYear === this.limit.minYear && this.selectMonth === this.limit.minMonth && this.selectDay < this.limit.minDay) return this.limit.minDay;
      if (this.selectYear === this.limit.maxYear && this.selectMonth === this.limit.maxMonth && this.selectDay > this.limit.maxDay) return this.limit.maxDay;
      if (this.selectDay > this.dayCount) return this.dayCount;
      return this.selectDay;
    },
    selectValue: function () {
      return `${this.trueSelectYear}-${this.trueSelectMonth}-${this.trueSelectDay}`;
    },
    firstDayInWeek: function () {
      return new Date(this.trueSelectYear, this.trueSelectMonth - 1, 1).getDay();
    },
    dayCount: function () {
      return new Date(this.trueSelectYear, this.trueSelectMonth, 0).getDate();
    },
    lastMonthDay: function () {
      let lastNum  = this.firstDayInWeek;
      let lastDays = [];
      if (lastNum === 0) return lastDays;
      let i = 0;
      let lastDayNum = new Date(this.trueSelectYear, this.trueSelectMonth - 1, 0).getDate();
      for (; i < lastNum; i++) {
        lastDays.unshift(lastDayNum);
        lastDayNum--;
      }
      return lastDays;
    },
    nextMonthDay: function () {
      let num      = 42 - this.firstDayInWeek - this.dayCount;
      let nextDays = [];
      if (num === 0) return nextDays;
      let i   = 1;
      for (; i <= num; i++) {
        nextDays.push(i);
      }
      return nextDays;
    },
    renderData: function () {
      let nowDays = [];
      let i = 1;
      for (; i <= this.dayCount; i++) {
        nowDays.push(i);
      }
      return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay];
    },
    unselectArr: function () {
      let index = 0;
      let arr   = [];
      if (this.trueSelectYear === this.limit.minYear && this.trueSelectMonth === this.limit.minMonth) {        
        for (; index < this.firstDayInWeek + this.limit.minDay - 1; index++) {
          arr.push(index);
        }
      } else {
        for (; index < this.firstDayInWeek; index++) {
          arr.push(index)
        }
      }
      if (this.trueSelectYear === this.limit.maxYear && this.trueSelectMonth === this.limit.maxMonth) {
        index = this.firstDayInWeek + this.limit.maxDay;
        for (; index < 42; index++) {
          arr.push(index);
        }
      } else {
        index = this.firstDayInWeek + this.dayCount;
        for (; index < 42; index++) {
          arr.push(index);
        }
      }
      if(this.trueSelectMonth == new Date().getMonth() + 1) {
        for(var h = 0; h < new Date().getDate()+this.firstDayInWeek-1 ; h++) {
          arr.push(h)
        }
      }
      return arr;
    }
  },
  watch: {
    selectValue: function (newVal) {
      this.$emit('getValue', newVal);
    }
  },
  mounted() {
    this.$emit('getValue', this.selectValue);
  } 
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/calendar.styl'
.header
  .cm-header
    position fixed
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
</style>