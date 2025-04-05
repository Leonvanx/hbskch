// src/stores/counter.js
import { defineStore } from 'pinia';

// 定义并导出 Store
export const useCounterStoreV2 = defineStore('counterV2', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  },
  persist: {
    // storage: 'localStorage', // 存储方式，默认是 localStorage
    key: 'store-counterV2', // 存储的 key，默认是 store 的 id,比如这里是 counterV2
    pick: ['count'] // 选择哪些被持久化
    // omit: ['doubleCount'], // 选择哪些不被持久化
  }
});
