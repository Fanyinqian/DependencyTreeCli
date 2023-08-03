//@ts-ignore
const chalk = require('chalk')
const VERSION:string = '1.0.0'
const BRAND_LOGO:string = `
██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗   ██╗  ████████╗██████╗ ███████╗███████╗     ██████╗██╗     ██╗
██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝╚██╗ ██╔╝  ╚══██╔══╝██╔══██╗██╔════╝██╔════╝    ██╔════╝██║     ██║
██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║      ╚████╔╝█████╗██║   ██████╔╝█████╗  █████╗█████╗██║     ██║     ██║
██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║       ╚██╔╝ ╚════╝██║   ██╔══██╗██╔══╝  ██╔══╝╚════╝██║     ██║     ██║
██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗   ██║        ██║   ██║  ██║███████╗███████╗    ╚██████╗███████╗██║
╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝╚══════╝╚═╝
`

/**
 * 定义cli对help和verson命令的处理逻辑
 * @param program 命令行程序对象
 */
const help = (program: { name: (arg0: any) => { (): any; new(): any; usage: { (arg0: string): void; new(): any; }; }; version: (arg0: string) => void; }) => { 
    
    program.name(chalk.cyan('✨ dependency-tree-cli')).usage(`${chalk.blueBright('<command>')} ${chalk.yellow('[options]')}`)
    program.version(
        `\r\n  ${chalk.blueBright.bold(VERSION)}
        ${chalk.blueBright.bold(BRAND_LOGO)}`
    )
}

module.exports = help

