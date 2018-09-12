import Vue from 'vue';
import { Toast } from 'vant';
import Router from 'vue-router';

import home from './home';
import user from './user';
import items from './items';
import login from './login';

Vue.use(Router);

let RouterModel = new Router({
    routes: [...home, ...user, ...items, ...login]
})


RouterModel.beforeEach((to, from, next) => {
    const { Authorization, token } = Vue.prototype.$util.getLocalStorage('Authorization', 'token')

    if(!Authorization && !token){
        // return RouterModel.push({name: 'login'});
        if(to.meta.keepAlive){
            // RouterModel.push({name: 'login', query: {redirect: to.name}});
            RouterModel.push({name: 'login'});
            return;
        }
    }
    next();
})

RouterModel.afterEach((to, from) => {
})

export default RouterModel;
