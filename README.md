## 名称：基于lerna的组件开发项目

### 为什么用lerna
   lerna基于npm scripts，提供了包的版本管理，快速发布npm等

### 技术栈
    lerna + storybook + rollup + typescript + jest

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
