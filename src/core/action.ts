const inquirer = require("inquirer");
const Loading = require("../utils/loading");
// @ts-ignore
const chalk = require("chalk");
const HOST = "8243";

/**
 * 格式化路径以 .json 为后缀
 * @param path 文件路径
 * @returns {string} 后缀为 .json 的文件路径
 */
const ensureJsonExtension = (path:string)=>{
  const extension:string = '.json';
  // 检查路径是否已经以.json结尾
  if(!path.endsWith(extension)){
   // 移除可能的现有后缀
   const pathWithoutExtension:string = path.replace(/\.[^/.]+$/, "");

   // 加上 .json 后缀
   path = pathWithoutExtension + extension;
  }
  return path;
}

/**
 * 定义cli为命令提供的处理逻辑
 */
const Action = {
  async analyze(num: number) {
    // 分析依赖，生成依赖树..
    await Loading(num);
    // 打开内置网页
    console.log(
      `${chalk.green.bold("➜")}  Open:  ${chalk.blueBright.bold(
        `http://localhost:${HOST}`
      )}`
    );
    console.log(
      `${chalk.green.bold("➜")}  press  ${chalk.bold(
        `dependecy-tree-cli -h`
      )} to show help`
    );
  },
  async depth(n: Array<string>) {
    const lastElement = n[n.length - 1];
    let depth: number = parseInt(lastElement.charAt(lastElement.length - 1));

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
        .then(async (ans: { depth: any }) => {
          console.log("深度限制为:", ans.depth);
          // 层级深度逻辑代码..
          this.analyze(ans.depth);
        });
    } else {
      console.log("深度限制为:", depth);
      // 层级深度逻辑代码..
      this.analyze(depth);
    }
  },
  async saveJSON(path:Array<string>) { 
    // 判断是否有路径参数
    if (!path[3]) {
      inquirer
        .prompt([
          {
            type: "string",
            name: "path",
            message: "请输入要保存的位置路径：",
          },
        ])
        .then(async (save: { path: string }) => {
          console.log("当前保存路径为:", chalk.yellow.bold(ensureJsonExtension(save.path)));
          // 分析依赖，保存本地文件..
          await Loading(save.path);
        });
    } else {
      // 如果输入的路径不包含 []
      if((!path[path.length-1].includes('['))||(!path[path.length-1].includes(']'))){
        console.log('请按照正确的格式填写文件路径（示例：dependency-tree-cli -j [./test.json]）');
      }else{
        // 去除 []，格式化为以 .json 后缀
        let targetPath = path[path.length-1].replace(/\[|\]/g, "")
        targetPath = ensureJsonExtension(targetPath)
        console.log("当前保存路径为:", chalk.yellow.bold(targetPath));
        await Loading(targetPath)
      }
    }
    
    
    
   
    // console.log(targetPath);
    
   
  },
};

module.exports = Action;
