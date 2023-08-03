const fs = require("fs");
const { myCache } = require("./cache/index");
const { exec } = require("child_process");
const express = require("express");
const path = require('path');
const app = express();
const PrimaryKey: string = "treeRoot"; //依赖树映射表的主键
// 创建一个新的缓存实例
const dependencyTreeMap: Map<string, dependencyTree> = new Map<
  string,
  dependencyTree
>(); //依赖树的映射表

const cacheTime: number = 3600; //缓存时间

//依赖树
interface dependencyTree {
  name: string; //包名
  dependencies: string[]; //生产依赖包数组
  devDependencies: string[]; //开发依赖包数组
  version: string; //版本
  description: string; //描述
}

//依赖包
interface packageObj {
  [key: string]: string; //动态添加新属性
}

/**
 *读取当前目录的package.json
 * @param {string} filename 文件名称
 * @return {*}  {Promise<packageObj>}返回依赖包的Promise
 */
const readPackageJson = (filename: string): Promise<packageObj> => {
  let path = "./package.json"; //文件路径
  if (filename != PrimaryKey) path = `./node_modules/${filename}/package.json`;
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err: Error, dataStr: string) => {
      if (err) reject(err);
      resolve(JSON.parse(dataStr || "{}"));
    });
  });
};

/**
 * 构建依赖树哈希表结构
 * @param {string} packName 依赖包名称
 */
const buildDependencyMap = async (packName: string, depth?: number) => {
  if (depth != null && depth < 0) return;
  if (depth != null && depth >= 0) --depth;
  //出现已存在的包时结束递归
  if (dependencyTreeMap.has(packName)) {
    // console.log("------------------------error--------------------------");
    // console.log(`已存在包${packName}`);
    // console.log("------------------------error--------------------------");
    return;
  }
  //获取依赖包文件的数据
  let packageData: packageObj = (await readPackageJson(packName)) as packageObj;
  // if (packName != PrimaryKey) console.log(`包${packName}解析成功!`);
  //获取依赖包数据的dependencies数组
  let dependencies: string[] = Array.from(
    Object.keys(packageData.dependencies || {})
  );

  //获取依赖包数据的devDependencies数组
  let devDependencies: string[] = Array.from(
    Object.keys(packageData.devDependencies || {})
  );
  //构建哈希表
  dependencyTreeMap.set(packName, {
    name: PrimaryKey == packName ? PrimaryKey : packageData.name,
    version: packageData.version,
    description: packageData.description,
    dependencies: dependencies,
    devDependencies: devDependencies,
  });
  //遍历dependencies数组进行递归构建
  for (let packName of dependencies) await buildDependencyMap(packName, depth);
  if (packName == PrimaryKey) {
    // 遍历devDependencies数组进行递归构建
    for (let packName of devDependencies)
      await buildDependencyMap(packName, depth);
  }
};

/**
 *依赖树解析器
 * @param {number} [depth=1] 层次深度
 */
const dependencyTreeParser = async (depth: number) => {
  clearDependenceTreeMap();
  // console.log("开始解析依赖包······");
  await buildDependencyMap(PrimaryKey, depth);
  myCache.set(PrimaryKey, getDependenceTreeMap(), cacheTime);
  saveDependencyTreeJson("/dist/test", true);
  const staticPath = path.join(__dirname.replace(/\\src|\\lib/g, ""), "dist");
  app.use(express.static(staticPath)).listen(8243, () => {
    exec("start http://127.0.0.1:8243/index.html");
    // console.log("依赖关系图：http://127.0.0.1:8080/index.html");
  });
};

/**
 * 获取依赖树哈希表数据
 * @return {*} 返回依赖树哈希表数据
 */
const getDependenceTreeMap = (): Map<string, dependencyTree> => {
  return dependencyTreeMap;
};

/**
 * 初始化依赖树哈希表数据
 */
const clearDependenceTreeMap = () => {
  dependencyTreeMap.clear();
  if (myCache.has(PrimaryKey)) myCache.del(PrimaryKey);
  // console.log("初始化数据成功！");
};

/**
 * 将依赖关系以json形式存储到指定文件
 * @param {string} path 文件路径
 * @return {*} 返回字符串
 */
const saveDependencyTreeJson = (
  path: string,
  saveCurrent: boolean = false
): string | Promise<string> => {
  if (!myCache.has(PrimaryKey)) return "当前没有数据，请执行analyze命令";
  //将哈希表解析成json
  let json = Object.fromEntries(myCache.get(PrimaryKey));
  //如果没有.json后缀就加上去
  if (!/\.json$/.test(path)) path = path + ".json";
  if (saveCurrent) path = __dirname.replace(/\\src|\\lib/g, "") + path;
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(json), (err: Error) => {
      if (err) reject(err);
      resolve("写入成功");
    });
  });
};
//导出模块
module.exports = {
  dependencyTreeParser,
  clearDependenceTreeMap,
  getDependenceTreeMap,
  saveDependencyTreeJson,
};