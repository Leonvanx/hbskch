<!--
  功能：友情链接列表
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年05月17日 20:22:22
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="home-bottom">
    <!-- 友情链接 -->
    <div class="contain">
      <div class="footer-cont">
        <ul :class="props.posType === 0 ? 'footer-links-bottom' : 'footer-links-mid'">
          <!-- 友情链接 -->
          <li
            v-for="(item, index) in footerLinks"
            :key="index"
            class="link-one"
            :style="{ backgroundImage: `url(${item.picUrl})` }"
            @click="jumpTo(item.url)"
          >
            <div class="cn-name">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchFriendLink } from '@/apis/admin';
import type { Link } from '@/types';
const footerLinks = ref<Link[]>([]);
type Props = {
  posType: number;
};
const props = defineProps<Props>();
const getLinkList = async () => {
  const res = await searchFriendLink(props.posType);
  if (res.code === 0) {
    footerLinks.value = res.data || [];
  }
};

const jumpTo = (url: string) => {
  window.open(url, '_black');
};
getLinkList();
</script>

<style scoped lang="scss">
.home-bottom {
  flex-shrink: 0;
  background-size: cover;
  font-size: 14px;
  line-height: 1.5;
}
.contain {
  padding: 0 20px;
  margin: 0 auto;
}
.footer-cont {
  padding: 30px 0 0 0;
}
.footer-links-mid {
  margin: 0 -16px;
  padding-left: 0;
  padding-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  gap: 8px;
  .link-one {
    margin: 0;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background-size: cover;
    border-radius: 5px;
    color: #fff;
    .cn-name {
      font-size: 18px;
      transition: all 0.3s;
      font-weight: 600;
    }

    &:hover {
      cursor: pointer;
      .cn-name {
        font-size: 20px;
      }
    }
  }
}
.footer-links-bottom {
  margin: 0 -16px;
  padding-left: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  gap: 8px;
  .link-one {
    margin: 0;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background-size: cover;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    .cn-name {
      font-size: 14px;
      transition: all 0.3s;
      font-weight: 600;
    }
    &:hover {
      cursor: pointer;
      .cn-name {
        font-size: 16px;
      }
    }
  }
}

@media (min-width: 430px) {
  .contain {
    width: 80%;
    .link-one {
      width: calc(50% - 4px);
    }
  }
}
@media (min-width: 768px) {
  .contain {
    width: 80%;
    .link-one {
      width: calc(25% - 6px);
    }
  }
}
@media (min-width: 992px) {
  .contain {
    width: 970px;
    .link-one {
      width: calc(25% - 6px);
    }
  }
}
@media (min-width: 1200px) {
  .contain {
    width: 1166px;
    .link-one {
      width: calc(25% - 6px);
    }
  }
}
</style>
