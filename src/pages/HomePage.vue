<script setup lang="ts">
import { useAuthentication } from '@/application/authentication';

const { logout } = useAuthentication()

const handleUserLogout = () => logout()
</script>

<template>
  <div>
    <el-button>HELLO</el-button>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <ElButton @click="handleUserLogout">
      Logout
    </ElButton>
    <RouterLink :to="{ name: 'about' }">
      About
    </RouterLink>
  </div>
</template>
     