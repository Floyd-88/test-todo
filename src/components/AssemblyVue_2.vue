<template>
  <div class="wrapper">
    <ArticleButtons
      :articles="articles"
      :articleNum="articleNum"
      @selectArticle="changeArticleNum"
    />

    <NotArticles v-if="articles.length === 0" />

    <div class="text-article">
      <AssemblyVueText v-model="textArticle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import NotArticles from './UniversalComponent/NotArticles.vue'
import type { ArticleI } from '@/types/types'
import AssemblyVueText from './AssemblyVueText.vue'
import ArticleButtons from './ArticleButtons.vue'

const props = defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{
  (e: 'saveArticles'): void
  (e: 'handleChangeArticle', payload: ArticleI): void
}>()

const articleNum = ref<number>(0)
const textArticle = ref<string>('')

onMounted(() => {
  if (props.articles.length > 0) {
    const initialArticle = props.articles[0]
    textArticle.value = initialArticle.text
  }
})

function changeArticleNum(index: number) {
  articleNum.value = index
  const selectedArticle = props.articles[index]
  textArticle.value = selectedArticle.text
  emit('saveArticles')
}

watch(textArticle, () => {
  if (props.articles[articleNum.value]) {
    const updatedArticle = { ...props.articles[articleNum.value], text: textArticle.value }
    emit('handleChangeArticle', updatedArticle)
  }
})
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-x: auto;
}

.text-article {
  flex: 1;
  margin-top: 2vw;
  box-sizing: border-box;
}
</style>
