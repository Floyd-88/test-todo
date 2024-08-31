<template>
  <div class="container">
    <LoaderVue v-if="isLoader" />
    <template v-else>
      <component
        :is="currentComponent"
        :articles="articles"
        @handleAddArticle="handleAddArticle"
        @handleChangeArticle="handleChangeArticle"
        @saveArticles="saveArticles"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getArticles, setArticles } from './api'
import { useInactivityTimer } from './useInactivityTimer'
import AssemblyVue_1 from './components/AssemblyVue_1.vue'
import AssemblyVue_2 from './components/AssemblyVue_2.vue'
import AssemblyVue_3 from './components/AssemblyVue_3.vue'
import LoaderVue from './components/UniversalComponent/LoaderVue.vue'
import type { ArticleI } from './types/types'

const articles = ref<ArticleI[]>([])
const isLoader = ref<boolean>(false)
const saveNotActiveUser = ref<number>(30000)

const currentComponent = computed(() => {
  const buildType = import.meta.env.VITE_BUILD_TYPE
  switch (buildType) {
    case 'сборка1':
      return AssemblyVue_1
    case 'сборка2':
      return AssemblyVue_2
    case 'сборка3':
      return AssemblyVue_3
    default:
      return AssemblyVue_1
  }
})

// Настройка таймера для неактивности
const { startTimer: startInactivityTimer, stopTimer: stopInactivityTimer } = useInactivityTimer(
  saveArticles,
  saveNotActiveUser.value
)

async function initialize() {
  isLoader.value = true
  window.addEventListener('beforeunload', handleBeforeUnload)
  document.addEventListener('visibilitychange', handleVisibilityChange)

  try {
    const fetchedArticles = await getArticles()
    if (fetchedArticles.length > 0) {
      articles.value = fetchedArticles
    }
  } finally {
    isLoader.value = false
    startInactivityTimer()
  }
}

onMounted(initialize)

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  stopInactivityTimer() // Останавливаем таймер
})

async function saveArticles() {
  await setArticles(articles.value)
}

function handleAddArticle(newArticle: ArticleI) {
  if (newArticle) {
    articles.value.push(newArticle)
  }
  saveArticles()
}

function handleChangeArticle(article: ArticleI) {
  const index = articles.value.findIndex((item) => item.id === article.id)
  if (index !== -1) {
    articles.value[index] = article
  }
}

function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault()
  saveArticles()
}

function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') {
    console.log('Visibility change detected: saving articles')
    saveArticles()
  }
}
</script>

<style scoped></style>
