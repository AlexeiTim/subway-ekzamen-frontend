<template>
  <ElButton
    type="info"
    style="margin-left: 0; height: 40px; justify-content: start;"
  >
    {{ props.exam.name }}
  </ElButton>
</template>

<script lang="ts" setup>
import type { ExamModel } from '@/models/exam.model';

interface Props {
  exam: ExamModel
}
const props = defineProps<Props>()
</script>