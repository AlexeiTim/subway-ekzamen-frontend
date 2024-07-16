import { defineStore } from "pinia"
import { ref } from "vue"

export const usePracticeStore = defineStore('practice-store', () => {
  const errorsCount = ref(0)
  const successesCount = ref(0)

  function incrementErrorsCount() {
    errorsCount.value += 1
  }

  function incrementSuccessesCount() {
    successesCount.value += 1
  }

  function $reset() {
    errorsCount.value = 0
    successesCount.value = 0
  }

  return {
    errorsCount,
    successesCount,
    incrementErrorsCount,
    incrementSuccessesCount,
    $reset,
  }
})