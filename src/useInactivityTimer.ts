import { ref, onUnmounted } from 'vue'

// Таймер для отслеживания неактивности
export function useInactivityTimer(callback: () => void, delay: number) {
  const inactivityTimeout = ref<number | null>(null)

  const startTimer = () => {
    stopTimer() 
    inactivityTimeout.value = setTimeout(() => {
      callback()
    }, delay)
  }

  const stopTimer = () => {
    if (inactivityTimeout.value) {
      clearTimeout(inactivityTimeout.value)
      inactivityTimeout.value = null
    }
  }

  // Обработчик активности пользователя
  const handleUserActivity = () => {
    startTimer() // Сбрасываем таймер при активности
  }

  // Добавляем обработчики активности
  window.addEventListener('click', handleUserActivity)
  window.addEventListener('keypress', handleUserActivity)
  window.addEventListener('mousemove', handleUserActivity)
  window.addEventListener('scroll', handleUserActivity)

  // Очищаем таймеры и обработчики событий при уничтожении компонента
  onUnmounted(() => {
    stopTimer()
    window.removeEventListener('click', handleUserActivity)
    window.removeEventListener('keypress', handleUserActivity)
    window.removeEventListener('mousemove', handleUserActivity)
    window.removeEventListener('scroll', handleUserActivity)
  })

  return {
    startTimer,
    stopTimer
  }
}
