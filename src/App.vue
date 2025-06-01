<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
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
