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
      <div class="button-ok">
        <slot name="button-ok" />
      </div>
      <div>
        <slot name="button-cancel" />
      </div>
      <div class="button-count">
        <slot name="button-count" />
      </div>
    </div>
    <div class="empty" />
  </div>
</template>

<style scoped>
.title {
  grid-area: title;
}

.search {
  margin-top: 10px;
  grid-area: search;
}

.list {
  grid-area: list;
}

.buttons {
  grid-area: buttons;
}

.empty-button {
  grid-area: empty-button;
}

.empty {
  grid-area: empty;
}

:deep(.el-button) {
  width: 100%;
}

.button-count {
  margin-top: auto;
}

.buttons {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.layout {
  height: 100%;
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: 5fr 5fr 2fr;
  grid-template-rows: 100px auto;
  padding-bottom: 20px;
  grid-template-areas:
    'title search empty'
    'list list buttons';
}

@media (max-width: 834px) {
  .title {
    text-align: center;
  }

  .empty {
    display: none;
  }

  .button-count {
    margin-top: 0;
  }

  .buttons {
    flex-direction: row;
    justify-content: space-between;
  }

  .buttons > div {
    flex-basis: 32%;
  }

  .layout {
    grid-template-columns: 12fr;
    grid-template-rows: 100px 50px 50px auto;
    grid-template-areas:
      'title'
      'buttons'
      'search'
      'list';
  }
}

@media (max-width: 482px) {
  .title {
    font-size: 32px;
  }

  .layout {
    grid-template-rows: 50px 50px auto 50px;
    grid-template-areas:
      'title'
      'search'
      'list'
      'buttons';
  }
}
</style>
