<template>
  <ElInput
    v-model="search"
    placeholder="Введите название экзамена"
    @input="handleChangeSearchValue($event)"
  />
</template>

<script lang="ts" setup>
import { useExamsStore } from '@/stores/exam';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';


const search = ref('')
const examsStore = useExamsStore()

const handleChangeSearchValue = useDebounceFn((value: string) => {
  examsStore.getAll({ search: value })
}, 400) 
</script>