const Chalk = require('chalk')
const ora = require('ora')
const parser = require("../parser");

/**
 * 睡觉函数
 * @param delay 睡眠时间
 * @returns 
 * @description:测试用
 */
const sleep = (delay: number,func: (arg0: any) => void,arg:any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            func(arg)
            // parser.dependencyTreeParser(num);
            resolve(false)
        }, delay);
    });
};


/**
 * 加载函数
 */
const loading = async (arg:number | string) => {
    const spinner = ora({
        text: `${Chalk.blueBright('Loading...')}`,
        spinner: 'earth'
    })
    
    spinner.start(); // 开启加载
    try {
        let res = null
        // 分析依赖 or 查找深度
        if(typeof arg === 'number'|| typeof arg === 'object'){ 
            res = await sleep(1500,parser.dependencyTreeParser,arg)
            spinner.succeed('Successful！')
        // 保存JSON
        }else{  
            res = await sleep(1500,parser.saveDependencyTreeJson,arg)
            spinner.succeed('Save Successful！')
        }
        return res
    }catch (err) {
        spinner.fail('Fail,please try again')
    }
}

module.exports = loading