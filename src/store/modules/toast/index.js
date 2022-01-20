export default {
  namespaced: true,
  state: {
    toast: [],
    /*
    showToast: false,
    toastMessage: '',
    toastAlertType: '',
    */
  },
  mutations: {  // vuex의 상태를 유일하게 변화시킬수있다 , payload는 원하는값
    /*
    UPDATE_TOAST_MESSAGE(state, payload) {
      state.toastMessage = payload
    },
    UPDATE_TOAST_ALERT_TYPE(state, payload) {
      state.toastAlertType = payload
    },
    UPDATE_TOAST_STATUS(state, payload) {
      state.showToast = payload
    }, */
    ADD_TOAST(state, payload) {
      state.toast.push(payload)
    },
    REMOVE_TOAST(state) {
      state.toast.shift()
    }
  },
  actions: {   // 함수(context객체의 구조분해 {commmit}, payload)
    triggerToast({ commit }, payload) {
      //  message, type = 'success'
      /*
      //commit( mutions안의 함수와, payload )
      commit('UPDATE_TOAST_MESSAGE', message)  
      commit('UPDATE_TOAST_ALERT_TYPE', type)
      commit('UPDATE_TOAST_STATUS', true) */
      commit('ADD_TOAST', {
        id: Date.now(),
        message: payload.message,
        type: payload.type,
      })

      setTimeout(() => {
        /*
        commit('UPDATE_TOAST_MESSAGE', '') 
        commit('UPDATE_TOAST_ALERT_TYPE', '')
        commit('UPDATE_TOAST_STATUS', false) */
        commit('REMOVE_TOAST')
      },3000)
    }
  },
  getters: { //vuex안에서 사용하는  computed임 실시간감시
    toastMessageWithSmile(state) {
      return state.toastMessage + '^_^'
    }
  },
}