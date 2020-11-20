## 名称：基于lerna的组件开发项目

### 简介
   该项目采用 monorepos 的组织方式，使用 lerna 进行多包管理，采用集中编译，单独发布的流程。

### 技术栈
   typescript + react + lerna + rollup + storybook + jest + prettier + eslint

### 操作流程
   组件开发 --> 编译[单个package/多个package] || *单元测试 || storybook  --> 发布
 
### 常用命令
   一些lerna/yarn常用操作命令:
   ##### 初始化
   lerna init

   ##### 创建新的package
   lerna create

   ##### 依赖安装  应用yarn workspace替换lerna部分命令
   *   yarn install  批量安装
   *   lerna add @montai/com [--scope=@montai/bus] [--dev]  内部模块之间添加依赖时，模块名一定是package的name
   *   yarn workspace packageA add/remove packageB [packageC -D]   为 packageA 安装/删除 packageB、C 依赖（注意yarn安装local dependency时，需要指明版本号(暂时有bug)，否则会安装失败）
   *   yarn add/remove typescript -W -D  给root安装/删除typescript
   *   yarn workspaces run add lodash   给所有package安装lodash(不包含root）
   
   *   **我们使用了yarn workspace，所以就不要再设置bootstrap的hoist(仅限npmClient=npm)属性了，两者功能重叠，都设置了会报错的，目的都是在根目录维护一个公用node_modules**

   ##### 执行命令语句
   *   yarn workspaces run *

   ##### 清空各个package的node_modules
   lerna clean || yarn workspaces run clean

   ##### 发布
   *   lerna publish
   *   **单个发布用： npm publish --access=public**

   ##### 版本信息
   lerna ls --ndjson 输出所有package名称/版本/位置

   ##### 代码检测 & 代码美化[eslint + prettier + lint-staged]

   ##### 问询式提交[commitizen + cz-lerna-changelog + commitlint(提交描述信息检测)] 
   yarn run commit

   #### storybook
   yarn run storybook

   ### 疑点解析
   *   storybook是独立工作的，单独起服务，单独编译
   *   本项目采用【集中编译，按需发布(单独发布或批量发布)】
   *   根目录的package.json有private属性说明它是私有的只负责项目管理不会被发布，与其他要发布的package不同
   *   根目录的package.json添加workspaces属性，让所有依赖全部都在根目录的node_modules维护，除了可执行文件(package.json)
   *   lerna有两种版本管理模式，本项目采用默认的同一版本号
   *   *[package-scripts + tsconfig]原则上应该配置在每个package目录下，本项目提取到了根目录，因为tsconfig变化不大，package-scripts可以编写不同的命令语句，效果一致即可*
