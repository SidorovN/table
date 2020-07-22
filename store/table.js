import {getProducts} from '@/assets/request'
import {deleteProducts} from '@/assets/request'

export const state = () => ({
  table: [],
  pagination: {}
});

export const actions = {
  fetchData({ commit }) {
    return getProducts()
    .then(res=>{
      commit('setState',{
        table: res
      })
    })    
    .then(res=>{
      commit('sortTable', { 
        data: 'product' 
      })
    }) 
  },
  setPagination({ commit }, {first , range}) {
    commit('setPagination', {
      first,
      range
    })
  },  
  sortTable({ commit }, { data }) {
    commit('sortTable', { data })
  },  
  setRange({ commit },  range ) {
    commit('setRange',  range )
  }
}  

export const mutations = {
  setState(state,  data ) {
    state.table = data.table;
  },
  setRange(state,  data ) {
    state.pagination.range = data;    
  },
  sortTable(state, data ) {
    console.log(data)
    console.log(typeof state.table[0][data.data] === 'string')
    typeof state.table[0][data.data] === 'string' ?
    state.table.sort((a,b)=> {
       
        if (a[data.data] > b[data.data]) {
          return 1;
        } else if (a[data.data] < b[data.data]) {
          return -1;
        } 
        return 0;
    }) :
    state.table.sort((a,b)=> a[data.data]- b[data.data]) 
  },
  setPagination(state, data) {
    state.pagination = data
  },
  removeProduct(state, { id }) {
    state.table = state.filter(el=> el.id === id);
  },
}

export const getters = {
  getTableData(state) {
    return state.table
  },
  getPagination(state) {
    return state.pagination 
  },

};