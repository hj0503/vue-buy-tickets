import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  choosedate: new Date().getMonth() + 1+'月'+new Date().getDate()+'日',
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  weekList: ["日", "一", "二", "三", "四", "五", "六"],
  week: "星期" + "日一二三四五六".charAt(new Date().getDay()),
  day: new Date().getDate(),
  h: new Date().getDay(),
  startCity: '萍乡',
  reachCity: '南昌',
  startFocus: false,
  reachFocus: false,
  checkedValue: [],
  checked: '',
  noTrain: true,
  history: [],
  setHistory: [],
  TrainTickets: [],
  TrainTicketsList: [],
  orderObject: {},
  setOrderList: [],
  getOrderList: [],
  tiketBooking: [],
  passengerList: [],
  passenger: {},
  index: 0
}
const mutations = {
  // 查询
  inquire (state) {
    state.checked = ''
  	for(var i = 0; i<state.TrainTickets.length; i++){
  	  state.TrainTickets[i].oldIndex = i
  	}
    for(var i = 0; i< state.checkedValue.length; i++){
        state.checked += state.checkedValue[i]
    }
  	state.TrainTicketsList = state.TrainTickets.filter(function(tickets){
  	  if(state.checkedValue.length > 0){
  	  	for(let i = 0; i< state.checkedValue.length; i++) {
  	  	  return tickets.start_station.indexOf(state.startCity) > -1 && tickets.end_station.indexOf(state.reachCity) > -1 && tickets.date.indexOf(state.choosedate) > -1 && state.checked.indexOf(tickets.train_typename) > -1
  	  	}
  	  } else {
  	  	return tickets.start_station.indexOf(state.startCity) > -1 && tickets.end_station.indexOf(state.reachCity) > -1 && tickets.date.indexOf(state.choosedate) > -1
  	  }
  	}).sort((a,b) => { return a.leave_time > b.leave_time ? 1 : -1 })
  },
  // 获取数据
  saveForm (state) {
  	return new Promise((resolve, reject) => {
  	  axios.get('https://www.easy-mock.com/mock/5902e9be7a878d73716dfc00/members/TrainTicketsList')
      .then(function(res){
        state.TrainTickets = res.data.TrainTicketsList
        state.TrainTicketsList = state.TrainTickets
        state.checkedValue = []
      })
      .catch((error) => {
      	reject(error)
      })
  	})
  },
  startFocus (state) {
  	state.startFocus = true
  	state.reachFocus = false
  },
  reachFocus (state) {
  	state.startFocus = false
  	state.reachFocus = true
  },
  prev (state) {
  	state.day --
  	if(state.day <= new Date().getDate() && state.month === new Date().getMonth() + 1){
  	  state.day = new Date().getDate()
  	  state.h = new Date().getDay()
  	}
    if(state.day < 1) {
      state.month -=1
      state.day = new Date(new Date().getFullYear(),state.month + 1,0).getDate()
    }
  	state.week = "星期" + "日一二三四五六".charAt((state.h+state.day+new Date().getDate())%7)
  	state.choosedate = state.month + '月' + state.day + '日'
  },
  next (state) {
    if(state.day>=new Date(new Date().getFullYear(),new Date().getMonth() + 1,0).getDate()) {
      state.month +=1
      state.day = 0
    }
    state.day ++
  	state.week = "星期" + "日一二三四五六".charAt((state.h+state.day-new Date().getDate())%7)
  	state.choosedate = state.month + '月' + state.day + '日'
  }
}
const getters = {}
const actions = {
  inquire: ({ commit }) => commit('inquire'),
  saveForm: ({ commit }) => commit('saveForm'),
  prev1 ({ commit }) { 
  	return new Promise((resolve, reject) => {
  	  commit('prev')
  	  resolve()
  	})
  },
  prev ({ dispatch, commit }) {
  	return dispatch('prev1').then(() => {
  	  commit('inquire')
  	})
  },
  next1 ({ commit }) {
  	return new Promise((resolve, reject) => {
  	  commit('next')
  	  resolve()
  	})
  },
  next ({ dispatch, commit }) {
  	return dispatch('next1').then(() => {
  	  commit('inquire')
  	})
  },
  startFocus: ({ commit }) => commit('startFocus'),
  reachFocus: ({ commit }) => commit('reachFocus')
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})