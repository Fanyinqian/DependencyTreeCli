const Chalk = require('chalk')
const ora = require('ora')
const parser = require("../parser");

/**
 * 睡觉函数
 * @param delay 睡眠时间
 * @returns 
 * @description:测试用
 */
const sleep = (delay: number,num:number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            parser.dependencyTreeParser(num);
            resolve(false)
        }, delay);
    });
};


/**
 * 加载函数
 */
const loading = async (num:number) => {
    const spinner = ora({
        text: `${Chalk.blueBright('Loading...')}`,
        spinner: 'earth'
    })
    
    spinner.start(); // 开启加载

    try {
        const res = await sleep(1500,num)
        spinner.succeed('Successful！')
        return res
    }catch (err) {
        spinner.fail('Fail,please try again')
    }
}

module.exports = loading