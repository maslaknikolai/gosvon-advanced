<template>
  <div>
    user info
    {{ userId }}

    <iframe
      :src="`https://script.gosvon.net/?code=${token}&t=info&id=${userId}`"
      width="100%"
      height="320px"
      frameBorder="0"
      seamless
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line
defineProps({
  userId: { type: String, required: true },
  token: { type: String, required: true }
})
</script>

<style scoped>

</style>
