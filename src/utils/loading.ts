const Chalk = require('chalk')
const ora = require('ora')

/**
 * 睡觉函数
 * @param delay 睡眠时间
 * @returns 
 * @description:测试用
 */
const sleep = (delay: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(false)
            // reject();
        }, delay);
    });
};


/**
 * 加载函数
 */
const loading = async () => {
    const spinner = ora({
        text: `${Chalk.blueBright('Loading...')}`,
        spinner: 'earth'
    })
    
    spinner.start(); // 开启加载

    try {
        const res = await sleep(5000)

        spinner.succeed('Successful！')
        return res
    }catch (err) {
        spinner.fail('Fail,please try again')
    }
}

module.exports = loading