/**
 * 定义cli对help和verson命令的处理逻辑
 * @param program 命令行程序对象
 */
const help = (program: { version: (arg0: string) => void }) => {
    program.version('1.0.0')
}

module.exports = help

