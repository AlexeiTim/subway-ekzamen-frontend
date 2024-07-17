<template>
  <div class="size-full">
    <div class="mb-2">
      <slot name="header" />
    </div>

    <div class="max-w-[1240px] h-[90vh] mx-auto flex-grow w-full px-1 py-1">
      <slot name="content" />
    </div>
  </div>
</template>
