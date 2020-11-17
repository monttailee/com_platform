## 名称：基于lerna的组件开发项目

### 简介
   该项目采用 monorepos 的组织方式，使用 lerna 进行多包管理，采用集中编译，单独发布的流程。

### 技术栈
    lerna + storybook + rollup + typescript + react + jest + prettier + eslint

### 功能
   组件开发
   组件发布
   组件测试
   规范开发
   typescript

### 功能划分
   基础组件
   业务组件
   工具组件

### 常用命令
   lerna init  初始化
   lerna create  添加package
   lerna bootstrap  安装各page依赖
   lerna clean 清空各个page的node_modules  --不保留各个page的nm，统一在根目录维护一个nm

   yarn add @storybook/react --dev


   npm i -g @storybook/cli
   getstorybook
   yarn run storybook

   npm publish  发布

### 疑点解析
   storybook是独立工作的，单独起服务，单独编译...
   打包用rollup
   所谓【集中编译，单独发布】是指编译的功能提取到根目录执行，npm发布的时候切入到组件目录执行发布命令