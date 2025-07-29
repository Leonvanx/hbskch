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
  <div class="nav-menu-wrapper flex-row align-center">
    <n-scrollbar x-scrollable>
      <div class="nav-menu flex-row align-center">
        <div v-for="item in menuList" :key="item.id" class="nav-menu-item">
          <n-popover
            trigger="hover"
            raw
            :show-arrow="false"
            placement="bottom"
            content-class="sub-menu-popover"
          >
            <template #trigger>
              <div
                :class="{ 'menu-name': item.name !== '首页' }"
                @click="clickMainMenu(item.name, item.id, item.showType)"
              >
                {{ item.name }}
              </div>
            </template>
            <div v-if="item.children && item.children.length > 0" class="sub-menu">
              <div
                v-for="subItem in item.children"
                :key="subItem.id"
                class="sub-menu-item"
                v-on:click="clickSubMenu(subItem.id, subItem.showType, subItem.name, item.name)"
              >
                {{ subItem.name }}
              </div>
            </div>
          </n-popover>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { searchMenu, searchPage } from '@/apis';
import type { Menu, Page } from '@/types';
import { useRouter } from 'vue-router';

const router = useRouter();

const menuList = ref<Menu[]>([]);
const aricle = ref<Page[]>([]);
const searchMenuList = async () => {
  const res = await searchMenu();
  if (res.code === 0) {
    menuList.value = res.data || [];
    // menuList.value.push({
    //   id: 10000,
    //   name: '专家库',
    //   parentId: 0,
    //   menuType: 'main',
    //   fixed: 0,
    //   orderNum: 0,
    //   status: 1,
    //   tabNum: 1,
    //   showType: 1,
    //   children: [],
    // });
  }
};

// 点击首页
const clickMainMenu = (name: string, id: number, showType: number) => {
  if (name === '首页') {
    router.push({
      name: 'home',
    });
  } else if (name === '专家库') {
    //专家库特殊管理
    router.push({
      name: 'expertList',
      query: {
        parentMenuName: name,
        name: name,
        menuId: id,
        searchWord: '',
      },
    });
  } else {
    if (showType === 1) {
      router.push({
        name: 'subMenuArticleList',
        query: {
          parentMenuName: name,
          name: name,
          menuId: id,
          searchWord: '',
        },
      });
    } else if (showType === 2) {
      const params = {
        page: 1,
        size: 10,
        menuId: id,
        searchWord: '',
        publishStatus: 1,
      };
      searchPage(params).then((data) => {
        if (data.code === 0) {
          aricle.value = data.data!.records;
          if (aricle.value.length === 0) {
            return;
          }
          router.push({
            name: 'articleDetail',
            query: {
              id: aricle.value[0].id,
              parentMenuName: name,
              subMenuName: null,
            },
          });
        }
      });
    }
  }
};
// 点击子菜单
const clickSubMenu = (id: number, showType: number, name?: string, parentMenuName?: string) => {
  if (showType === 1) {
    router.push({
      name: 'subMenuArticleList',
      query: {
        parentMenuName: parentMenuName,
        name: name,
        menuId: id,
        searchWord: '',
      },
    });
  } else if (showType === 2) {
    const params = {
      page: 1,
      size: 10,
      menuId: id,
      searchWord: '',
      publishStatus: 1,
    };
    searchPage(params).then((data) => {
      if (data.code === 0) {
        aricle.value = data.data!.records;
        if (aricle.value.length === 0) {
          return;
        }
        router.push({
          name: 'articleDetail',
          query: {
            id: aricle.value[0].id,
            parentMenuName: parentMenuName,
            subMenuName: name,
          },
        });
      }
    });
  }
};
onMounted(() => {
  searchMenuList();
});
</script>

<style scoped lang="scss">
.nav-menu-wrapper {
  width: 100%;
  padding: 10px 60px;
  background-size: 100% 100%;
  background-color: #1f4d83;
  position: relative;
  height: 60px;
  justify-content: space-between;
  gap: 20px;

  .nav-menu {
    gap: 30px;
  }

  .nav-menu-item {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .search-wrapper {
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
      margin-right: 20px;
    }
  }
}
</style>
<style lang="scss">
.sub-menu-popover {
  .sub-menu {
    min-width: 150px;
    z-index: 1000;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    background-color: #1f4d83;
    padding-bottom: 5px;
  }

  .sub-menu-item {
    padding: 8px 12px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    position: relative;
    cursor: pointer;

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
</style>
