const action = require('./action')
interface Program {
  command: (arg0: string) => { (): any; new(): any; alias: { (arg0: string): { (): any; new(): any; description: { (arg0: string): { (): any; new(): any; action: { (arg0: any): void; new(): any } }; new(): any } }; new(): any }; description: { (arg0: string): { (): any; new(): any; action: { (arg0: any): void; new(): any } }; new(): any } }; option: (arg0: string) => { (): any; new(): any; description: { (arg0: string): { (): any; new(): any; action: { (arg0: () => void): void; new(): any } }; new(): any } }
}

/**
 * 定义cli支持的命令
 * @param program 命令行程序对象
 * @description json存储命令还未拆分情况
 */
const commander = (program: Program) => {
  program.command('analyze').alias('ana').description('解析依赖关系').action(action.analyze)

  // 检查命令行是否有参数，没有则跳过去执行 program.usage
  if (process.argv[2]) {
    program.option('-d,--depth [n]').description('限制向下递归分析的层次深度').action(() => {action.depth(process.argv) })
    // 防止下面的 option 覆盖上面的 
    process.argv[2].includes('j') && program.option('-j,--json [file-path]').description('以 JSON 形式存储到用户指定的文件').action(action.saveJSON)
  }

}
  module.exports = commander
