<!--
  功能：文字滚动组件
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年05月15日 15:23:50
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div ref="containerRef" class="text-scroll-container">
    <div
      ref="contentRef"
      class="text-scroll-content"
      :class="{
        'horizontal-scroll': direction === 'horizontal',
        'vertical-scroll': direction === 'vertical',
      }"
      :style="contentStyle"
    >
      <span v-for="(item, index) in displayText" :key="index">{{ item }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue';

export default defineComponent({
  name: 'TextScroll',
  props: {
    text: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      default: 50,
    },
    direction: {
      type: String as () => 'horizontal' | 'vertical',
      default: 'horizontal',
      validator: (value: string) => ['horizontal', 'vertical'].includes(value),
    },
    fontSize: {
      type: String,
      default: '14px',
    },
    color: {
      type: String,
      default: '#333333',
    },
    repeat: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const containerRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    const animationFrameId = ref<number | null>(null);
    const scrollPosition = ref(0);
    const containerSize = ref({ width: 0, height: 0 });
    const contentSize = ref({ width: 0, height: 0 });

    // 根据是否重复显示文本生成显示内容
    const displayText = computed(() => {
      if (!props.repeat) return [props.text];
      return props.direction === 'horizontal' ? [props.text, props.text] : [props.text];
    });

    // 内容样式
    const contentStyle = computed(() => ({
      fontSize: props.fontSize,
      color: props.color,
      transform:
        props.direction === 'horizontal'
          ? `translateX(${-scrollPosition.value}px)`
          : `translateY(${-scrollPosition.value}px)`,
    }));

    // 更新容器和内容尺寸
    const updateSizes = () => {
      if (containerRef.value && contentRef.value) {
        containerSize.value = {
          width: containerRef.value.offsetWidth,
          height: containerRef.value.offsetHeight,
        };

        contentSize.value = {
          width: contentRef.value.scrollWidth,
          height: contentRef.value.scrollHeight,
        };
      }
    };

    // 滚动动画
    const animate = () => {
      if (!containerRef.value || !contentRef.value) return;

      const maxScroll =
        props.direction === 'horizontal' ? contentSize.value.width / 2 : contentSize.value.height;

      scrollPosition.value += props.speed / 60; // 60fps

      // 重置位置以实现无缝滚动
      if (scrollPosition.value >= maxScroll) {
        scrollPosition.value = 0;
      }

      animationFrameId.value = requestAnimationFrame(animate);
    };

    // 处理窗口大小变化
    const handleResize = () => {
      updateSizes();
    };

    onMounted(() => {
      updateSizes();
      animate();
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
      }
      window.removeEventListener('resize', handleResize);
    });

    // 监听文本变化
    watch(
      () => props.text,
      () => {
        updateSizes();
      },
    );

    return {
      containerRef,
      contentRef,
      displayText,
      contentStyle,
    };
  },
});
</script>

<style scoped lang="scss">
.text-scroll-container {
  width: 100%;
  height: 30px;
  overflow: hidden;
  position: relative;

  .text-scroll-content {
    position: absolute;
    white-space: nowrap;

    &.horizontal-scroll {
      display: flex;
      align-items: center;
    }

    &.vertical-scroll {
      white-space: normal;
      word-break: break-all;
    }

    span {
      display: inline-block;
      margin-right: 20px; // 水平滚动时文字间距

      .vertical-scroll & {
        display: block;
        margin-bottom: 20px; // 垂直滚动时文字间距
      }
    }
  }
}
</style>
