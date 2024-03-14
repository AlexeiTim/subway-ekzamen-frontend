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
    <template #button-ok>
      <ElButton>ОК</ElButton>
    </template>
    <template #button-cancel>
      <ElButton>Отмена</ElButton>
    </template>
    <template #button-count>
      <ElButton>Об экзамене</ElButton>
    </template>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import ExamList from '@/components/Home/ExamList.vue';
import LayoutDashboard from '@/layouts/LayoutDashboard.vue';
</script>
