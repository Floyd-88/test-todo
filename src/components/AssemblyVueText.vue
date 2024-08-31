<template>
  <textarea class="text" ref="textarea" :value="modelValue" @input="updateValue"></textarea>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const textarea = ref<HTMLTextAreaElement | null>(null)

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('update:modelValue', target.value)
  }
}

onMounted(() => {
  nextTick(() => {
    if (textarea.value) {
      textarea.value.focus()
      textarea.value.setSelectionRange(0, 0)
      textarea.value.scrollTop = 0
    }
  })
})
</script>

<style scoped>
.text {
  width: 100%;
  height: 100%;
  background-color: #000000;
  color: #efefef;
  border: none;
  resize: none;
  box-sizing: border-box;
}

.text:focus {
  outline: none;
}

/* Медиа-запрос для экранов шире 900px */
@media (min-width: 900px) {
  .text {
    overflow: hidden;
    scrollbar-width: thin;
  }
  .text:hover {
    overflow: auto;
  }
}
</style>
