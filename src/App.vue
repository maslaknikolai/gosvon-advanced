<script lang="ts" setup>
import UserInfo from './components/UserInfo.vue'
import ReportForm from './components/ReportForm.vue'
import {ref} from 'vue'
import MainTabs from './components/MainTabs.vue';
import {getQuery} from './utils/getQuery';


const query = getQuery()

const page = ref()
const userId = ref(query.userId || '')
const userName = ref(query.userName || '')
const token = ref(query.token || '')
const tokenLevel = ref(query.tokenLevel ? Number(query.tokenLevel) : 0)
const replyLink = ref(query.replyLink || '')

const infoHtml = ref('')

window.addEventListener('message', (event) => {
  page.value = ''
  infoHtml.value = ''

  const data = JSON.parse(event.data)

  const debugLink = Object.entries(data).reduce<string>((acc, [key, value], i) => {
    if (i === 0) {
      acc += '?'
    } else {
      acc += '&'
    }

    if (!value) {
      acc += key
    } else {
      acc += `${key}=${encodeURIComponent(String(value))}`
    }

    return acc
  }, document.location.href)

  console.log('GosVon Advanced. Данные', debugLink);

  userId.value = data.userId
  token.value = data.token
  replyLink.value = data.replyLink
  userName.value = data.userName
  tokenLevel.value = data.tokenLevel
})
</script>

<template>
  <div class="header">
    <img
      src="@/assets/logo.png"
      width="40"
      class="logo"
    >

    <div class="user">
      id{{ userId }}, {{ userName }}
    </div>
  </div>

  <MainTabs v-model="page"  />

  <div
    v-if="page"
    class="content"
  >
    <UserInfo
      v-if="page === 'info'"
      :infoHtml="infoHtml"
      :userId="userId"
      :token="token"
      @fetched="infoHtml = $event"
    />

    <ReportForm
      v-if="page === 'report'"
      :userId="userId"
      :token="token"
      :replyLink="replyLink"
      :tokenLevel="tokenLevel"
    />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  background: 0;
  border: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #659ced;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 700px;
}

.header {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  padding-left: 10px;
}

.logo {
  margin-right: 10px;
}

.user {
  font-weight: bold;
  font-size: 14px;
}

.content {
  padding: 10px;
  overflow-y: auto;
  height: 270px;
  border-radius: 10px;
  background: #fff;
}
</style>
