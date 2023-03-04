<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  infoHtml: { type: String, required: true },
  userId: { type: String, required: true },
  token: { type: String, required: true }
})

const emit = defineEmits(['fetched'])

const isLoading = ref(false)

function loadInfo() {
  if (props.infoHtml) {
    return
  }

  isLoading.value = true
  return fetch(`//script.gosvon.net?t=info&code=${props.token}&id=${props.userId}`)
  .then(r => r.text())
  .then(r => {
    emit('fetched', r)
  })
  .finally(() => {
    isLoading.value = false
  })
}

onMounted(loadInfo)
</script>

<template>
  <div>
    {{ isLoading ? 'Загрузка...' : '' }}

    <div
      v-if="!isLoading"
      :innerHTML="props.infoHtml"
    ></div>
  </div>
</template>

<style scoped>

</style>
