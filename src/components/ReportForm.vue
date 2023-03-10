<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { catcher } from '@/utils/catcher';

const props = defineProps({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  replyLink: { type: String, required: true },
  tokenLevel: { type: Number, required: true }
})

const sendingResult = ref('')
const isSending = ref(false)
const comment = ref(catcher(() => localStorage.reportFormLastComment) || '')
const type = ref('')
const error = ref('')

watch(
  () => comment.value,
  (newValue) => {
    catcher(() => {
      localStorage.reportFormLastComment = newValue
    })
  },
)

const isValid = computed(() => {
  return comment.value && type.value
})

function send() {
  isSending.value = true
  fetch(`//script.gosvon.net?t=report&code=${props.token}&id=${props.userId}`, {
    method: 'POST',
    body: JSON.stringify({
      text: comment.value,
      type: type.value,
      link: props.replyLink
    })
  })
  .then(r => r.json())
  .then((r) => {
    if (r.error) {
      error.value = r.error
    } else {
      sendingResult.value = r.response.msg
      catcher(() => {
        localStorage.reportFormLastComment = ''
      })
    }
  })
  .finally(() => {
    isSending.value = false
  })
}
</script>

<template>
  <div
    v-if="props.tokenLevel < 2"
    class="sent-notification"
  >
    Необходим уровень доступа >= 2
  </div>

  <div v-else>
    <a
      :href="props.replyLink"
      target="_blank"
      class="replyLink"
    >
      {{ props.replyLink }}
    </a>

    <div
      v-if="sendingResult"
      class="sent-notification"
    >
      {{ sendingResult }}
    </div>

    <div v-else>
      <select
        class="select"
        v-model="type"
      >
        <option value="">Выберите подходящую маркировку...</option>
        <option value="8">Бот/Накрутка</option>
        <option value="10">Бот/Спам</option>
        <option value="12">Бот/Троль</option>
        <option value="15">Единая Россия</option>
        <option value="20">Мимикрия</option>
        <option value="21">Н/Д</option>
        <option value="30">Чиновники</option>
        <option value="31">Бюджетники</option>
      </select>

      <div>
        <textarea
          v-model="comment"
          class="comment"
          maxlength="200"
          placeholder="Комментарий к жалобе"
        ></textarea>
      </div>

      <div
        :class="[
          'symbols-rest',
          {
            'symbols-rest__medium': comment.length > 80,
            'symbols-rest__low': comment.length > 140,
          }
        ]"
      >
        Осталось символов: {{ 200 - comment.length }}
      </div>


      <button
        @click="send"
        class="sendBtn"
        :disabled="isSending || !isValid"
      >
        {{ isSending ? 'Отправка...' : 'Отправить' }}
      </button>

      <div class="error">
        {{ error }}
      </div>

    </div>
  </div>
</template>

<style scoped>
.comment {
  display: block;
  resize: none;
  width: 100%;
  height: 110px;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,.3);
}
.symbols-rest {
  font-size: 12px;
  color: gray;
}

.sendBtn {
  padding: 7px 15px;
  border-radius: 3px;
  background: #659ced;
  margin-top: 10px;
  margin-right: 10px;
  color: white;
  cursor: pointer;
  font-weight: bold;
}
.sendBtn:disabled {
  background: #7a7a7a;
}
.symbols-rest__medium {
  color: #b18939;
}
.symbols-rest__low {
  color: red;
}

.sent-notification {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
}

.select {
  display: block;
  border: 1px solid rgba(0,0,0,.3);
  padding: 5px;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,.3);
}

.replyLink {
  margin-bottom: 5px;
  display: block;
}

.error {
  color: red;
}
</style>
