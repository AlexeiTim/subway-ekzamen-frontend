<template>
  <VueFinalModalBase
    :title="MODAL_TITLE"
    @close="emits('close')"
  >
    <h1>{{ exam?.title }}</h1>
    <p>{{ examDescription }}</p>
  </VueFinalModalBase>
</template>

<script lang="ts" setup>
import VueFinalModalBase from '@/components/Modals/VueFinalModalBase.vue';
import { useExamsStore } from '@/stores/exam';
import { computed, onMounted, ref } from 'vue';
const props = defineProps<{
  examId: number
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const MODAL_TITLE = 'Информация о экзамене'

const examsStore = useExamsStore()
const exam = ref(null)

const examDescription = computed(() => {
  return exam.value?.description || 'Информация отсутствует'
})

onMounted(async () => {
  exam.value = await examsStore.getOne(props.examId)
})
</script>