<template>
  <ul class="buttons">
    <li class="item-button" v-for="articleItem in articles" :key="articleItem.id">
      <button class="buttons-btn" @click="openArticle(articleItem)">
        {{ articleItem.title }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { ArticleI } from '@/types/types'

defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{ (e: 'openArticle', article: ArticleI): void }>()

function openArticle(articleItem: ArticleI) {
  emit('openArticle', articleItem)
}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 4vw;
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

@media (min-width: 900px) {
  .buttons {
    gap: 2vw;
  }

  .item-button {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .buttons-btn {
    min-height: 7vw;
  }
}
</style>
