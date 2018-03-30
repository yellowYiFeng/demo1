import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        role: [],
        token: null,
        title: '',
        saleDialog: false,
        addContactDialog: false
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        },
        setUser: (state,data) => {
            state.user = data.user;
            state.role = data.crmRole;
        },
        openSaleDialog: (state) => {
            state.saleDialog = true;
        },
        closeSaleDialog: (state) => {
           state.saleDialog = false; 
        },
        openAddContactDialog: (state) => {
            state.addContactDialog = true;
        },
        closeAddContactDialog: (state) => {
           state.addContactDialog = false; 
        }
    }
})