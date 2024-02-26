import { program } from 'commander';
import Help from './core/help';
import Commander from './core/commander';

Help(program);

Commander(program);
program.parse(process.argv); // 表示使用 Commander 来处理命令行参数
