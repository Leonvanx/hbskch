<template>
  <div>
    <div>
      123
      <div class="customBtn" @click="fetchTestApi">自定义样式按钮</div>
    </div>
    <div>
      <p>Count: {{ counter.count }}</p>
      <p>Double: {{ counter.doubleCount }}</p>
      <button @click="counter.increment()">Increment</button>
      <p>这也是响应式的：{{ count }}</p>
      <button @click="counterV2.increment()">IncrementV2</button>
    </div>
    <div v-if="isSupported">
      <button @click="copy(count + '')">
        <!-- by default, `copied` will be reset in 1.5s -->
        <span v-if="!copied">Copy</span>
        <span v-else>Copied!</span>
      </button>
      <p>
        Current copied: <code>{{ text || 'none' }}</code>
      </p>
    </div>
    <p v-else>Your browser does not support Clipboard API</p>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores';
import { useCounterStoreV2 } from '@/stores';
import { storeToRefs } from 'pinia';
import { useClipboard } from '@vueuse/core';
import { testApi } from '@/apis';

const counter = useCounterStore(); // 获取 Store 实例
const counterV2 = useCounterStoreV2(); // 获取 Store 实例
const { count } = storeToRefs(counterV2); // 解构 Store 中的 state

const { text, copy, copied, isSupported } = useClipboard();

const fetchTestApi = async () => {
  try {
    const res = await testApi({ name: "123", age: 123 });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
.customBtn {
  background: #6373ff;
  color: #fff;
  padding: 0 10px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
