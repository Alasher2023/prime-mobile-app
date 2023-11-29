<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      // 调用登录接口，将username和password发送给服务器
      // 可以使用axios等库发送网络请求
      axios.post('/api/login', { username: this.username, password: this.password })
        .then(response => {
          // 登录成功，可以存储token等信息，跳转到首页
          this.$router.push('/');
        })
        .catch(error => {
          // 登录失败，可以显示错误信息
          this.$message.error('Login failed');
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  text-align: center;
  margin-top: 200px;
}

h1 {
  font-size: 32px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  color: #555;
}

input {
  padding: 10px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #4c93ff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #3361ff;
}
</style>