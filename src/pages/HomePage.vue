<template>
  <div class="flex w-full h-full gap-4 pb-10">
    <div class="flex flex-col flex-grow">
      <div class="flex items-center gap-4">
        <h1 class="text-[52px] text-nowrap text-[yellow]">
          Выберите экзамен
        </h1>
        <ElInput class="w-auto mt-2" />
      </div>
      <!-- Список экзаменов -->
      <div class="bg-white rounded h-full overflow-hidden">
        <div class="bg-slate-400 border-2 p-2">
          Какой-то экзамен
        </div>

        <div class="bg-slate-400 border-2 p-2">
          Какой-то экзамен
        </div>

        <div class="bg-slate-400 border-2 p-2">
          Какой-то экзамен
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div class="flex flex-col">
        <ElButton>ОК</ElButton>
        <ElButton>Отмена</ElButton>
      </div>
      <ElButton>Об экзамене</ElButton>
    </div>
  </div>
</template>
