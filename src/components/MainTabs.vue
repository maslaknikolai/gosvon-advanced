<template>
  <div class="tabs">
    <button
      @click="emit('update:modelValue', 'info')"
      :class="[
        'tab',{
          active: modelValue === 'info'
        }
      ]"
    >
      Данные пользователя
    </button>

    <button
      @click="emit('update:modelValue', 'report')"
      :class="[
        'tab',{
          active: modelValue === 'report'
        }
      ]"
    >
      Отправить на проверку
    </button>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line
defineProps({
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.tabs {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab {
  width: 100%;
  height: 50px;
  display: block;
  border-radius: 0;
  border: 0;
  border-bottom: 2px solid #00000045;
  cursor: pointer;
  transition: all .3s;
  margin-bottom: 20px;
  border-right: 1px solid #0000001c;
}

.tab:hover {
  background: rgba(0,0,0,0.1);
}

.tab:last-child {
  border-right: 0;
}

.tab.active {
  border-bottom: 2px solid #659ced;
}
</style>
