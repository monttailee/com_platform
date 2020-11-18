## 名称：基于lerna的组件开发项目

### 简介
   该项目采用 monorepos 的组织方式，使用 lerna 进行多包管理，采用集中编译，单独发布的流程。

### 技术栈
   lerna + storybook + rollup + typescript + react + jest + prettier + eslint

### 操作流程
   组件开发 --> *单元测试 || storybook || 编译 --> 发布
 
### 常用命令
   #### lerna
   lerna init  初始化
   lerna create  创建新的package
   lerna add * --scope=package1 --dev  添加依赖
   lerna run --scope package1 test
   lerna bootstrap  安装各package依赖
   lerna clean 清空各个package的node_modules
   lerna ls --ndjson 输出所有package名称/版本/位置
   lerna exec -- ***  执行命令语句
   lerna publish 发布(npm publish)

   #### storybook
   yarn run storybook

### 疑点解析
   storybook是独立工作的，单独起服务，单独编译
   所谓【集中编译，单独发布】是指编译的功能提取到根目录执行，npm发布的时候切入到组件目录执行发布命令
   根目录的package.json有private属性说明它是私有的只负责项目管理不会被发布，与其他要发布的package不同
   根目录的package.json添加workspaces属性，让所有依赖全部都在根目录的node_modules维护，除了可执行文件(package.json)
   lerna有两种版本管理模式，本项目采用默认的同一版本号