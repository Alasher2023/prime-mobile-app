<script setup lang="ts">
import homeView from '@/components/layout/HomeLayout/homeLayout_index.vue'
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import combo_chart from '@/components/chart/comboChart.vue'
import horizon_chart from '@/components/chart/HorizontalBarChart.vue'
import doughnut_chart from '@/components/chart/doughnut Chart.vue'
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
                <Card>
                  <template #header>
                    <p class="ml-auto bg-blue-100">sales</p>
                  </template>
                  <template #title>
                    <p class="mr-auto bg-yellow-100">sales</p>
                  </template>
                  <template #subtitle>
                    <p class="mr-auto bg-green-100">sales</p>
                    <Divider></Divider>
                    <p class="mr-auto bg-green-100">sales</p>
                  </template>
                  <template #content>
                      <p class="m-0 bg-bluegray-100">
                          sales
                      </p>
                  </template>
              </Card>
              </div>
              <div class="col-12 md:col-6">
                <div class="grid">
                  <div class="col-12">
                    <Card>
                  <template #title>
                    <p class="mr-auto bg-yellow-100">chart1</p>
                  </template>
                  <template #content>
                      <doughnut_chart/>
                  </template>
              </Card>
                  </div>
                  <div class="col-12">
                    <Card>
                  <template #title>
                    <p class="mr-auto bg-yellow-100">chart2</p>
                  </template>
                  <template #content>
                    <horizon_chart/>
                  </template>
              </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <Card>
                  <!-- <template #title>
                    <p class="mr-auto bg-yellow-100">chart1</p>
                  </template> -->
                  <template #content>
                      <combo_chart/>
                  </template>
              </Card>
          </div>
        </div>
      </main>
    </template>
  </homeView>
</template>
