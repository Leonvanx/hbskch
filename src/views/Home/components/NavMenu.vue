<!--
  功能：导航栏
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
  <div class="nav-menu-wrapper flex-row">
    <!-- 主菜单 -->
    <div
      v-for="item in menuList"
      :key="item.id"
      class="nav-menu-item"
      @mouseenter="showSubMenu(item.id)"
      @mouseleave="hideSubMenu(item.id)"
    >
      <div :class="{ 'menu-name': item.name !== '首页' }" @click="clickMainMenu(item.name)">
        {{ item.name }}
      </div>
      <!-- 使用 transition 组件添加淡入淡出动画 -->
      <transition name="sub-menu-fade">
        <div
          v-if="showingSubMenus[item.id] && item.children && item.children.length > 0"
          class="sub-menu"
        >
          <div
            v-for="subItem in item.children"
            :key="subItem.id"
            class="sub-menu-item"
            v-on:click="clickSubMenu(subItem.id, subItem.name)"
          >
            {{ subItem.name }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchMenu } from '@/apis';
import type { Menu } from '@/types';
import { useRouter } from 'vue-router';

const router = useRouter();

type NewType = Menu;

const menuList = ref<NewType[]>([]);
const searchMenuList = async () => {
  const res = await searchMenu();
  if (res.code === 0) {
    menuList.value = res.data || [];
  }
};

// 用于记录每个主菜单对应的子菜单是否显示
const showingSubMenus = ref<Record<number, boolean>>({});

// 显示子菜单
const showSubMenu = (id: number) => {
  showingSubMenus.value[id] = true;
};

// 隐藏子菜单
const hideSubMenu = (id: number) => {
  showingSubMenus.value[id] = false;
};

// 点击首页
const clickMainMenu = (name?: string) => {
  if (name === '首页')
    router.push({
      name: 'home',
    });
};
// 点击子菜单
const clickSubMenu = (id: number, name?: string) => {
  router.push({
    name: 'subMenuArticleList',
    query: {
      name: name,
      menuId: id,
      searchWord: '',
    },
  });
};
onMounted(() => {
  searchMenuList();
});
</script>

<style scoped lang="scss">
.nav-menu-wrapper {
  background-size: 100% 100%;
  justify-content: flex-end;
  padding-right: 50px;
  gap: 30px;

  .nav-menu-item {
    position: relative;
    color: #1a1a1a;
    font-size: 15px;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    // &:hover {
    //   font-weight: 600;
    // }
    .menu-name:hover {
      animation: 300ms menuRiseAndFall;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 10px;
        background: transparent;
      }
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
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      .sub-menu-item {
        color: #1a1a1a;
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

// @media (max-width: 768px) {
//   // 最后一个子菜单的位置改为屏幕最右侧
//   .nav-menu-wrapper .nav-menu-item:last-child .sub-menu {
//     position: absolute;
//     right: -10px;
//     left: auto;
//     transform: translateY(10px);
//   }
// }

@media (max-width: 1200px) {
  .nav-menu-wrapper {
    .nav-menu {
      width: 100%;
      padding: 14px 20px;
    }
  }
}

/* 定义淡入淡出动画 */
.sub-menu-fade-enter-active,
.sub-menu-fade-leave-active {
  transition: opacity 300ms ease-in;
}

.sub-menu-fade-enter-from,
.sub-menu-fade-leave-to {
  opacity: 0;
}

// 定义主菜单升起再落下的动画
@keyframes menuRiseAndFall {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
