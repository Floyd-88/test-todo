<template>
  <div class="wrapper">
    <div class="wrapper-items" v-if="!article" @scroll="resetArticleMode">
      <ArticleList :articles="articles" @openArticle="openArticle" />

      <NotArticles v-if="articles.length === 0" />

      <ArticleInput
        :isTextArticle="isTextArticle"
        :titleArticle="titleArticle"
        @saveArticleIfNeeded="saveArticleIfNeeded"
        @updateTitle="updateTitle"
      />
    </div>

    <div class="article-text" v-else>
      <AssemblyVueText v-model="textArticle" />
      <button class="article-btn" @click="closeArticle">&lt;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, onMounted } from 'vue'
import ArticleList from './ArticleList.vue'
import ArticleInput from './ArticleInput.vue'
import AssemblyVueText from './AssemblyVueText.vue'
import NotArticles from './UniversalComponent/NotArticles.vue'
import type { ArticleI } from '@/types/types'

defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{
  (e: 'handleAddArticle', payload: ArticleI): void
  (e: 'handleChangeArticle', payload: ArticleI): void
  (e: 'saveArticles'): void
}>()

const article = ref<ArticleI | null>(null)
const titleArticle = ref<string>('')
const isTextArticle = ref<boolean>(true)
const textArticle = ref<string>('')

function openArticle(articleItem: ArticleI) {
  textArticle.value = articleItem.text
  article.value = articleItem
}

function closeArticle() {
  emit('saveArticles')
  textArticle.value = ''
  article.value = null
  isTextArticle.value = true
}

function addArticle() {
  if (titleArticle.value.length > 0) {
    const newArticle: ArticleI = {
      id: Date.now(),
      title: titleArticle.value,
      text: ''
    }
    emit('handleAddArticle', newArticle)
    titleArticle.value = ''
  }
}

function updateTitle(title: string) {
  titleArticle.value = title
  isTextArticle.value = false
}

function resetArticleMode() {
  if (!isTextArticle.value) {
    saveArticleIfNeeded()
    isTextArticle.value = true
  }
}

function saveArticleIfNeeded() {
  if (titleArticle.value.length > 0) {
    addArticle()
  }
  isTextArticle.value = true
}

watch(textArticle, () => {
  if (article.value) {
    const updatedArticle = { ...article.value, text: textArticle.value }
    emit('handleChangeArticle', updatedArticle)
  }
})

// Обработка событий перед выгрузкой страницы
function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault()
  saveArticleIfNeeded()
  event.returnValue = ''
}

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(async () => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.wrapper-items {
  flex: 1;
  overflow: auto;
  max-height: 100vh;
  padding-bottom: 10vw;
}

.article-text {
  height: 100%;
  box-sizing: border-box;
}

.text {
  flex: 1;
}

.article-btn {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: 15vw;
  height: 15vw;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  color: #f58529;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.article-btn:hover {
  background-color: #393939;
}

/* Медиа-запрос для экранов шире 900px */
@media (min-width: 900px) {
  .article-btn {
    width: 7vw;
    height: 7vw;
  }

  .wrapper-items {
    overflow: hidden;
    padding-bottom: 5vw;
    scrollbar-width: thin;
  }

  .wrapper-items:hover {
    overflow: auto;
  }
}
</style>
