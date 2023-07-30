const readline = require('readline');
/**
 * 定义cli为命令提供的处理逻辑
 */
const Action = {
    analyze() {
        // 分析依赖，生成依赖树..
        console.log('analyze');

        // 打开内置网页
    },
    depth(n: Array<string>) {
        const lastElement = n[n.length-1]
        let depth:number = parseInt(lastElement.charAt(lastElement.length - 1));

        depth =  Number.isNaN(depth)? 0:depth;

        if (depth === 0) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question('请输入限制向下递归分析的层次深度：', (answer:string) => {
                depth = parseInt(answer);
                // 层级深度逻辑代码..
                console.log('深度限制为:', depth);
                

                rl.close();
            });
        } else {
            // 层级深度逻辑代码..
            console.log('深度限制为:', depth);
            
        }
    },
    saveJSON() {
        console.log('saveJSON');
    }
}

module.exports = Action


