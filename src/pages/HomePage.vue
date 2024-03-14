<template>
  <LayoutDashboard>
    <template #title>
      <h1>
        Выберите экзамен
      </h1>
    </template>
    <template #search>
      <ElInput />
    </template>
    <template #list>
      <ExamList />
    </template>
    <template #buttons>
      <div class="flex flex-col">
        <ElButton>ОК</ElButton>
        <ElButton>Отмена</ElButton>
      </div>
      <ElButton>Об экзамене</ElButton>
    </template>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import ExamList from '@/components/Home/ExamList.vue';
import LayoutDashboard from '@/layouts/LayoutDashboard.vue';
</script>
