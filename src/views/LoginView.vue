<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { reactive, ref } from 'vue'
import * as Yup from 'yup'
import apiClient from '@/Composables/request'

interface LoginValuesInterface {
  userId: string
  password: string
}
const LoginValues = reactive<LoginValuesInterface>({
  userId: '',
  password: ''
})
const errorMsg = ref('')

const onsubmit = async () => {
  await chkInputVal()
  await doLogin()
  if (errorMsg.value.trim().length === 0) {
    console.log(errorMsg.value)
    console.log('Success')
  } else {
    console.log('Error')
    return false
  }
}

const doLogin = async () => {
  await apiClient
    .get(`/api/SysMstUser/${LoginValues.userId}`)
    .then((res) => {
      if (res.data.length == 0) {
        errorMsg.value = 'please check your userId'
      } else {
        if (res.data[0]['logiN_PASS'] != LoginValues.password) {
          errorMsg.value = 'please check your password'
        }
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
}

const chkInputVal = async () => {
  const schema = Yup.object().shape({
    userId: Yup.string().required('UserId is required'),
    password: Yup.string().required('Password is required')
  })
  await schema
    .validate(LoginValues, {
      abortEarly: true
    })
    .then(() => {
      errorMsg.value = ''
      //使用vuerouter跳转画面
      // router.push('/')
    })
    .catch((err: { errors: string[] }) => {
      errorMsg.value = err.errors[0]
      console.log(err.errors)
    })
}
</script>

<template>
  <form @submit.prevent="onsubmit">
    <div class="flex w-full h-screen justify-content-center align-items-center">
      <Card
        :pt="{
          title: {
            class: 'text-center'
          },
          footer: {
            class: 'text-center'
          }
        }"
      >
        <template #title> Login </template>
        <template #content>
          <div class="flex justify-content-center">
            <div class="field grid">
              <label for="UserId" class="col-fixed" style="width: 100px">UserId</label>
              <div class="col">
                <InputText
                  v-model="LoginValues.userId"
                  name="UserId"
                  placeholder="UserId"
                  :pt="{ root: { class: 'w-12rem' } }"
                ></InputText>
              </div>
            </div>
          </div>
          <div class="flex justify-content-center">
            <div class="field grid">
              <label for="Password" class="col-fixed" style="width: 100px">Password</label>
              <div class="col">
                <Password
                  v-model="LoginValues.password"
                  name="Password"
                  toggleMask
                  :feedback="false"
                  placeholder="Password"
                  :pt="{ input: { class: 'w-12rem' } }"
                ></Password>
              </div>
            </div>
          </div>
          <small class="text-danger">{{ errorMsg }}</small>
        </template>
        <template #footer>
          <Button
            type="submit"
            label="Submit"
            outlined
            :pt="{ root: { class: 'w-12rem' } }"
          ></Button>
        </template>
      </Card>
    </div>
  </form>
</template>
