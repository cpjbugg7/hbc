import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";
Vue.use(Vuex);

const state = {
    airports: [],
    airlines: [],
    flights: [],
};

const getters = {
    airports: (state) => {
        return state.airports;
    },
    airlines: (state) => {
        return state.airlines;
    },
    flights: (state) => {
        return state.flights;
    },
};
const actions  = {
    getAirports(context) {
        axios.get("/api/airports").then(res => {

            context.commit('setAirports', res.data.airports);
        });
    },
    getAirlines(context) {
        axios.get("/api/airlines").then(res => {
            context.commit('setAirlines', res.data.airlines);
        });
    },
    getFlights(context) {
        axios.get("/api/flights").then(res => {
            console.log(res);
            if(res.data.success){
                context.commit('setFlights', res.data.flights);
            }else{
                alert(res.data.msg)
            }
        });
    },
};
const mutations = {
    setAirports(state,data){
        state.airports = data;
    },
    setAirlines(state,data){
        state.airlines = data;
    },
    setFlights(state,data){
        state.flights = data;
    },
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
export default store

