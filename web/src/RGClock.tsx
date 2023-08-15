import React, { useEffect, useRef } from 'react';
import RelationGraph from 'relation-graph/react';
import type { MutableRefObject } from 'react';
import type { RelationGraphExpose, RGNode, RGNodeSlotProps, RGOptions } from 'relation-graph/react';
import JSON_data from '../public/data1.json'
// NodeSlot 组件：这是一个函数式组件，根据节点的不同类型来渲染节点的样式。
// 如果节点的 id 是 'current'，则渲染一个带渐变背景色的，否则渲染一个简单的圆形。
const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    if (node.id === 'current') {
        return <div style={{ lineHeight: '24px', width: '100%', height: '100%', color: '#000000', borderRadius: '50%', boxSizing: 'border-box', background: 'linear-gradient(to right, #00FFFF, #FF00FF)' }}>{node.text}</div>
    }
    return <div style={{ lineHeight: '38px', width: '100%', height: '100%', color: '#000000', borderRadius: '50%', boxSizing: 'border-box' }}>{node.text}</div>
}
interface JsonData {
    [key: string]: {
        dependencies: string[];
        // 其他属性
    };
}
interface NodeData {
    id: string;
    text: string;
    nodeShape: number;
    // 其他属性
}
interface LinkData {
    from: string;
    to: string;
    // 其他属性
}

interface LinkData {
    from: string;
    to: string;
    // 其他属性
}
const processJsonData = (jsonData:JsonData) => {
    const nodesData = [{ id: 'treeRoot', text: 'treeRoot', nodeShape: 1 }];
    const linksData: { from: string; to: string; }[] = [];

    const getNodes = (name: string) => {
        if (jsonData[name]) {
            jsonData[name].dependencies.forEach((item: string) => {
                nodesData.push({
                    id: item,
                    text: item,
                    nodeShape: 1,
                });
                getNodes(item);
            });
        }
    };
    console.log(nodesData);

    getNodes('treeRoot');

    Object.values(jsonData).forEach((item: any) => {
        for (let v of item.dependencies) {
            linksData.push({
                from: item.name,
                to: v,
            });
        }
    });
    console.log(linksData);

    return { nodesData, linksData };
};

// RGClock 组件：这是另一个函数式组件，它包含了关系图的主要逻辑。
// 然后，它定义了一个 play 函数，用来控制中心节点的移动。
// options 对象定义了关系图的一些配置，比如节点和连线的样式，布局方式等。
const RGClock: React.FC = () => {
    // eeksRelationGraph$将被用作关系图实例的引用
    const seeksRelationGraph$ = useRef() as MutableRefObject<RelationGraphExpose>;
    //在 useEffect 钩子中，它构建了关系图的初始数据，并初始化图的展示。
    useEffect(() => {
        const { nodesData, linksData } = processJsonData(JSON_data);
        const graphJsonData: any = {
            rootId: 'treeRoot',
            nodes: nodesData,
            lines: linksData,
        };

        //   在每次循环中，它将一个新节点对象添加到 nodes 数组中。节点的 id 和 text 都使用了当前循环变量 i 的字符串表示，表示节点的标识和显示文本。
        // for (let i=1;i<61;i++) {
        //   graphJsonData.nodes.push({ id: i.toString(), text: i.toString() })
        //   graphJsonData.lines.push({ from: 'root', to: i.toString() })
        //   }
        //   const {,}=processJsonData(JSON_data);
        //   setJsonData 用来设置关系图的初始数据
        //   graphJsonData 包含关系图的节点和连线数据
        //   
        setTimeout(() => {
            seeksRelationGraph$.current.setJsonData(graphJsonData, true)
        }, 1000)
    }, [])
    //   const play = (targetNodeNumber:number) => {
    //     if (targetNodeNumber > 60) targetNodeNumber = 1;
    //     const targetNode = seeksRelationGraph$.current.getNodeById(targetNodeNumber.toString());
    //     const focusNode = seeksRelationGraph$.current.getNodeById('current');
    //     focusNode.x = targetNode.x;
    //     focusNode.y = targetNode.y;
    //     const gInstance = seeksRelationGraph$.current.getInstance();
    //     gInstance.options.checkedNodeId = 'current'
    //     gInstance.options.checkedLineId = gInstance.getLinks().find((l:RGLink) => l.toNode.id === targetNode.id).seeks_id
    //     console.log(gInstance.options.checkedLineId);
    //     seeksRelationGraph$.current.updateView()
    //     setTimeout(()=>{play(targetNodeNumber + 1)}, 1000)
    //   }
    const options: RGOptions = {
        // showDebugPanel: true,//这是一个布尔值，表示是否显示关系图的调试面板。
        lineUseTextPath: true,//表示关系图中的连线是否使用文本路径来显示。
        defaultLineShape: 5,//表示关系图中连线的默认形状。
        placeSingleNode: false,//表示当只有一个节点时，是否居中显示。
        moveToCenterWhenRefresh: true,//表示是否在刷新关系图时将视图移动到中心。
        zoomToFitWhenRefresh: true,//是一个布尔值，表示是否在刷新关系图时自动缩放以适应视图。
        layouts: [
            {
                layoutName: "force",
                layoutClassName: "seeks-layout-force",
            }
        ],
        defaultNodeWidth: 150,//默认宽度
        defaultNodeHeight: 40,
        defaultNodeBorderWidth: 2,
        defaultNodeColor: "skyblue",
        defaultNodeBorderColor: "transparent",
        // defaultNodeColor: 'transparent',
        defaultLineColor: "#ccc",
        // defaultLineColor: 'rgba(227,226,226)'//连线的默认颜色
    }

    // 状态管理高亮节点和连线
    // const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
    // const [highlightedLinks, setHighlightedLinks] = useState<string[]>([]);

    // const handleNodeClick = (nodeId: string,event:Event) => {
    //     console.log(nodeId);
    //     console.log(event);
        
    // }
    // 定义节点点击事件处理函数
  const handleNodeClick = (nodeObject: RGNode, event: MouseEvent | TouchEvent) => {
      console.log('Node clicked:', nodeObject,event);
      console.log(seeksRelationGraph$);
      const allLinks = seeksRelationGraph$.current.getLinks();
      allLinks.forEach((link:any) => {
        // 还原所有样式
        link.relations.forEach((line:any) => {
          line.color = "#ccc";
          line.fontColor = "#ccc"
          line.lineWidth = 2;
        });
      });
      // 让与{nodeObject}相关的所有连线高亮
      allLinks
        .filter(
          (link:any) => link.fromNode === nodeObject || link.toNode === nodeObject
        )
        .forEach((link:any) => {
          link.relations.forEach((line:any) => {
            console.log("line:", line);
            line.color = "#ff0000";
            line.fontColor = "#ff0000";
            line.lineWidth = 3;
          });
        });
      seeksRelationGraph$.current.getInstance().dataUpdated();
      return true;
    // 在这里可以添加你的自定义逻辑
  };
    return <div>
        <div>ok</div>
        <div style={{ height: 800, width: '98vw', border: '#000000 solid 3px' }}>
            <RelationGraph ref={seeksRelationGraph$}
                options={options}
                nodeSlot={NodeSlot}
                on-node-click="handleNodeClick"
                onNodeClick={handleNodeClick} // 将事件处理函数传递给 onNodeClick 属性
                />
        </div>
    </div>
};
export default RGClock;
