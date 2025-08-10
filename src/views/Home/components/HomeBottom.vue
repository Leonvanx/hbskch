<!--
  功能：首页底部
  作者：lvds
  邮箱：disonlv@outlook.com
  时间：2025年04月13日 14:46:24
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class="home-bottom" :style="{ backgroundImage: `url(${searchBt})` }">
    <!-- 三部分，友情链接，二维码，详细信息，底部说明 -->
    <div class="contain">
      <div class="footer-cont">
        <ul class="footer-links">
          <!-- 友情链接 -->
          <li v-for="(item, index) in footerLinks" :key="index" class="link-one">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </li>
        </ul>
        <div class="footer-info">
          <!--二维码，注册信息，联系方式 -->
          <div class="footer-pic">
            <!-- 二维码 -->
            <img :src="qrCode" alt="二维码" title="联系我们" />
          </div>
          <div class="footer-connect">
            <!-- 联系方式 -->
            <div class="connect-left">
              <!-- 第一部分 -->
              <p v-for="text in text1.split('\n')" :key="text" class="connect-one">
                {{ text }}
              </p>
            </div>
            <div class="connect-right">
              <p v-for="text in text2.split('\n')" :key="text" class="connect-one">
                {{ text }}
              </p>
            </div>
          </div>
          <div class="footer-zc">
            <!-- 注册信息 -->
            <div v-for="text in text3.split('\n')" :key="text" class="info-one">
              {{ text }}
            </div>
            <div class="info-one">
              <!-- 加一个备案图标 -->
              <img width="15px" src="@/assets/imgs/batb.png" alt="备案图标" />
              <!-- 加一个空格 -->
              &nbsp;
              <a
                href="https://beian.mps.gov.cn/#/query/webSearch?code=42010602005000"
                rel="noreferrer"
                target="_blank"
                >鄂公网安备42010602005000号</a
              >
            </div>
            <div class="info-one" @click="openbeian">鄂ICP备2025115975号-1</div>
          </div>
        </div>
        <div class="footer-tips">
          <span v-for="text in text4.split('\n')" :key="text">
            {{ text }}
          </span>
          <!-- <span>为确保最佳浏览效果，建议您使用最新版Edge浏览器或者Google Chrome浏览器。</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchFriendLink } from '@/apis/admin';
import type { Link } from '@/types';
const footerLinks = ref<Link[]>([]);
type Props = {
  qrCode: string;
  searchBt: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
};
defineProps<Props>();

const getLinkList = async () => {
  const res = await searchFriendLink(0);
  if (res.code === 0) {
    footerLinks.value = res.data || [];
  }
};

const openbeian = () => {
  window.open('https://beian.miit.gov.cn/#/Integrated/index', '_black');
};
getLinkList();
</script>

<style scoped lang="scss">
.home-bottom {
  background-color: #f2f2f2;
  flex-shrink: 0;
  background-size: cover;
  font-size: 14px;
  line-height: 1.5;
  padding-top: 30px;
}
.contain {
  padding: 0 20px;
  margin: 0 auto;
}
.footer-cont {
  padding: 0px 0 48px 0;
}
.footer-links {
  margin: 0 -16px;
  padding-left: 0;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .link-one {
    width: 170px;
    background-color: rgba(255, 255, 255, 0.9);
    margin: 0 16px;
    display: flex;
    align-items: center;
    gap: 3px;
    a {
      text-align: center;
      width: 100%;
      padding: 8px 0;
      height: 100%;
      color: #000000;
      white-space: nowrap;
      text-decoration: none;
      font-size: 14px;
      &:hover {
        color: #181818;
      }
    }
  }
}

.footer-info {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: flex-start;
  .footer-pic {
    width: 100px;
    height: 100px;
    padding: 5px;
    border: 2px solid #ddd;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.footer-connect {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: space-around;
  max-width: 500px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1 1 0;
  }
  p {
    font-size: 12px;
    color: #ffffff;
  }
}
.footer-zc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
  color: #ffffff;
}
.footer-tips {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
  color: #ffffff;
  margin-top: 20px;
  padding: 10px 0;
}

@media (min-width: 430px) {
  .contain {
    width: 80%;
  }
  .footer-info {
    gap: 10px;
  }
}
@media (min-width: 768px) {
  .contain {
    width: 80%;
  }
  .footer-info {
    gap: 40px;
  }
}
@media (min-width: 992px) {
  .contain {
    width: 970px;
  }
  .footer-info {
    gap: 60px;
  }
}
@media (min-width: 1200px) {
  .contain {
    width: 1166px;
  }
  .footer-info {
    gap: 100px;
  }
}
</style>
