"use strict";
const program = require('commander');
const Help = require('./core/help');
const Commander = require('./core/commander');
Help(program);
Commander(program);
program.parse(process.argv); // 表示使用 Commander 来处理命令行参数
//# sourceMappingURL=index.js.map