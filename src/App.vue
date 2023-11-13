<script setup lang="ts">
import { RouterView } from 'vue-router'

// 禁止IOS放大 Start
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  var lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    function (event) {
      var now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
  document.addEventListener(
    'touchmove',
    function (event) {
      if (event.scale !== 1) {
        event.preventDefault()
      }
    },
    { passive: false }
  )
}
// 禁止IOS放大 End
</script>

<template>
  <div style="height: 100vh">
    <RouterView />
  </div>
</template>
