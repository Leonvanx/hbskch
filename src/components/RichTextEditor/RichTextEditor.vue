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
  <div ref="divRef" style="height: 600px">
    <!-- <div class="aie-container">
        <div class="aie-container-header" style="display: none;"></div>
        <div class="aie-container-main"></div>
        <div class="aie-container-footer" style="display: none;"></div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { AiEditor } from 'aieditor';
import 'aieditor/dist/style.css';
const divRef = ref<Element | null>(null);
let aiEditor: AiEditor | null = null;
const token = sessionStorage.getItem('token');
type Props = {
  content?: string;
};
const props = defineProps<Props>();
const replaceSpacesInP = (html: string) => {
  /**
   * 替换指定标签内所有文本节点中的空格为不换行空格
   * @param html 输入的HTML字符串
   * @returns 处理后的HTML字符串
   */
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  // 查找所有 p 和 h1~h6 标签
  const nodes = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
  nodes.forEach((node) => {
    // 递归替换当前节点及其所有子节点中的文本节点空格
    const replaceSpacesInTextNodes = (element: Node) => {
      element.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent) {
          child.textContent = child.textContent.replace(/ /g, '\u00a0');
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          replaceSpacesInTextNodes(child);
        }
      });
    };
    replaceSpacesInTextNodes(node);
  });
  return doc.body.innerHTML;
};
const getContent = () => {
  return replaceSpacesInP(aiEditor!.getHtml());
};
defineExpose({ getContent });
onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: props.content,
    fontFamily: {
      values: [
        { name: '宋体', value: 'FZST' },
        { name: '黑体', value: 'FZHT' },
        { name: '楷体', value: 'FZKT' },
        { name: '仿宋', value: 'FZFS' },
        { name: '仿宋GBK', value: 'FZFSGBK' },
      ],
    },
    fontSize: {
      values: [
        { name: '初号', value: 56 },
        { name: '小初', value: 48 },
        { name: '一号', value: 34.7 },
        { name: '小一', value: 32 },
        { name: '二号', value: 29.3 },
        { name: '小二', value: 24 },
        { name: '三号', value: 21.3 },
        { name: '小三', value: 20 },
        { name: '四号', value: 18.7 },
        { name: '小四', value: 16 },
        { name: '五号', value: 14 },
        { name: '小五', value: 12 },
      ],
    },
    image: {
      allowBase64: false,
      defaultSize: 350,
      uploadUrl: `${import.meta.env.VITE_BASEURL}/tech/files/upload`,
      uploadFormName: 'image', //上传时的文件表单名称
      uploadHeaders: {
        jwt: 'xxxxx',
        other: 'xxxx',
        Authorization: `Bearer ${token}`,
      },
      uploader: (
        file: File,
        uploadUrl: string,
        headers: Record<string, string>,
        formName: string,
      ): Promise<Record<string, string>> => {
        console.log(formName);
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {
          fetch(uploadUrl, {
            method: 'post',
            headers: { Accept: 'application/json', ...headers },
            body: formData,
          })
            .then((resp) => resp.json())
            .then((json) => {
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      uploaderEvent: {
        // onUploadBefore: (file, uploadUrl, headers) => {
        //   //监听图片上传之前，此方法可以不用回任何内容，但若返回 false，则终止上传
        // },
        onSuccess: (file, response) => {
          //监听图片上传成功
          //注意：
          // 1、如果此方法返回 false，则图片不会被插入到编辑器
          // 2、可以在这里返回一个新的 json 给编辑器
          if (response.message === '文件上传成功' && response.url) {
            return {
              errorCode: 0,
              data: {
                src: response.url,
                alt: file.name,
              },
            };
          } else {
            return false;
          }
        },
      },
      bubbleMenuItems: ['AlignLeft', 'AlignCenter', 'AlignRight', 'delete'],
    },
    video: {
      uploadUrl: `${import.meta.env.VITE_BASEURL}/tech/files/upload`,
      uploadFormName: 'image', //上传时的文件表单名称
      uploadHeaders: {
        jwt: 'xxxxx',
        other: 'xxxx',
        Authorization: `Bearer ${token}`,
      },
      uploader: (
        file: File,
        uploadUrl: string,
        headers: Record<string, string>,
        formName: string,
      ): Promise<Record<string, string>> => {
        console.log(formName);
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {
          fetch(uploadUrl, {
            method: 'post',
            headers: { Accept: 'application/json', ...headers },
            body: formData,
          })
            .then((resp) => resp.json())
            .then((json) => {
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      uploaderEvent: {
        // onUploadBefore: (file, uploadUrl, headers) => {
        //   //监听视频上传之前，此方法可以不用回任何内容，但若返回 false，则终止上传
        // },
        onSuccess: (file, response) => {
          //监听视频上传成功
          //注意：
          // 1、如果此方法返回 false，则视频不会被插入到编辑器
          // 2、可以在这里返回一个新的 json 给编辑器
          if (response.message === '文件上传成功' && response.url) {
            return {
              errorCode: 0,
              data: {
                src: response.url,
                poster: file.name,
              },
            };
          } else {
            return false;
          }
        },
      },
    },
    attachment: {
      uploadUrl: `${import.meta.env.VITE_BASEURL}/tech/files/upload`,
      uploadFormName: 'attachment', //上传时的文件表单名称
      uploadHeaders: {
        jwt: 'xxxxx',
        other: 'xxxx',
        Authorization: `Bearer ${token}`,
      },
      uploader: (
        file: File,
        uploadUrl: string,
        headers: Record<string, string>,
        formName: string,
      ): Promise<Record<string, string>> => {
        console.log(formName);
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {
          fetch(uploadUrl, {
            method: 'post',
            headers: { Accept: 'application/json', ...headers },
            body: formData,
          })
            .then((resp) => resp.json())
            .then((json) => {
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      uploaderEvent: {
        // onUploadBefore: (file, uploadUrl, headers) => {
        //   //监听视频上传之前，此方法可以不用回任何内容，但若返回 false，则终止上传
        // },
        onSuccess: (file, response) => {
          //监听视频上传成功
          //注意：
          // 1、如果此方法返回 false，则视频不会被插入到编辑器
          // 2、可以在这里返回一个新的 json 给编辑器
          if (response.message === '文件上传成功' && response.url) {
            return {
              errorCode: 0,
              data: {
                href: response.url,
                fileName: file.name,
              },
            };
          } else {
            return false;
          }
        },
      },
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
