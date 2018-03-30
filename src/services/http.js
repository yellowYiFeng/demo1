import Vue from 'vue'
import Axios from 'axios'
import { Message } from 'element-ui'

Axios.interceptors.request.use(config => {
    return config;
},
err => {
    return Promise.reject(err);
});
Axios.interceptors.response.use(response => {
    return response;
},
error => {
    if (error.response) {
        switch (error.response.status) {
           case 400: Message.error(response.error.message); 
        }
    }
 
    return Promise.reject(error.response.data)
});




const orgId = '18f923a7-5a5e-426d-94ae-a55ad1a4b240'
const instance1 = Axios.create({
  baseURL: process.env.BASE_URL,
  headers : {'Source' : '705','Token':localStorage.getItem('crmToken'),'OrgId':orgId,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'}
});

const instance2 = Axios.create({
  baseURL: process.env.BASE_URL,
  headers : {'Source' : '705','OrgId':orgId,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'}
});
//公共接口api
const instance3 = Axios.create({
    baseURL: process.env.COM_URL,
    headers : {'Source' : '705','Token':localStorage.getItem('crmToken'),'OrgId':orgId,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'},
});


Vue.prototype.$axios = instance1;
Vue.prototype.$logAxios = instance2;
Vue.prototype.$comAxios = instance3;


