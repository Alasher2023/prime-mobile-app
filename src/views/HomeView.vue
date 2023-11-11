<script setup lang="ts">
import homeView from '@/components/layout/HomeLayout/homeLayout_index.vue'
</script>

<template>
  <homeView>
    <template #default>
      <header>
        <div class="grid grid-nogutter md:hidden">
          <div class="col-12">
            <div class="h-5rem text-center p-3 border-round-sm bg-primary font-bold">shopname</div>
          </div>
          <div class="col-12">
            <div class="h-5rem text-center p-3 border-round-sm bg-blue-100 font-bold">datetime</div>
          </div>
          <div class="col-12">
            <div class="h-5rem text-center p-3 border-round-sm bg-yellow-100 font-bold">diff</div>
          </div>
        </div>
      </header>

      <main class="md:h-full">
        <div class="grid">
          <div class="col-12">
            <div class="grid">
              <div class="col-12 md:col-6">
                <div class="h-20rem md:h-full p-3 text-center border-round-sm bg-primary font-bold">
                  SelesInfo
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="grid">
                  <div class="col-12">
                    <div
                      class="h-20rem md:h-10rem p-3 text-center border-round-sm bg-primary font-bold"
                    >
                      Chart1
                    </div>
                  </div>
                  <div class="col-12">
                    <div
                      class="h-20rem md:h-10rem p-3 text-center border-round-sm bg-primary font-bold"
                    >
                      Chart2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="h-20rem text-center p-3 border-round-sm bg-primary font-bold">Chart3</div>
          </div>
        </div>
      </main>
    </template>
  </homeView>
</template>
