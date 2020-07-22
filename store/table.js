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
  },
  setPagination({ commit }, {first , range}) {
    commit('setPagination', {
      first,
      range
    })
  }
}  

export const mutations = {
  setState(state,  data ) {
    state.table = data.table;
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

// export const mutations = {
//   saveAnswer(state, { answer, currentQuestion }) {
//     state.answers[state.questions[currentQuestion].name] = answer;
//   },
//   setCurrentQuestion(state, { currentQuestion }) {
//     state.currentQuestion = currentQuestion;
//   },
//   setQuestions(state, questions) {
//     state.questions = questions;
//   },
//   resetAnswers(state) {
//     state.answers = {};
//   },
// };
// export const getters = {
//   getNumberAllQuestions(state) {
//     return Object.keys(state.questions).length;
//   },
// };
// export const actions = {
//   async nextQuestion({ commit, state }, { answer }) {
//     const { currentQuestion } = state;
//     await commit('saveAnswer', { answer, currentQuestion });

//     if (currentQuestion < getters.getNumberAllQuestions(state)) {
//       await commit('setCurrentQuestion', {
//         currentQuestion: currentQuestion + 1,
//       });
//     }
//   },
//   prevQuestion({ commit, state }) {
//     const { currentQuestion } = state;
//     if (currentQuestion === 1) {
//       return;
//     }
//     commit('setCurrentQuestion', { currentQuestion: currentQuestion - 1 });
//   },
//   async SEND_QUIZ({ commit, state }) {
//     await this.$axios.$post('forms/stories', state.answers);
//     await commit('setCurrentQuestion', { currentQuestion: 1 });
//     await commit('resetAnswers');
//   },
// };
