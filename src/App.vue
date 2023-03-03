<template>
  <img
    src="@/assets/logo.jpg"
    width="30"
    class="logo"
  >
  <MainTabs v-model="page"  />

  <UserInfo
    v-show="page === 'info'"
    :page="page"
    :userId="userId"
    :token="token"
  />

  <ReportForm
    v-show="page === 'report'"
    :userId="userId"
    :token="token"
    :replyLink="replyLink"
  />
</template>

<script lang="ts" setup>
import UserInfo from './components/UserInfo.vue'
import ReportForm from './components/ReportForm.vue'
import {ref} from 'vue'
import MainTabs from './components/MainTabs.vue';
import {getQuery} from './utils/getQuery';


const query = getQuery()

const page = ref()
const userId = ref(query.userId || '')
const token = ref(query.token || '')
const replyLink = ref(query.replyLink || '')

window.addEventListener('message', (event) => {
  page.value = ''

  const data = JSON.parse(event.data)

  userId.value = data.userId
  token.value = data.token
  replyLink.value = data.replyLink
})
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
  max-width: 700px;
}

.logo {
  margin-top: 10px;
}
</style>
