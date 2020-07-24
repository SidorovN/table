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
      title: 'Iron (g)',
      visible: true,
    },
  ],
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
    console.log(columns)
    commit('setColumns', columns)
  },
  sortTable({ commit }, { data }) {
    commit('sortTable', { data })
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
  setRange(state, data) {
    state.pagination.range = data
  },
  sortTable(state, data) {
    console.log(data)
    console.log(typeof state.table[0][data.data] === 'string')
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
  setPagination(state, data) {
    state.pagination = data
  },
  setColumns(state, data) {
    state.columns.map((el) => (el.visible = !!data.includes(el.name)))
    console.log(state.columns)
  },
  deleteItem(state, { id }) {
    console.log(id)
    state.table = state.table.filter((el) => id.every((item) => el.id != item))
    // console.log(state.table)
  },
}

export const getters = {
  getTableData(state) {
    return state.table
  },
  getPagination(state) {
    return state.pagination
  },
}
