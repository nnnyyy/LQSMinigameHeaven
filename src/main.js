/**
 * Created by nnnyyy on 2018-11-21.
 */
import './css/style.css'
import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import LoginApp from './LoginApp.vue'
import MyInfo from './MyInfo.vue'
import $ from 'jquery'
import axios from 'axios';
import VueAdsense from './components/VueAdsense.vue'
import Ads300x250 from './components/Ads300x250.vue'
import MsgBox from './components/MessageBox.vue'
import VueRouter from 'vue-router'

const NotFound = { template: '<p>페이지가 존재하지 않습니다.</p>'};

$(document).ready(function() {
    Vue.use(VueRouter);
    Vue.prototype.$bus = new Vue();
    Vue.prototype.$http = axios;    
    Vue.component('adsense', VueAdsense);
    Vue.component('msgbox', MsgBox);
    Vue.component('ads300x250', Ads300x250);

    const router = new VueRouter({
        mode: 'history',
        routes: [
          { path: '/', component: Home },          
          { path: '/login', component: LoginApp },
          { path: '/myinfo', component: MyInfo },
        ]
      })

      new Vue({
        el: '#app',        
        render: h => {
            return h( App );
        },
        router
    });
});
