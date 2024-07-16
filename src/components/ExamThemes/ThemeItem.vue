<template>
  <ElButton
    :type="buttonType"
    style="margin-left: 0; height: 40px; justify-content: start;"
    @click="handleSetSelectedTheme"
  >
    {{ props.theme.title }}
  </ElButton>
</template>

<script lang="ts" setup>
import { useExamThemesPageStore } from '@/stores/pages';
import type { Theme } from '@/types/theme';
import { computed } from 'vue';

interface Props {
  theme: Theme
}

const props = defineProps<Props>()

const examThemesPageStore = useExamThemesPageStore() 

const isActive = computed(() => {
  if (!examThemesPageStore.selectedTheme) return false
  return examThemesPageStore.selectedTheme.id === props.theme.id
})

const buttonType = computed(() => 
  isActive.value ? 'primary' : 'info'
)

const handleSetSelectedTheme = () => 
  examThemesPageStore.setSelectedTheme(props.theme)

</script>