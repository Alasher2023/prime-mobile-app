<script setup lang="ts">
import homeView from '@/components/layout/HomeLayout/homeLayout_index.vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import combo_chart from '@/components/chart/comboChart.vue'
import horizontalbar_chart from '@/components/chart/HorizontalBarChart.vue'
import doughnut_chart from '@/components/chart/doughnutChart.vue'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
</script>

<template>
  <homeView>
    <template #default>
      <header>
        <div class="md:hidden">
          <div class="flex flex-row justify-content-between align-items-center px-3">
            <div><Button label="Pre" /></div>
            <div>2023.11.12</div>
            <div><Button label="Next" /></div>
          </div>
        </div>
      </header>

      <main class="md:h-full">
        <div class="grid grid-nogutter">
          <div class="col-12">
            <div class="grid grid-nogutter">
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
                    <p class="m-0 bg-bluegray-100">sales</p>
                  </template>
                </Card>
              </div>
              <div class="col-12 md:col-6">
                <div class="grid grid-nogutter">
                  <div class="col-12">
                    <Card>
                      <template #title>
                        <p class="mr-auto bg-primary">chart in doughnut</p>
                      </template>
                      <template #content>
                        <doughnut_chart />
                      </template>
                    </Card>
                  </div>
                  <div class="col-12">
                    <Card>
                      <template #title>
                        <p class="mr-auto bg-primary">chart in horizontalbar</p>
                      </template>
                      <template #content>
                        <horizontalbar_chart />
                      </template>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <Card>
              <template #title>
                <p class="mr-auto bg-primary">chart in combo</p>
              </template>
              <template #content>
                <combo_chart />
              </template>
            </Card>
          </div>
        </div>
      </main>
    </template>
  </homeView>
</template>
