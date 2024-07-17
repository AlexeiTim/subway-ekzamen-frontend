<template>
  <div class="flex flex-col justify-between size-full">
    <div class="mb-2">
      <slot name="header" />
    </div>

    <div class="max-w-[1240px] flex-grow mx-auto w-full px-1 py-1">
      <slot name="content" />
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>
