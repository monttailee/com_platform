## 名称：基于lerna的组件开发项目

### 简介
   该项目采用 monorepos 的组织方式，使用 lerna 进行多包管理，采用集中编译，单独发布的流程。

### 技术栈
   typescript + react + lerna + rollup + storybook + jest + prettier + eslint

### 操作流程
   组件开发 --> 编译[单个package/多个package] || *单元测试 || storybook  --> 发布
 
### 常用命令
   一些lerna常用操作命令:
   ##### 初始化
   lerna init

   ##### 创建新的package
   lerna create

   ##### 依赖安装
   *   yarn install  批量安装
   *   lerna add * [--dev]  单个安装(相当于yarn add || npm install)
   *   lerna add @montai/com --scope=@montai/bus  内部模块之间添加依赖时，模块名一定是package的name
   *   **我们使用了yarn workspace，所以就不要再设置bootstrap的hoist属性了，两者功能重叠，都设置了会报错的，目的都是在根目录维护一个公用node_modules**

   ##### 执行命令语句
   *   lerna run --scope package1 test  //只执行package1中的test
   *   lerna exec -- ***

   ##### 清空各个package的node_modules
   lerna clean

   ##### 发布
   *   lerna publish
   *   **单个发布用： npm publish --access=public**

   ##### 版本信息
   lerna ls --ndjson 输出所有package名称/版本/位置

   ##### 自动更新包的依赖
   lerna bootstrap

   #### storybook
   yarn run storybook

   ### 疑点解析
   *   storybook是独立工作的，单独起服务，单独编译
   *   本项目采用【集中编译，按需发布(单独发布或批量发布)】
   *   根目录的package.json有private属性说明它是私有的只负责项目管理不会被发布，与其他要发布的package不同
   *   根目录的package.json添加workspaces属性，让所有依赖全部都在根目录的node_modules维护，除了可执行文件(package.json)
   *   lerna有两种版本管理模式，本项目采用默认的同一版本号
   *   *[package-scripts + tsconfig]原则上应该配置在每个package目录下，本项目提取到了根目录，因为tsconfig变化不大，package-scripts可以编写不同的命令语句，效果一致即可*
