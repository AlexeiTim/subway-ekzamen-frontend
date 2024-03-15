<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2 max-w-[1000px]"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <ElScrollbar max-height="50vh">
      <div class="modal" />
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <p class="font-semibold">
            {{ props.title }}
          </p>

          <el-icon
            size="large"
            class="cursor-pointer"
            @click="emits('close')"
          >
            <Close />
          </el-icon>
        </div>
        <div>
          <slot @close="emits('close')" />
        </div>
      </div>
    </ElScrollbar>
  </VueFinalModal>
</template>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue';
import { ElScrollbar } from 'element-plus';
import { VueFinalModal } from 'vue-final-modal';

interface Props {
  title?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + *{
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}

.modal {
  width: 50vw;
}

@media (max-width: 834px) {
  .modal {
    width: 70vw;
  }
}

@media (max-width: 482px) {
  .modal {
    width: 85vw;
  }
}
</style>