<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal'
import { useRouter } from 'vue-router'

const router = useRouter()


</script>

<template>
  <div class="h-[100vh] p-1" style="background-image: url('./images/main-bg.jpg');">
    <RouterView />
    <ModalsContainer />
  </div>
</template>
