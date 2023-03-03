<template>
  <div>
    {{ isLoading ? 'Загрузка...' : '' }}

    <div
      v-if="!isLoading"
      :innerHTML="html"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  page: { type: String, required: true },
  userId: { type: String, required: true },
  token: { type: String, required: true }
})

const isLoading = ref(false)
const html = ref('')

function loadInfo() {
  isLoading.value = true
  return fetch(`//script.gosvon.net?t=info&code=${props.token}&id=${props.userId}`)
  .then(r => r.text())
  .then(r => {
    html.value = r
  })
  .finally(() => {
    isLoading.value = false
  })
}

const lastFetchedForUserId = ref('')
async function loadIfNeeded() {
  if (props.page !== 'info') {
    return
  }

  if (lastFetchedForUserId.value === props.userId) {
    return
  }

  await loadInfo()
  lastFetchedForUserId.value = props.userId
}


watch(() => props.page, loadIfNeeded)
watch(() => props.userId, loadIfNeeded)
</script>

<style scoped>

</style>
