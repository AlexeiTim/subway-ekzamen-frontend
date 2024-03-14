<template>
  <div class="layout">
    <div class="title text-[52px] text-nowrap text-[yellow]">
      <slot name="title" />
    </div>
    <div class="search">
      <slot name="search" />
    </div>
    <div class="list bg-white rounded overflow-hidden h-full">
      <slot name="list" />
    </div>
    <div class="buttons">
      <div class="flex flex-col justify-between h-full">
        <slot
          name="buttons"
        />
      </div>
    </div>
    <div class="empty" />
  </div>
</template>

<style scoped>
.title {
  grid-area: title;
  font-size: 32px;
}

.search {
  grid-area: search;
}

.list {
  grid-area: list;
}

.buttons {
  grid-area: buttons;
}

.empty {
  grid-area: empty
}

.layout {
  height: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 5fr 5fr 2fr;
  grid-template-rows: 100px auto;
  padding-bottom: 20px;
  grid-template-areas:
  "title search empty"
  "list list buttons"
}

@media (max-width: 834px) {
  .empty {
    display: none;
  }

  .buttons > div {
    display: flex;
  }

  .layout {
    grid-template-columns: 12fr;
    grid-template-rows: 100px 100px 100px auto;
    grid-template-areas: 
    "title"
    "buttons"
    "search"
    "list"
    ;
  }
}

@media (max-width: 482px) {
  .layout {
    grid-template-rows: 100px 100px auto 100px;
    grid-template-areas: 
    "title"
    "search"
    "list"
    "buttons"
    ;
  }
}
</style>
