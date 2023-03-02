<template>
  <img
    src="@/assets/logo.jpg"
    width="30"
    class="logo"
  >
  <MainTabs v-model="page"  />

  <UserInfo
    v-show="page === 'info'"
    :userId="userId"
    :token="token"
  />

  <ReportForm
    v-show="page === 'report'"
    :userId="userId"
    :token="token"
  />
</template>

<script lang="ts" setup>
import UserInfo from './components/UserInfo.vue'
import ReportForm from './components/ReportForm.vue'
import {ref} from 'vue'
import MainTabs from './components/MainTabs.vue';

const page = ref()

const {
  userId,
  token,
} = getQuery()

function getQuery() {
  const search = document.location.search
    .substring(1)
    .split('&')
    .reduce<Record<string, string>>((acc, equalString) => {
      const [name, value = 'true'] = equalString.split('=')
      acc[name] = value
      return acc
    }, {})

  return search
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  background: 0;
  border: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 350px;
}

.logo {
  margin-top: 10px;
}
</style>
