<script setup lang="ts">

import header_compoent from './src/homeLayout_header.vue'

</script>

<template>
    <div class="flex flex-column h-full">
        <header id="headerDiv" class="h-4rem flex-none">
            <header_compoent></header_compoent>
        </header>
        <main id="mainDiv" class="overflow-y-scroll flex-grow-1 p-2">
            <slot></slot>
        </main>
    </div>
</template>
