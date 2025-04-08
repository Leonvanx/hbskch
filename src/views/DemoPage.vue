<template>
  <div>
    <div>
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
        Current copied:
        <code>{{ text || 'none' }}</code>
      </p>
    </div>
    <p v-else>Your browser does not support Clipboard API</p>
    <div>
      <h1>AiEditor，一个面向 AI 的富文本编辑器</h1>
    </div>
    <div ref="divRef" style="height: 600px" />
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores';
import { useCounterStoreV2 } from '@/stores';
import { storeToRefs } from 'pinia';
import { useClipboard } from '@vueuse/core';
import { testApi } from '@/apis';
import { AiEditor } from 'aieditor';
import 'aieditor/dist/style.css';

const counter = useCounterStore(); // 获取 Store 实例
const counterV2 = useCounterStoreV2(); // 获取 Store 实例
const { count } = storeToRefs(counterV2); // 解构 Store 中的 state

const { text, copy, copied, isSupported } = useClipboard();
const divRef = ref<Element | null>(null);
let aiEditor: AiEditor | null = null;
const fetchTestApi = async () => {
  try {
    await testApi({ name: '123', age: 123 });
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
  });
});
onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy();
  }
});
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
