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
const inquirer = require("inquirer");
const Loading = require("../utils/loading");
// @ts-ignore
const chalk = require("chalk");
const HOST = "8243";
/**
 * 定义cli为命令提供的处理逻辑
 */
const Action = {
    analyze(num) {
        return __awaiter(this, void 0, void 0, function* () {
            // 分析依赖，生成依赖树..
            const res = yield Loading(num);
            // 打开内置网页
            console.log(`${chalk.green.bold("➜")}  Open:  ${chalk.blueBright.bold(`http://localhost:${HOST}`)}`);
            console.log(`${chalk.green.bold("➜")}  press  ${chalk.bold(`dependecy-tree-cli -h`)} to show help`);
        });
    },
    depth(n) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastElement = n[n.length - 1];
            let depth = parseInt(lastElement.charAt(lastElement.length - 1));
            depth = Number.isNaN(depth) ? 0 : depth;
            if (depth === 0) {
                inquirer
                    .prompt([
                    {
                        type: "number",
                        name: "depth",
                        message: "请输入限制向下递归分析的层次深度：",
                    },
                ])
                    .then((ans) => __awaiter(this, void 0, void 0, function* () {
                    console.log("深度限制为:", ans.depth);
                    // 层级深度逻辑代码..
                    this.analyze(ans.depth);
                }));
            }
            else {
                console.log("深度限制为:", depth);
                // 层级深度逻辑代码..
                this.analyze(depth);
            }
        });
    },
    saveJSON() {
        console.log("saveJSON");
    },
};
module.exports = Action;
//# sourceMappingURL=action.js.map