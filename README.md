# DDC CLI

> 基于叮当码教学平台前端项目搭建得一个脚手架,用于快速构建符合公司业务得项目

## 安装

> 切换到公司内部镜像源(镜像源地址：http://171.217.71.138:4873/) nrm use dingdangcode. 使用私有 npm 仓库进行安装

```console
$ npm install ddc-cli -g
```

## 快速使用

```console
$ ddc create ddc-base <project-name>
$ cd <project-name>
$ npm install
$ npm run start
```

## 常用命令

> 命令是快速创建项目得方法之一

- -t | --template `<template-name>`

  > 选择模板 `simple | master | sk`

  > 使用方式 `$ ddc create ddc-base <project-name> -t simple`

- -d （待开发）

- -s（待开发）

- -p（待开发）

## 常用选项

> 构建项目的时候，需要根据命令项来输入

- 项目名称 `<project-name>`
- 项目描述 `<project-description>`
- 项目创建者 `<project-author>`
- 项目模板 `simple | master | sk`

## [更改日志](./CHANGELOG.md)
