<template>
  <div class="layout">
    <div class="header">
      <slot name="header" />
    </div>

    <div class="question border border-solid border-white">
      <slot name="question" />
    </div>
    <div class="answers border border-solid border-white">
      <ElScrollbar
        max-height="60vh"
      >
        <slot name="answers" />
      </ElScrollbar>
    </div>

    <div class="footer">
      <div class="footer-content">
        <div class="flex-grow footer-alert">
          <slot name="footer-alert" />
        </div>

        <div class="footer-buttons">
          <slot name="footer-buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  grid-area: header;
}

.question {
  grid-area: question;
}

.answers {
  grid-area: answers;
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  width: 1240px;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between
}

.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 834px) {
  .footer-content {
    flex-direction: column-reverse;
    width: 100%;
  }

  .footer-alert {
    width: 100%;
  }

  .footer-buttons {
    width: 100%;
  }
}
</style>