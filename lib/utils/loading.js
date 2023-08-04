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
const Chalk = require('chalk');
const ora = require('ora');
const parser = require("../parser");
/**
 * 睡觉函数
 * @param delay 睡眠时间
 * @returns
 * @description:测试用
 */
const sleep = (delay, num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            parser.dependencyTreeParser(num);
            resolve(false);
        }, delay);
    });
};
/**
 * 加载函数
 */
const loading = (num) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora({
        text: `${Chalk.blueBright('Loading...')}`,
        spinner: 'earth'
    });
    spinner.start(); // 开启加载
    try {
        const res = yield sleep(1500, num);
        spinner.succeed('Successful！');
        return res;
    }
    catch (err) {
        spinner.fail('Fail,please try again');
    }
});
module.exports = loading;
//# sourceMappingURL=loading.js.map