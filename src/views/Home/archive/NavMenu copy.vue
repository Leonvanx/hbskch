<!--
  功能：导航栏+搜索
  作者：xulf
  邮箱：lvin_xu@outlook.com
  时间：2025年04月12日 15:48:02
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="home-nav-menu" :style="{ backgroundImage: `url(${navMenuBgImgUrl})` }">
    <div class="nav-menu-content">
      <div class="nav-menu-wrapper flex-row justify-between">
        <!-- 主菜单 -->
        <div
          v-for="item in menuList"
          :key="item.id"
          class="nav-menu-item"
          @mouseenter="showSubMenu(item.id)"
          @mouseleave="hideSubMenu(item.id)"
        >
          {{ item.name }}
          <!-- 使用 transition 组件添加淡入淡出动画 -->
          <transition name="sub-menu-fade">
            <div v-if="showingSubMenus[item.id] && item.children.length > 0" class="sub-menu">
              <div v-for="subItem in item.children" :key="subItem.id" class="sub-menu-item">
                {{ subItem.name }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchMenu } from '@/apis';
import type { Menu } from '@/types';
import { ref, onMounted } from 'vue';

const navMenuBgImgUrl = ref('/src/assets/imgs/nav-menu-bg.png');
const menuList = ref<Menu[]>([]);
// 用于记录每个主菜单对应的子菜单是否显示
const showingSubMenus = ref<Record<number, boolean>>({});

const searchMenuList = () => {
  searchMenu().then((res) => {
    if (res.code === 0) {
      menuList.value = res.data || [];
    }
  });
};

// 显示子菜单
const showSubMenu = (id: number) => {
  showingSubMenus.value[id] = true;
};

// 隐藏子菜单
const hideSubMenu = (id: number) => {
  showingSubMenus.value[id] = false;
};

onMounted(() => {
  searchMenuList();
});
</script>

<style scoped lang="scss">
// 定义主菜单升起再落下的动画
@keyframes menuRiseAndFall {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); // 升起 5px，可按需调整
  }
  100% {
    transform: translateY(0);
  }
}

.home-nav-menu {
  width: 100%;
  height: 400px;
  background-size: 100% 100%;
  .nav-menu-content {
    margin: auto;
    width: 1200px;
  }
  .nav-menu-wrapper {
    padding: 14px 0;
    .nav-menu-item {
      position: relative;
      color: #fff;
      font-size: 16px;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      // 添加伪元素覆盖空白区域
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        // 高度与子菜单偏移量相同
        height: 10px;
        background: transparent;
      }
      // 鼠标悬停时应用动画
      .menu-name &:hover {
        animation: menuRiseAndFall 0.5s ease-in-out;
      }

      .sub-menu {
        padding: 8px 12px;
        box-sizing: content-box;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background-color: #fff;
        min-width: 150px;
        z-index: 1000;
        border-radius: 8px;
      }
      .sub-menu-item {
        color: #333;
        padding: 8px 12px;
        text-align: center;
        &:hover {
          border-radius: 8px;
          background-color: #f8f8f8;
        }
      }
    }
  }
}

/* 定义淡入淡出动画 */
.sub-menu-fade-enter-active,
.sub-menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.sub-menu-fade-enter-from,
.sub-menu-fade-leave-to {
  opacity: 0;
}
</style>
