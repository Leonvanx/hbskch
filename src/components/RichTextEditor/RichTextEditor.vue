<!--
  功能：子页面富文本编辑
  作者：renzj
  邮箱：591738878@qq.com
  时间：2025年04月08日 22:34:00
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div ref="divRef" style="height: 600px" />
</template>

<script setup lang="ts">
import { AiEditor } from 'aieditor';
import 'aieditor/dist/style.css';
const divRef = ref<Element | null>(null);
let aiEditor: AiEditor | null = null;

type Props = {
  content?: string;
};
const props = defineProps<Props>();

const getContent = () => {
  return aiEditor?.getHtml();
};
defineExpose({ getContent });
onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: props.content,
    image: {
      allowBase64: false,
      defaultSize: 350,
      uploadUrl: 'https://your-domain/image/upload',
      uploadFormName: 'image', //上传时的文件表单名称
      uploadHeaders: {
        jwt: 'xxxxx',
        other: 'xxxx',
      },
      // uploader: (file, uploadUrl, headers, formName) => {
      //   //可自定义图片上传逻辑
      // },
      // uploaderEvent: {
      //   onUploadBefore: (file, uploadUrl, headers) => {
      //     //监听图片上传之前，此方法可以不用回任何内容，但若返回 false，则终止上传
      //   },
      //   onSuccess: (file, response) => {
      //     //监听图片上传成功
      //     //注意：
      //     // 1、如果此方法返回 false，则图片不会被插入到编辑器
      //     // 2、可以在这里返回一个新的 json 给编辑器
      //   },
      //   onFailed: (file, response) => {
      //     //监听图片上传失败，或者返回的 json 信息不正确
      //   },
      //   onError: (file, error) => {
      //     //监听图片上传错误，比如网络超时等
      //   },
      // },
      bubbleMenuItems: ['AlignLeft', 'AlignCenter', 'AlignRight', 'delete'],
    },
  });
});
onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy();
  }
});
</script>

<style scoped lang="scss"></style>
