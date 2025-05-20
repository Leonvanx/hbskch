<template>
  <!-- 文本滚动 -->
  <div ref="textScroll" class="text-scroll">
    <div ref="content" class="content" :style="contentStyle">
      <!-- 默认插槽，插入滚动内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
  isForceScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'up',
  speed: 60,
  isForceScroll: true,
});

const textScroll = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

const contentStyle = ref({
  '--animation-end': '',
  animation: '',
});

const setScrollAnimation = () => {
  if (!textScroll.value || !content.value) return;

  const textScrollWidth = textScroll.value.offsetWidth,
    textScrollHeight = textScroll.value.offsetHeight,
    contentWidth = content.value.offsetWidth,
    contentHeight = content.value.offsetHeight;

  if (!props.isForceScroll) {
    if (props.direction === 'up' || props.direction === 'down') {
      if (contentHeight <= textScrollHeight) {
        contentStyle.value['--animation-end'] = '';
        contentStyle.value.animation = '';
        return;
      }
    } else {
      if (contentWidth <= textScrollWidth) {
        contentStyle.value['--animation-end'] = '';
        contentStyle.value.animation = '';
        return;
      }
    }
  }

  let scrollLength, time;
  switch (props.direction) {
    case 'up':
      contentStyle.value['--animation-end'] = `-${contentHeight}px`;
      scrollLength = contentHeight + textScrollHeight;
      console.log('🚀 ~ setScrollAnimation ~ scrollLength:', scrollLength);
      time = scrollLength / props.speed;
      contentStyle.value.animation = `up-scroll linear ${time}s infinite`;
      break;
    case 'down':
      contentStyle.value['--animation-end'] = `-${contentHeight}px`;
      scrollLength = contentHeight + textScrollHeight;
      time = scrollLength / props.speed;
      contentStyle.value.animation = `up-scroll linear ${time}s infinite reverse`;
      break;
    case 'left':
      contentStyle.value['--animation-end'] = `-${contentWidth}px`;
      scrollLength = contentWidth + textScrollWidth;
      time = scrollLength / props.speed;
      contentStyle.value.animation = `left-scroll linear ${time}s infinite`;
      break;
    case 'right':
      contentStyle.value['--animation-end'] = `-${contentWidth}px`;
      scrollLength = contentWidth + textScrollWidth;
      time = scrollLength / props.speed;
      contentStyle.value.animation = `left-scroll linear ${time}s infinite reverse`;
      break;
  }
};

onMounted(() => {
  setScrollAnimation();
});

onUpdated(() => {
  setScrollAnimation();
});
</script>

<style scoped lang="scss">
.text-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .content {
    width: fit-content;
    height: fit-content;
    position: absolute;
  }
}
</style>

<style lang="scss">
.text-scroll {
  .content {
    @keyframes up-scroll {
      0% {
        top: 100%;
      }

      100% {
        top: var(--animation-end);
      }
    }

    @keyframes left-scroll {
      0% {
        left: 100%;
      }

      100% {
        left: var(--animation-end);
      }
    }
  }
}
</style>
