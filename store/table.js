import { getProducts } from '@/assets/request'
import { deleteProducts } from '@/assets/request'

export const state = () => ({
  table: [],
  pagination: {},
  columns: [
    {
      name: 'product',
      title: 'Product (100g serving)',
      visible: true,
    },
    {
      name: 'calories',
      title: 'Calories',
      visible: true,
    },
    {
      name: 'fat',
      title: 'Fat (g)',
      visible: true,
    },
    {
      name: 'carbs',
      title: 'Carbs (g)',
      visible: true,
    },
    {
      name: 'protein',
      title: 'Protein (g)',
      visible: true,
    },
    {
      name: 'iron',
      title: 'Iron (%)',
      visible: true,
    },
  ],
  loading: true,
  error: false,
})

export const actions = {
  fetchData({ commit }) {
    return getProducts()
      .then((res) => {
        commit('setState', {
          table: res,
        })
      })
      .then((res) => {
        commit('sortTable', {
          data: 'product',
        })
      })
  },
  setPagination({ commit }, { first, range }) {
    commit('setPagination', {
      first,
      range,
    })
  },
  setColumns({ commit }, { columns }) {
    commit('setColumns', columns)
  },
  setLoading({ commit }, load) {
    commit('setLoading', load)
  },
  setError({ commit }, error) {
    commit('setError', error)
  },
  sortTable({ commit }, { data }) {
    commit('sortTable', { data })
  },
  reverseTable({ commit }) {
    commit('reverseTable')
  },
  setRange({ commit }, range) {
    commit('setRange', range)
  },
  deleteItem({ commit }, id) {
    return deleteProducts().then((res) => {
      commit('deleteItem', { id })
    })
  },
}

export const mutations = {
  setState(state, data) {
    state.table = data.table
  },
  setError(state, error) {
    console.log(error)
    state.error = error
    console.log(state.error)
  },
  setLoading(state, data) {
    state.loading = data
  },
  setRange(state, data) {
    state.pagination.range = data
  },
  sortTable(state, data) {
    typeof state.table[0][data.data] === 'string'
      ? state.table.sort((a, b) => {
          if (a[data.data] > b[data.data]) {
            return 1
          } else if (a[data.data] < b[data.data]) {
            return -1
          }
          return 0
        })
      : state.table.sort((a, b) => a[data.data] - b[data.data])
  },
  reverseTable(state) {
    state.table.reverse()
  },
  setPagination(state, data) {
    state.pagination = data
  },
  setColumns(state, data) {
    state.columns.map((el) => (el.visible = !!data.includes(el.name)))
  },
  deleteItem(state, { id }) {
    state.table = state.table.filter((el) => id.every((item) => el.id != item))
  },
}

export const getters = {
  getTableData(state) {
    return state.table
  },
  getPagination(state) {
    return state.pagination
  },
  getLoading(state) {
    return state.loading
  },
  getError(state) {
    return state.error
  },
}
