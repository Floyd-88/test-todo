<template>
  <div class="buttons">
    <button
      class="buttons-btn"
      @click="selectArticle(index)"
      v-for="(articleItem, index) in articles"
      :key="articleItem.id"
      :class="{ active: articleNum === index }"
    >
      {{ articleItem.title }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ArticleI } from '@/types/types'

defineProps<{ articles: ArticleI[]; articleNum: number }>()
const emit = defineEmits<{ (e: 'selectArticle', index: number): void }>()

function selectArticle(index: number) {
  emit('selectArticle', index)
}
</script>

<style scoped>
.buttons {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: auto;
  gap: 2.5vw;
  background-color: #000000;
  box-sizing: border-box;
  z-index: 10;
}

.buttons-btn {
  display: flex;
  align-items: center;
  height: 8vw;
  padding: 1vw 3vw;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.buttons-btn:hover {
  background-color: #414141;
}

.active {
  color: #f58529;
}

@media (min-width: 900px) {
  .buttons {
    overflow: hidden;
    scrollbar-width: thin;
    gap: 1.5vw;
  }

  .buttons:hover {
    overflow: auto;
  }

  .buttons-btn {
    height: 3vw;
    padding: 1vw 1vw;
  }
}
</style>
