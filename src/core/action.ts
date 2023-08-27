const inquirer = require("inquirer");
const Loading = require("../utils/loading");
const Saving = require("../utils/saving");
// @ts-ignore
const chalk = require("chalk");
const HOST = "8243";

/**
 * 定义cli为命令提供的处理逻辑
 */
const Action = {
  async analyze(num: number) {
    // 分析依赖，生成依赖树..
    const res = await Loading(num);
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
  saveJSON(path: any) {
    let targetPath = path.json;
    if (targetPath === true) {
      inquirer
        .prompt([
          {
            type: "string",
            name: "path",
            message: "请输入要保存的位置路径：",
          },
        ])
        .then(async (save: { path: any }) => {
          console.log("当前保存路径为:", save.path);
          Saving(save.path);
        });
    } else {
      targetPath = targetPath.slice(1, -1);
      console.log("当前保存路径为:", targetPath);
      Saving(targetPath);
    }
  },
};

module.exports = Action;
