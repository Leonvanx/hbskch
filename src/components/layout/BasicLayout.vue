<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';

const router = useRouter();
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
          },
        },
        { default: () => '首页' },
      ),
    key: 'home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/home/demoPage',
          },
        },
        { default: () => '演示页面' },
      ),
    key: 'demo',
  },
];

const activeKey = ref<string | null>(router.currentRoute.value.path);
const showDrawer = ref(false);
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

    <n-layout-content>
      <!-- 移动端菜单按钮 -->
      <div v-if="isMobile" class="mobile-menu-btn" @click="showDrawer = true">
        <n-icon size="24">
          <svg viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </n-icon>
      </div>
      <RouterView />
    </n-layout-content>
  </n-layout>
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

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}
</style>
