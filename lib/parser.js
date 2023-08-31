"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
const { exec } = require("child_process");
const express = require("express");
const path = require("path");
const { pipeline } = require("stream");
const app = express();
const PrimaryKey = "treeRoot"; //依赖树映 射表的主键
const dependencyTreeMap = new Map(); //依赖树的映射表
/**
 *读取当前目录的package.json
 * @param {string} filename 文件名称
 * @return {*}  {Promise<packageObj>}返回依赖包的Promise
 */
const readPackageJson = (filename) => {
    let path = "./package.json"; //文件路径
    if (filename != PrimaryKey)
        path = `./node_modules/${filename}/package.json`;
    return new Promise((resolve, reject) => {
        //如果文件夹存在就返回文件数据，否则返回空对象
        fs.existsSync(path)
            ? fs.readFile(path, "utf-8", (err, dataStr) => {
                if (err)
                    reject(err);
                resolve(JSON.parse(dataStr || "{}"));
            })
            : resolve({});
    });
};
/**
 * 构建依赖树哈希表结构
 * @param {string} packName 依赖包名称
 * @param {number} [depth] 遍历深度
 */
const buildDependencyMap = (packName, depth) => __awaiter(void 0, void 0, void 0, function* () {
    if (depth != null && depth < 0)
        return;
    if (depth != null && depth >= 0)
        --depth;
    //出现已存在的包时结束递归
    if (dependencyTreeMap.has(packName)) {
        return;
    }
    //获取依赖包文件的数据
    let packageData = (yield readPackageJson(packName));
    //如果返回的对象为空则结束
    if (Object.keys(packageData).length == 0)
        return;
    //获取依赖包数据的dependencies数组
    let dependencies = Array.from(Object.keys(packageData.dependencies || {}));
    //构建哈希表
    dependencyTreeMap.set(packName, {
        name: PrimaryKey == packName ? PrimaryKey : packageData.name,
        version: packageData.version,
        description: packageData.description,
        dependencies: dependencies,
    });
    //遍历dependencies数组进行递归构建
    for (let packName of dependencies)
        yield buildDependencyMap(packName, depth);
});
/**
 *依赖树解析器
 * @param {number} [depth] 层次深度
 */
const dependencyTreeParser = (depth) => __awaiter(void 0, void 0, void 0, function* () {
    clearDependenceTreeMap();
    yield buildDependencyMap(PrimaryKey, depth);
    yield saveDependencyTreeJson("/dist/test", true);
    const staticPath = path.join(__dirname.replace(/\\src|\\lib/g, ""), "dist");
    app.use(express.static(staticPath)).listen(8243, () => {
        exec("start http://127.0.0.1:8243");
    });
});
/**
 * 获取依赖树哈希表数据
 * @return {*} 返回依赖树哈希表数据
 */
const getDependenceTreeMap = () => {
    return dependencyTreeMap;
};
/**
 * 初始化依赖树哈希表数据
 */
const clearDependenceTreeMap = () => {
    dependencyTreeMap.clear();
};
/**
 * 将依赖关系以json形式存储到指定文件
 * @param {string} targetPath 目标文件路径
 * @param {boolean} saveCurrent 是否是保存当前分析的数据
 * @return {*} 返回字符串
 */
const saveDependencyTreeJson = (targetPath, saveCurrent = false) => {
    // 处理获取到的目标路径
    if (!targetPath.endsWith(".json"))
        targetPath += ".json";
    if (saveCurrent) {
        targetPath = `${__dirname.replace(/\\src|\\lib/g, "")}${targetPath}`;
        let json = Object.fromEntries(getDependenceTreeMap()); //将哈希表解析成json
        return new Promise((resolve, reject) => {
            fs.writeFile(targetPath, JSON.stringify(json), (err) => {
                if (err)
                    reject(err);
                resolve("写入成功");
            });
        });
    }
    else {
        let sourcePath = `${__dirname.replace(/\\src|\\lib/g, "")}${"/dist/test.json"}`;
        const sourceFile = path.resolve(sourcePath);
        if (targetPath.startsWith("/"))
            targetPath = targetPath.slice(1);
        return new Promise((resolve, reject) => {
            // 检查源文件的状态
            fs.stat(sourceFile, (error, stats) => {
                // 判断源文件内容是否为空
                if (error) {
                    reject("当前没有数据，请执行analyze命令！");
                }
                else {
                    pipeline(fs.createReadStream(sourceFile), fs.createWriteStream(targetPath), (error) => {
                        if (error) {
                            reject("文件保存出错!");
                        }
                        else {
                            resolve("文件已成功保存");
                        }
                    });
                }
            });
        });
    }
};
//导出模块
module.exports = {
    dependencyTreeParser,
    clearDependenceTreeMap,
    getDependenceTreeMap,
    saveDependencyTreeJson,
};
//# sourceMappingURL=parser.js.map