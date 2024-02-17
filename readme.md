# 合同管理

## 文件结构

### staticWeb

dist 为前端打包后的文件，需要dist手动搬到koaServer/static下

src 为前端源码

vite.config.ts 为vite配置文件,默认设置开发状态下代理走3000端口

### koaServer

- src 为后端源码

- config 为配置文件

- upload 上传文件地址

- static 前端网页

## 运行

### 开发

```sh
# 前端

cd staticWeb

npm i

npm run dev

# 后端

cd koaServer
# 需先安装typescript和ts-node
npm i -g typescript ts-node

npm i

npm start
```

### 手动打包运行

```sh
cd staticWeb

# 开发完成后编译cd staticWeb

npm run build

# 剪切dist下的内容到后端静态文件夹下
mv -f dist/* ../../koaServer/static/

cd ../koaServer

tsc

node build/index.js
```