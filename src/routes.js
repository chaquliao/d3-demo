import Vue from 'vue';
import Router from 'vue-router';
import indexPage from './components/header.vue'
import lineChart from './views/lineChart.vue'
import histogram from './views/histogram.vue'
import pieChart from './views/pieChart.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            component:lineChart
        },
        {
            path:'/histogram',
            component:histogram
        },
        {
            path:'/pieChart',
            component:pieChart
        }
    ]
})