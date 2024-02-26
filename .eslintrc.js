module.exports = {
    // 继承 Eslint 规则
    extends: ["eslint:recommended"],
    parser: "@babel/eslint-parser", // 支持最终 ECMAScript 标准
    env: {
      node: true, // 启用node中全局变量
      browser: true, // 启用浏览器中全局变量
    },
    parserOptions: { // 解析选项
      ecmaVersion: 6,   // 指定es6版本
      sourceType: "module", // ES 模块化
    },
    rules: { 
      "no-var": 2, // 不能使用 var 定义变量
    },
    plugins: ['import'], // 支持动态导入语法 --> 实际使用eslint-plugin-import的规则解决的
  };
  