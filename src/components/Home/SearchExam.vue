<template>
  <ElInput
    v-model="search"
    placeholder="Введите название экзамена"
    @input="handleChangeSearchValue($event)"
  />
</template>

<script lang="ts" setup>
import { useHomePageStore } from '@/stores/pages';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';


const search = ref('')
const homePageStore = useHomePageStore()

const handleChangeSearchValue = useDebounceFn((value: string) => {
  homePageStore.unsetSelectedExam()
}, 400) 
</script>