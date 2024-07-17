<template>
  <div class="flex items-center justify-between bg-white p-4">
    <div>
      <ButtonGoBack v-show="showGoBackButton" />
    </div>
    <ButtonLogout />
  </div>
</template>

<script setup lang="ts">
import ButtonGoBack from '@/components/Buttons/ButtonGoBack.vue';
import ButtonLogout from '@/components/Buttons/ButtonLogout.vue';
import { ROUTER_NAMES } from '@/constants/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

const showGoBackButton = computed(() => route.name !== ROUTER_NAMES.HOME)
</script>
