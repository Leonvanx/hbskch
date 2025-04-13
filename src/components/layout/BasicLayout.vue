<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { routes } from '@/router';
import { h } from 'vue';
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui';
import { updatePassword } from '@/apis';
const router = useRouter();
const { width } = useWindowSize();
const message = useMessage();
const isMobile = computed(() => width.value < 768);
const route = useRoute();
interface ModelType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);
const model = ref<ModelType>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});
const validatePasswordStartWith = (rule: FormItemRule, value: string): boolean => {
  return !!model.value.newPassword && model.value.newPassword.startsWith(value) && model.value.newPassword.length >= value.length;
};
const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
  return value === model.value.newPassword;
};
const rules: FormRules = {
  oldPassword: [
    {
      required: true,
      message: '请输入旧密码',
    },
  ],
  newPassword: [
    {
      required: true,
      message: '请输入新密码',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input',
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ],
};
const handlePasswordInput = () => {
  if (model.value.confirmPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
  }
};

// 修改密码弹框
const modalVisible = ref(false);
const editPassword = () => {
  modalVisible.value = true;
};
const exit = () => {
  sessionStorage.removeItem('token');
  message.info('退出登录成功');
  router.replace('/login');
};
// 根据 routes 生成 menuOptions
// @ts-expect-error no-error
const menuOptions: RouterOptions[] = routes
  .filter((route) => route.path === '/admin' && route.children)
  .flatMap((route) => route.children!)
  .map((route) => {
    // @ts-expect-error no-error
    const iconComponent = route.meta?.iconName
      ? // @ts-expect-error no-error
        () => h('img', { src: `/src/assets/icons/${route.meta.iconName}.svg`, width: 20, height: 20 })
      : null;

    return {
      label: () =>
        h(
          RouterLink,
          {
            to: { name: route.name },
          },
          // @ts-expect-error no-error
          { default: () => route.meta?.label || '' },
        ),
      key: `/admin/${route.path}`,
      icon: iconComponent,
    };
  });

// 添加路由监听
watch(
  () => router.currentRoute.value.path,
  (path) => {
    activeKey.value = path;
  },
);

const activeKey = ref<string | null>(router.currentRoute.value.path);
const showDrawer = ref(false);

const cancel = () => {
  modalVisible.value = false;
};
const submitPassword = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // 调用修改密码接口
      const res = await updatePassword(
        { ...model.value },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      );
      if (res.code === 0) {
        message.success('修改密码成功');
        modalVisible.value = false;
        return;
      } else {
        message.error(res.msg);
      }
    }
  });
};
</script>

<template>
  <n-layout has-sider>
    <!-- 桌面端侧边栏 -->
    <n-layout-sider v-if="!isMobile" bordered collapse-mode="width" :collapsed-width="64" :width="240" :native-scrollbar="false" show-trigger>
      <n-menu v-model:value="activeKey" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
    </n-layout-sider>

    <!-- 移动端抽屉式导航 -->
    <n-drawer v-model:show="showDrawer" placement="left" :width="240">
      <n-drawer-content>
        <n-menu v-model:value="activeKey" :options="menuOptions" @update:value="showDrawer = false" />
      </n-drawer-content>
    </n-drawer>

    <n-layout-content position="absolute">
      <!-- 移动端菜单按钮 -->
      <div v-if="isMobile" class="mobile-menu-btn" @click="showDrawer = true">
        <n-icon size="24">
          <svg viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </n-icon>
      </div>
      <n-flex vertical style="height: 100%">
        <n-card>
          <n-flex align="center">
            <span style="font-size: 20px; font-weight: 500">
              {{ route.meta.label }}
            </span>
            <span style="flex: 1"></span>
            <n-popover trigger="click">
              <template #trigger>
                <img width="34px" height="34px" src="@/assets/icons/avator.svg" />
              </template>
              <n-flex vertical>
                <n-button quaternary @click="editPassword">修改密码</n-button>
                <n-button quaternary @click="exit">退出登录</n-button>
              </n-flex>
            </n-popover>
          </n-flex>
        </n-card>
        <div class="router-view">
          <RouterView />
        </div>
      </n-flex>
    </n-layout-content>
  </n-layout>
  <n-modal v-model:show="modalVisible" @mask-click="cancel">
    <n-card style="width: 600px" title="修改密码" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="oldPassword" label="旧密码">
          <n-input v-model:value="model.oldPassword" type="password" :maxlength="16" placeholder="请输入旧密码" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="newPassword" label="新密码">
          <n-input
            v-model:value="model.newPassword"
            type="password"
            :maxlength="16"
            placeholder="请输入新密码"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item ref="rPasswordFormItemRef" first path="confirmPassword" label="重复密码">
          <n-input
            v-model:value="model.confirmPassword"
            :disabled="!model.newPassword"
            placeholder="请再次输入"
            :maxlength="16"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-flex justify="end">
          <n-button type="primary" @click="submitPassword">确定</n-button>
          <n-button @click="cancel">取消</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
.n-layout-sider {
  height: 100vh;
}
.n-layout-content {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.mobile-menu-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  padding: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  cursor: pointer;
}
.router-view {
  height: calc(100% - 76px - 8px);
  overflow: auto;
}
@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}
</style>
