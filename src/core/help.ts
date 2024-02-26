import chalk from 'chalk';
import { Command } from 'commander'; // ts类型
// import fs from 'fs';
// import path from 'path';

const BRAND_LOGO: string = `
██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗   ██╗  ████████╗██████╗ ███████╗███████╗     ██████╗██╗     ██╗
██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝╚██╗ ██╔╝  ╚══██╔══╝██╔══██╗██╔════╝██╔════╝    ██╔════╝██║     ██║
██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║      ╚████╔╝█████╗██║   ██████╔╝█████╗  █████╗█████╗██║     ██║     ██║
██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║       ╚██╔╝ ╚════╝██║   ██╔══██╗██╔══╝  ██╔══╝╚════╝██║     ██║     ██║
██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗   ██║        ██║   ██║  ██║███████╗███████╗    ╚██████╗███████╗██║
╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝╚══════╝╚═╝
`
/** 获取VERSION */
// const getVersion = async (): Promise<string> => {
//     // 读取最外层目录中的 package.json 文件
//     const packageJsonPath = path.resolve(__dirname, '../../package.json');
//     return new Promise((resolve, reject) => {
//         // 根据package.json中的version自动更新VERSION字段
//         fs.readFile(packageJsonPath, 'utf8', (err, data) => {
//             if (err) {
//                 reject(err);
//             }else {
//                  // 解析 JSON 数据
//                 const packageJson = JSON.parse(data);
//                 resolve(packageJson.version || '');
//             }
//         });
//     })
// }

/**
 * 定义cli对help和verson命令的处理逻辑
 * @param program 命令行程序对象
 */
const help = async(program: Command) => {
    program.name(chalk.cyan('✨ dependency-tree-cli')).usage(`${chalk.blueBright('<command>')} ${chalk.yellow('[options]')}`)
    // let VERSION = await getVersion();
    program.version(
        `\r\n  ${chalk.blueBright.bold(require('../../package.json').version)}
        ${chalk.blueBright.bold(BRAND_LOGO)}`
    )
}

export default help

