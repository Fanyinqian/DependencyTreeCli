const CHALK = require("chalk");
const ORA = require("ora");
const PARSER = require("../parser");

/**
 * 加载函数
 */
const saving = async (path: any) => {
  const spinner = ORA({
    text: `${CHALK.blueBright("Saving...")}`,
    spinner: "earth",
  });

  spinner.start(); // 开启加载

  try {
    await (() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let res = PARSER.saveDependencyTreeJson(path);
          resolve(res);
        }, 1500);
      });
    })();
    spinner.succeed("Save Successful！");
  } catch (error) {
    spinner.fail("Fail,please try again");
    console.log(error);
  }
};

module.exports = saving;
