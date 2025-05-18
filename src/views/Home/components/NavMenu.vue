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
  <!-- 桌面端菜单 -->
  <div v-if="!isMobile" class="nav-menu-wrapper">
    <div class="flex-row align-center" style="gap: 30px; flex-shrink: 0">
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
              v-on:click="clickSubMenu(subItem.id, subItem.name, item.name)"
            >
              {{ subItem.name }}
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="search-wrapper flex-row align-center">
      <!-- <transition name="search-slide"> -->
      <n-input
        ref="target"
        v-model:value="searchValue"
        round
        class="search-input"
        size="large"
        placeholder="请输入关键字"
        @keydown.enter="searchArticle()"
      >
        <template #suffix>
          <i-mdi-search
            class="pointer"
            style="font-size: 1.5rem; color: #fff; margin-left: 8px"
            @click="searchArticle()"
          />
          <!-- <span class="search-suffix-btn" @click="searchArticle()">搜一下</span> -->
        </template>
      </n-input>
      <!-- </transition> -->
    </div>
  </div>
  <template v-else>
    <div v-if="isMobile" class="mobile-menu-btn">
      <img src="@/assets/icons/menu-mobile.svg" class="menu-svg" @click="showDrawer = true" />
    </div>
    <n-drawer v-model:show="showDrawer" placement="top">
      <n-drawer-content>
        <div class="mobile-menu flex-row align-center">
          <n-icon size="18">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z"
                fill="currentColor"
              ></path>
            </svg>
          </n-icon>
          <span style="margin-left: 5px" @click="clickMainMenu('首页')">首页</span>
        </div>
        <n-collapse default-expanded-names="1" accordion class="mobile-menu-wrapper">
          <n-collapse-item
            v-for="item in menuList.slice(1)"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >
            <div class="sub-menu-wrapper flex-column gap">
              <div
                v-for="subItem in item.children"
                :key="subItem.id"
                class="mobile-sub-menu-item"
                @click="clickSubMenu(subItem.id, subItem.name)"
              >
                {{ subItem.name }}
              </div>
            </div>
          </n-collapse-item>
        </n-collapse>
      </n-drawer-content>
    </n-drawer>
  </template>
</template>

<script setup lang="ts">
import { searchMenu } from '@/apis';
import type { Menu } from '@/types';
import { useRouter } from 'vue-router';

const router = useRouter();
const { width } = useWindowSize();
const isMobile = computed(() => {
  const userAgent = navigator.userAgent;
  const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  for (let i = 0; i < mobileAgents.length; i++) {
    if (userAgent.indexOf(mobileAgents[i]) > -1) {
      return true;
    }
  }
  return width.value < 768;
});

const showDrawer = ref(false);

const menuList = ref<Menu[]>([]);
const searchMenuList = async () => {
  const res = await searchMenu();
  if (res.code === 0) {
    menuList.value = res.data || [];
  }
};

const searchValue = ref('');

const showSearchInput = ref(false);

const target = useTemplateRef<HTMLElement>('target');
onClickOutside(target, () => (showSearchInput.value = false));

const searchArticle = () => {
  router.push({
    name: 'subMenuArticleList',
    query: {
      meunId: 0,
      searchWord: searchValue.value,
    },
  });
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
  if (name === '首页') {
    if (isMobile.value) {
      showDrawer.value = false;
    }
    router.push({
      name: 'home',
    });
  }
};
// 点击子菜单
const clickSubMenu = (id: number, name?: string, parentMenuName?: string) => {
  showDrawer.value = false;
  router.push({
    name: 'subMenuArticleList',
    query: {
      parentMenuName: parentMenuName,
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
  width: 100%;
  padding: 10px 300px 10px 60px;
  background-size: 100% 100%;
  background-color: #1f4d83;
  position: relative;
  height: fit-content;
  .nav-menu-item {
    position: relative;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.3s;
    &::before {
      position: absolute;
      width: 100%;
      height: 20px;
      content: '';
      left: 0;
      top: 100%;
      background-color: transparent;
    }
    &::after {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 100%);
      height: 2px;
      width: 0%;
      transition: width 0.3s;
      content: '';
      background-color: #fff;
    }
    &:hover {
      font-size: 16px;
      font-weight: 600;
      &::after {
        width: 100%;
      }
    }

    .sub-menu {
      box-sizing: content-box;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      min-width: 150px;
      z-index: 1000;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      background-color: #1f4d83;
    }
    &:first-child .sub-menu {
      left: 60%;
    }

    .sub-menu-item {
      padding: 8px 12px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      position: relative;
      &::after {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, -100%);
        height: 2px;
        width: 0%;
        transition: width 0.3s;
        content: '';
        background-color: #fff;
      }
      &:hover {
        font-weight: 600;
        &::after {
          width: 90%;
        }
      }
    }
  }
  .search-wrapper {
    position: absolute;
    right: 30px;
    top: 10px;
    .search-icon {
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
    .search-input {
      width: 260px;
      background-color: #4c719c;
      .search-suffix-btn {
        cursor: pointer;
        color: #fff;
      }
      :deep(.n-input__placeholder) {
        color: #fff;
      }
      :deep(.n-input__input-el) {
        color: #fff;
      }
    }
  }
}

.mobile-menu-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1000;
  cursor: pointer;
  .menu-svg {
    width: 35px;
    height: 35px;
  }
}
.mobile-menu {
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #efeff5;
  .mobile-menu-svg {
    width: 18px;
    height: 18px;
  }
}
.mobile-menu-wrapper {
  :deep(.n-collapse-item__header-main) {
    font-size: 16px;
  }
  .mobile-sub-menu-item {
    font-size: 14px;
    color: #1a1a1a;
    margin-left: 22px;
  }
}

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

/* 定义搜索框滑动动画 */
.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 300ms ease;
}

.search-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.search-slide-leave-to {
  transform: translateX(100%);
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
