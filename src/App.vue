<template>
  <button @click="page = 'info'">
    Info
  </button>

  <button @click="page = 'report'">
    Report form
  </button>

  <UserInfo v-if="page === 'info'" />
  <ReportForm v-if="page === 'report'" />
</template>

<script lang="ts" setup>
import UserInfo from './components/UserInfo.vue'
import ReportForm from './components/ReportForm.vue'
import {ref} from 'vue'

const page = ref()
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
