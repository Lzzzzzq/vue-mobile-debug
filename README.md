# vue-mobile-debug

基于 vue 的移动端调试小工具

## 功能

* 移动端模拟 console 信息
* 一键清理 cookies、localstorage，刷新页面
* 显示 cookies、localstorage
* 显示页面性能数据

## 安装

```js
npm install --save vue-mobile-debug
// or
cnpm install --save vue-mobile-debug
// or
yarn add vue-mobile-debug
```

## demo

```js
git clone https://github.com/Lzzzzzq/vue-mobile-debug.git

cd vue-mobile-debug

npm install

npm run dev
```

## 使用

```js
// 引入插件

import VueMobileDebug from 'vue-mobile-debug'

Vue.use(VueMobileDebug, true)

// 第二个参数代表是否显示，测试环境时打开即可
```
```js
// 使用

// this 指向为 vue component

// 输出到工具的控制台

this.$log('normal')
this.$err('error')
```

## 效果

![example图片示例][1]


[1]: http://7xt9bz.com2.z0.glb.clouddn.com/vue-mobile-debug2.png