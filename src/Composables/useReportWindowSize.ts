import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useReportWindowSize() {
  // 被组合式函数封装和管理的状态
  const width = ref()
  const height = ref()

  // 组合式函数可以随时更改其状态。
  function reportWindowSize() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('resize', reportWindowSize))
  onUnmounted(() => window.removeEventListener('resize', reportWindowSize))

  // 通过返回值暴露所管理的状态
  return { width, height }
}

export function useGetElementWidth(source: string) {
  const strWidth = ref<any>(undefined)
  const el = document.getElementById(source)
  strWidth.value = el?.style.width.toString() === '' ? el?.clientWidth : el?.style.width
  return { strWidth }
}
