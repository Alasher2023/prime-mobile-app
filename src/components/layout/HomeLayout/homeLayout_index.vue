<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import header_compoent from './src/homeLayout_header.vue'
import { useReportWindowSize, useGetElementWidth } from '@/Composables/useReportWindowSize'

const mainDivWidth = ref('auto')
const width = useReportWindowSize().width
watch(width, () => {
  mainDivWidth.value = useGetElementWidth('mainDiv').strWidth.value.toString() + 'px'
})
onMounted(() => {
  mainDivWidth.value = useGetElementWidth('mainDiv').strWidth.value.toString() + 'px'
})
</script>

<template>
  <header id="headerDiv" class="h-4rem fixed" :style="{ width: mainDivWidth }">
    <header_compoent></header_compoent>
  </header>
  <main id="mainDiv" class="overflow-hidden pt-7">
    <slot></slot>
  </main>
</template>
