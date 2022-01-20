import { computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
  const store = useStore()
  const toasts = computed(() => store.state.toast.toasts)
  /*
  const showToast = computed(() => store.state.toast.showToast)
  const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile'])
  const toastAlertType = computed(() => store.state.toast.toastAlertType)
  */
  const triggerToast = (message, type = 'success') => {
    // dispatch 는 store안에 있는 actions의 함수를 사용할때 사용
    // 사용할 함수, payload
    store.dispatch('toast/triggerToast', { message, type })
  }


  return {
    toasts,
    triggerToast,
  }
}