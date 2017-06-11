import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: require('@/components/Index'),
      children: [
        {
          path: '/home',
          component: require('@/components/Home'),
          children: [
            {
              path: '/home/trainticket',
              component: require('@/components/Home/TrainTicket')
            }
          ]
        },
        {
          path: '/grabvotes',
          component: require('@/components/GrabVotes')
        },
        {
          path: '/order',
          component: require('@/components/Order')
        },
        {
          path: '/my',
          component: require('@/components/my')
        }
      ]
    },
    {
      path: '/selectcity',
      component: require('@/components/SelectCity')
    },
    {
      path: '/showcalendarinput',
      component: require('@/components/calendar/show-calendar-input')
    },
    {
      path: '/showtickets',
      component: require('@/components/showTickets')
    },
    {
      path: '/buyticket/:id',
      name: 'buyticket',
      component: require('@/components/buyTicket')
    },
    {
      path: '/orderdetails/:id',
      name: 'orderdetails',
      component: require('@/components/orderDetails')
    },
    {
      path: '/ticketbooking/:id',
      name: 'ticketbooking',
      component: require('@/components/ticketBooking')
    },
    {
      path: '/passenger',
      name: 'passenger',
      component: require('@/components/passenger')
    }
  ]
})
router.push({path: '/home'})
router.push({path: '/home/trainticket'})
export default router