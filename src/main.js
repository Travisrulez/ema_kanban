import Vue from 'vue'
import Main from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  render: h => h(Main),
}).$mount('#main')
