<script setup lang="ts">
</script>

<template>
  <div>
    <el-button>HELLO</el-button>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <RouterLink :to="{ name: 'about' }">
      About
    </RouterLink>
  </div>
</template>
     