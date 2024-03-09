<template>
  <div class="bg-slate-400 border-2 p-2">
    {{ props.exam.name }}
  </div>
</template>

<script lang="ts" setup>
import type { ExamModel } from '@/models/exam.model';

interface Props {
  exam: ExamModel
}
const props = defineProps<Props>()
</script>