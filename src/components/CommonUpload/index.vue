<!--
  功能：上传组件
  作者：disonlv
  邮箱：disonlv@outlook.com
  时间：2025年04月12日 15:45:33
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="previewFileList"
    :custom-request="handleCustomRequest"
    list-type="image-card"
    :max="1"
    @preview="handlePreview"
  />
  <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="一张很酷的图片">
    <img :src="previewImageUrl" style="width: 100%" />
  </n-modal>
</template>

<script setup lang="ts">
import type { UploadFileInfo, UploadCustomRequestOptions } from 'naive-ui';
import { uploadFile } from '@/apis';
type Props = {
  fileList?: UploadFileInfo[];
  max: number;
};
const props = defineProps<Props>();

// 展示图片弹窗
const showModal = ref(false);
// 预览图片url
const previewImageUrl = ref('');
// 选择预览的图片
const handlePreview = (file: UploadFileInfo) => {
  const { url } = file;
  previewImageUrl.value = url as string;
  showModal.value = true;
};
const handleCustomRequest = async ({ file }: UploadCustomRequestOptions) => {
  // 上传图片
  const data = await uploadFile({ file: file.file! });
  if (data.url) {
    previewFileList.value.push({
      id: file.id,
      name: '图片预览',
      status: 'finished',
      url: data.url,
    });
  }
};
// 已上传图片列表
const previewFileList = ref<UploadFileInfo[]>([]);
// 监听props.fileList
watch(
  () => props.fileList,
  (newVal) => {
    if (newVal) {
      previewFileList.value = newVal;
    }
  },
);
// 返回一个方法获取url链接给父组件
const getFileList = () => {
  return previewFileList.value;
};
defineExpose({
  getFileList,
});
</script>

<style scoped lang="scss"></style>
