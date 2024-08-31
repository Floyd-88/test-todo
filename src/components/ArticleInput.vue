<template>
  <div class="wrapper-input">
    <button class="buttons-btn" @click="startNewArticle" v-if="isTextArticle">+</button>
    <input
      type="text"
      placeholder="start typing|"
      v-else
      ref="titleInput"
      v-model.trim="localTitleArticle"
      @blur="handleInputBlur"
      @keydown.enter="handleInputBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'

const props = defineProps<{
  isTextArticle: boolean
  titleArticle: string
}>()
const emit = defineEmits<{
  (e: 'saveArticleIfNeeded'): void
  (e: 'updateTitle', title: string): void
}>()

const titleInput = ref<HTMLInputElement | null>(null)
const localTitleArticle = ref(props.titleArticle)

watch(
  () => props.titleArticle,
  (newValue) => {
    localTitleArticle.value = newValue
  }
)

watch(localTitleArticle, (newValue) => {
  emit('updateTitle', newValue)
})

function startNewArticle() {
  localTitleArticle.value = ''
  emit('updateTitle', '')
  nextTick(() => {
    titleInput.value?.focus()
  })
}

function handleInputBlur() {
  emit('saveArticleIfNeeded')
}
</script>

<style scoped>
.wrapper-input {
  margin-top: 4vw;
}

.buttons-btn {
  min-height: 14vw;
  width: 100%;
  color: #f58529;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
}

.buttons-btn:hover {
  background-color: #383838;
}

input {
  height: 14vw;
  width: 100%;
  text-align: center;
  border: none;
  border-radius: 1vw;
  background-color: #202020;
  color: #6f6f6f;
  box-sizing: border-box;
}

input:focus {
  border: 1px solid #f58529;
  outline: none;
}

@media (min-width: 900px) {
  .wrapper-input {
    margin-top: 2vw;
  }

  .buttons-btn {
    min-height: 7vw;
  }

  input {
    height: 7vw;
  }
}
</style>
