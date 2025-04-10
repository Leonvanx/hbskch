<!--
  功能：登录页面
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月08日 21:12:26
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-config-provider>
    <div class="login-container">
      <n-card class="login-card" embedded>
        <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="left">
          <n-form-item label="账号" path="username">
            <n-input v-model:value="formValue.username" placeholder="请输入账号" clearable />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input v-model:value="formValue.password" type="password" placeholder="请输入密码" show-password-on="click" clearable />
          </n-form-item>
          <div class="login-button">
            <n-button type="primary" block @click="handleLogin">登录</n-button>
          </div>
        </n-form>
      </n-card>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
const msg = useMessage();
const formValue = ref({
  username: '',
  password: '',
});

const rules = {
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
};

const handleLogin = () => {
  msg.success('登录成功！');
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(270deg, #0f2027, #203a43, #2c5364);
  background-size: 600% 600%;
  animation: gradient 15s ease infinite;
}

.login-card {
  width: 100%;
  max-width: 360px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-button {
  margin-top: 15px;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
