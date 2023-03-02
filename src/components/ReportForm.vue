<template>
  <div class="hello">
    <div
      v-if="isSent"
      class="sent-notification"
    >
      Жалоба отправлена.
    </div>

    <div v-else>
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
        Осталось символов:{{ 200 - comment.length }}
      </div>


      <button
        @click="send"
        class="sendBtn"
        :disabled="isSending"
      >
        {{ isSending ? 'Отправка...' : 'Отправить' }}
      </button>

      {{ error }}

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  userId: { type: String, required: true },
  token: { type: String, required: true }
})

const isSent = ref(false)
const isSending = ref(false)
const comment = ref('')
const error = ref('')

function send() {
  isSending.value = true
  fetch(`//script.gosvon.net?type=report&token=${props.token}`, {
    method: 'POST',
    body: JSON.stringify({
      comment: comment.value
    })
  })
  .then(r => r.json())
  .then((r) => {
    if (r.error) {
      error.value = r.error
    } else {
      isSent.value = true
    }
  })
  .finally(() => {
    isSending.value = false
  })
}
</script>

<style scoped>
.comment {
  display: block;
  resize: none;
  width: 100%;
  height: 110px;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #000;
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
  height: 80px;
}
</style>
