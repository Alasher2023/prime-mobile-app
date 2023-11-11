<template>
  
  <div class="h-full">
    <Menubar :model="items">
        <template #start>
          <a class="text-xl font-normal border-none ">PrimeFlex</a>
        </template>
        <!-- 设置自定义图标 -->
        <!-- <template #popupicon>
          <div class="mr-auto border-none">
            <i class="pi pi-bars"></i>
          </div>
        </template> -->
      </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'



const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home'
  },
  {
    label: 'Features',
    icon: 'pi pi-star'
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt'
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server'
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil'
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
  }
])
</script>

<style scoped>

@media screen and (max-width: 960px) {
  /* 固定位置 */
  /* :deep(.p-menubar) {
    width: 100vw;
    position: fixed;
  } */
  /* 调整图标与按钮的位置 */
  :deep(.p-menubar-start) {
    order: 1;
  }
}
/* 去除按钮阴影边框 */
:deep(.p-menubar-button:focus) {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none;
}

</style>
