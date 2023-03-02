<template>
  <div>
    {{ isLoading ? 'Загрузка...' : '' }}

    <div :innerHTML="html"></div>
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

function load() {
  isLoading.value = true
  fetch(`//script.gosvon.net?t=info&code=${props.token}&id=${props.userId}`)
  .then(r => r.text())
  .then(r => {
    html.value = r
  })
  .finally(() => {
    isLoading.value = false
  })
}

watch(() => props.page, () => {
  if (!isLoading.value && !html.value && props.page === 'info') {
    load()
  }
})
</script>

<style scoped>

</style>
