<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
import { searchResource } from './apis';
const useDynamicIcon = () => {
  let iconUrl = '';
  const fetchIconUrl = async () => {
    const res = await searchResource();
    if (res.data) {
      iconUrl = res.data.filter((it) => it.code === 'logo')[0].url;
      updateFavicon(iconUrl);
    }
  };
  const updateFavicon = (url: string) => {
    if (!url) return;
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    favicon.href = url;
  };
  onMounted(fetchIconUrl);
};
useDynamicIcon();
</script>

<template>
  <n-config-provider class="n-config-provider" :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">
.n-config-provider {
  height: 100%;
  overflow-y: auto;
}
</style>
