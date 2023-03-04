<script lang="ts" setup>
defineProps({
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])
</script>

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

<style scoped lang="scss">
.tabs {
  display: flex;
  align-items: center;
}

.tab {
  padding: 5px 10px;
  display: block;
  border-radius: 0;
  border: 1px solid transparent;
  border-bottom: 2px solid #00000045;
  border-radius: 10px;
  cursor: pointer;
  transition: all .3s;
  margin-bottom: 5px;
  background: #fff;
  margin-right: 5px;
  font-weight: bold;

  &:last-child {
    border-right: 0;
  }

  &:hover {
    background: #cecece;
  }

  &.active {
    background: var(--primary-color);
    color: #fff;
    border-bottom: 0;
    cursor: default;
  }
}

</style>
