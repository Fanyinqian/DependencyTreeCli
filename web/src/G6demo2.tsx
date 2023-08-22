import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import JSON_data from '../public/data1.json';
import G6, { Graph } from '@antv/g6';
import './Search/index.scss'
// 引入样式
import './G6demo.scss'
// import { log } from 'console';
interface JsonData {
    [key: string]: {
        name: any;
        dependencies: string[];
        // 其他属性
    };
}
/**
 * 点击节点相关节点高亮 -- zh
 * 点击边--两边节点高亮 -- zh
 * 搜索 -- ww
 * 样式--：状态后：edgeStateStyles--默认：defaultEdge -- ww
 * any改掉 -- 幸运儿
 * 数据processJsonData plugins: [tooltip],//悬浮显示信息 --kx
 * 鸟瞰图--kx
 * 
 */

// 数据
const processJsonData = (jsonData: any) => {
    let tmp = new Map();
    let nodes: any = [];
    nodes.push({
        id: jsonData['treeRoot'].name,
        label: jsonData['treeRoot'].name,
        version: jsonData['treeRoot'].version,
        description: jsonData['treeRoot'].description,
    })
    let findNodes = (name: any) => {
        if (jsonData[name]) {
            jsonData[name].dependencies.map((item: any) => {
                // 如果不存在才加进去
                if (!tmp.has(item)) {
                    nodes.push({
                        id: item,
                        label: item,
                        version: jsonData[name].version,
                        description: jsonData[name].description
                    });
                    findNodes(item);
                }
                tmp.set(item, 1);
            });
        }
    };
    findNodes("treeRoot");
    console.log(nodes);

    let edges: { source: any; target: string; }[] = [];
    const getEdges = () => {
        for (let item of Object.values(jsonData)) {
            // console.log(item);
            for (let v of item.dependencies) {
                edges.push({
                    source: item.name,
                    target: v,
                });
            }
        }
    };
    getEdges();
    console.log(edges);
    const data = {
        nodes,
        edges,
    };
    console.log(data);

    return data;
};

// 边 tooltip 坐标
// const [showNodeTooltip, setShowNodeTooltip] = useState(false);
// const [nodeTooltipX, setNodeToolTipX] = useState(0);
// const [nodeTooltipY, setNodeToolTipY] = useState(0);

// // 实例化 minimap 插件
// const minimap = new G6.Minimap({
//     size: [100, 100],
//     className: 'minimap',
//     type: 'delegate',
// });

// 悬浮节点 出现信息
const tooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 10,
    fixToNode: [1, 0.5],
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node', 'edge'],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    getContent: (e: any) => {
        const outDiv = document.createElement('div');
        outDiv.style.width = 'fit-content';
        outDiv.style.height = 'fit-content';
        const model = e.item?.getModel();
        if (e.item.getType() === 'node') {
            outDiv.innerHTML = `
                名称：${model.id}<br/>
                版本：${model.version ? model.version : '暂无信息'}<br/>
                描述：${model.description ? model.description : '暂无信息'}
            `;
        } else {
            const source = e.item.getSource();
            const target = e.item.getTarget();
            outDiv.innerHTML = `来源：${source.getModel().id}<br/>去向：${target.getModel().id}`;
        }
        return outDiv;
    },
});
//虚线运动

// 鸟瞰图组件
const minimap = new G6.Minimap({
    size: [200, 200],
    type: 'keyShape',
});

const demoGraph = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    let graphRef = React.useRef<Graph | undefined>(undefined);

    useEffect(() => {
        // let selectNode: any = { id: "treeRoot", label: "treeRoot" };
        if (graphRef.current || !containerRef.current) return;
        const graph = new G6.Graph({
            container: containerRef.current,
            layout: {
                type: 'force',
                preventOverlap: true,// 防止节点重叠
                linkDistance: 300, // 指定边距离为100
                nodeSize: 150,
            },
            width: containerRef.current.clientWidth - 10,
            height: containerRef.current.clientHeight - 10,
            // 基础的节点
            defaultNode: {
                type: 'rect',
                size: 85,
                style: {
                    width: 120,
                    height: 40,
                    fill: '#fff',
                    stroke: '#3e6f81',
                    padding: [2, 3, 2, 3],
                    radius: 2,
                    lineWidth: 3,
                },
                labelCfg: {
                    style: {
                        fill: '#917253',
                        fontSize: 12,
                    },
                }
            },
            defaultEdge: {
                type: 'quadratic',
                labelCfg: {
                    autoRotate: true,
                },
                style: {
                    endArrow: {
                        // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
                        path: 'M 0,0 L 10,5 L 10,-5 Z',
                        // 箭头的偏移量，负值代表向 x 轴正方向移动
                        // d: -10,
                        // v3.4.1 后支持各样式属性
                        fill: '#333',
                        stroke: '#666',
                        opacity: 0.3,
                    },
                }
            },
            modes: {
                default: ["drag-canvas", "zoom-canvas", 'activate-relations'],
            },
            // plugins: [minimap]
            // 定义插件
            plugins: [tooltip, minimap],//悬浮显示信息  暂时是undefined
            edgeStateStyles: {
                // 二值状态 running 为 true 时的样式
                // 线的样式
                running: {
                    // keyShape 的状态样式
                    stroke: '#000',
                    // fill: '#000',
                    lineWidth: 2,
                    animation: 'ant-line 30s infinite linear',
                },
                clicked: {
                    // lineWidth: 3,
                    fill: "red",
                    opacity: 0.3
                }
            },
            nodeStateStyles: {
                active: {
                    // "fill": "#000",
                    "stroke": "#000",
                    "lineWidth": 2,
                    "shadowColor": "#fff",
                    // "shadowBlur": 10,
                    'color':'#fff'
                },
                // 点击节点后 节点边框变大 ....
                selected: {
                    // fill: "rgb(255, 255, 255)",
                    stroke: "#000",
                    lineWidth: 4,
                    // shadowColor: "rgb(95, 149, 255)",
                    // shadowBlur: 10,
                    "text-shape": {
                        fontWeight: 500
                    }
                },
                // 高亮
                highlight: {
                    // "fill": "rgb(223, 234, 255)",
                    // "stroke": "#4572d9",
                    "lineWidth": 2,
                    "text-shape": {
                        "fontWeight": 500
                    }
                },
                inactive: {
                    // "fill": "rgb(247, 250, 255)",
                    // "stroke": "rgb(191, 213, 255)",
                    "lineWidth": 1
                },
                disable: {
                    // "fill": "rgb(250, 250, 250)",
                    // "stroke": "rgb(224, 224, 224)",
                    "lineWidth": 1
                }

            }
        });
        console.log(graph);
        console.log(G6);





        // 将 graph 传递给 Search 组件作为 prop
        ReactDOM.render(<Search graph={graph} />, document.getElementById("search-container"));
        



        // graph.registerNode()
        // 结构数据
        console.log(JSON_data);
        const graphJsonData = processJsonData(JSON_data);
        console.log(graphJsonData);
        // 绑定数据
        graph.data(graphJsonData);
        // 渲染图
        graph.render();
        graph.on("node:dragstart", function (e) {
            graph.layout();
            refreshDragedNodePosition(e);
        });
        graph.on("node:drag", function (e) {
            refreshDragedNodePosition(e);
        });
        // 节点移动
        graph.on("node:dragend", function (e) {
            // e.item.get("model").fx = null;
            // e.item.get("model").fy = null;
            console.log(e.item);

        });
        // 鼠标悬浮节点
        graph.on('node:mouseenter', (ev) => {
            // const nodeItem = ev.item // 获取被点击的节点元素对象
            // console.log(nodeItem);
            const node = ev.item;
            const edges = node?._cfg?.edges;
            edges.forEach((edge: any) => {
                graph.setItemState(edge, 'running', true)
            });
        });
        // 鼠标离开悬浮节点
        graph.on('node:mouseleave', (ev) => {
            // console.log(ev);
            const node = ev.item;
            // console.log(node);
            const edges = node?._cfg?.edges;
            edges.forEach((edge: any) => graph.setItemState(edge, 'running', false));
        });
        // 单击节点
        graph.on('node:click', (ev) => {
            // 先将所有当前是 click 状态的节点置为非 click 状态
            clear();
            const nodeItem: any = ev.item; // 获取被点击的节点元素对象
            graph.setItemState(nodeItem, 'selected', true); // 设置当前
            const edges = nodeItem.getEdges();
            edges.forEach((edge: any) => {
                graph.setItemState(edge, 'clicked', true);
            })
            const Nodes = nodeItem.getNeighbors();
            Nodes.forEach((node: any) => {
                graph.setItemState(node, 'highlight', true);
            })
        })
        // 清空所有的样式
        const clear = function () {
            const clickNodes = graph.findAllByState('node', 'selected');
            clickNodes.forEach((cn) => {
                graph.setItemState(cn, 'selected', false);
            });
            const clickNodes2 = graph.findAllByState('node', 'highlight');
            clickNodes2.forEach((node: any) => {
                graph.setItemState(node, 'highlight', false);
            })
            const clickEdges = graph.findAllByState('edge', 'clicked');
            clickEdges.forEach((cn) => {
                graph.setItemState(cn, 'clicked', false);
            });
        }
        // 点击画布
        graph.on('canvas:click', (ev) => {
            clear();
        })
        // 点击边
        graph.on('edge:click', (ev) => {
            clear();
            const clickEdge: any = ev.item;
            graph.setItemState(clickEdge, 'clicked', true);
        })
        console.log(containerRef);

        if (typeof window !== "undefined")
            window.onresize = () => {
                if (!graph || graph.get("destroyed")) return;
                if (!containerRef || !containerRef.current?.scrollWidth || !containerRef.current?.scrollHeight)
                    return;
                //   graph.changeSize(container.scrollWidth, container.scrollHeight);
            };

        function refreshDragedNodePosition(e: any) {
            const model = e.item.get("model");
            model.fx = e.x;
            model.fy = e.y;
        }
        console.log(containerRef);
        console.log(graphRef);
        graphRef.current = graph;
        
    }, [])
    return (<>
        {/* <h1>demo2-tsx</h1> */}




        <div id="search-container"></div>




        <div ref={containerRef} style={{ width:'100%',height:'100vh' }}></div>
        
    </>
    );
}


// 搜索部分
interface SearchProps {
    graph: Graph;
  }
  


  const Search = ({ graph }: SearchProps) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const lastTargetNodeId = useRef<string | null>(null);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputText = e.target.value;
      setSearchText(inputText);
  
      const data = processJsonData(JSON_data);
      const targetNodes = data.nodes.filter((node:any) =>
        node.label.includes(inputText)
      );
      const results = targetNodes.map((node:any) => node.id);
      setSearchResults(results);
      setSelectedIndex(-1);
    };
  
    const handleSearch = () => {
      let selectedNodeId = searchResults[selectedIndex];
      if (!selectedNodeId && searchResults.length === 1) {
        selectedNodeId = searchResults[0];
      }
  
      if (selectedNodeId) {
        if (lastTargetNodeId.current) {
          // 取消上一个节点的样式
        //   graph.updateItem(lastTargetNodeId.current, {
        //     style: {
        //       width: 120,
        //       height: 40,
        //       fill: '#fff',
        //       stroke: '#3e6f81',
        //       padding: [2, 3, 2, 3],
        //       radius: 2,
        //       lineWidth: 3,
        //     },
        //   });
        }
  
        // 将目标节点居中显示
        console.log('找到内容', selectedNodeId);
        graph.focusItem(selectedNodeId);
  
        // 更改节点样式
        // graph.updateItem(selectedNodeId, {
        //   style: {
        //     // width: 120,
        //     // height: 40,
        //     // fill: 'blue',
        //     // stroke: '#000',
        //     // padding: [2, 3, 2, 3],
        //     // radius: 2,
        //     // lineWidth: 3,
        //   },
        // });
  
        lastTargetNodeId.current = selectedNodeId;
      } else {
        alert('未找到目标节点');
      }
    };
  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
      }
    };
  
    return (
      <>
        <div className='search'>
          <div className='searchCon'>
            <input
              placeholder='输入搜索内容'
              type='text'
              value={searchText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <div className='font'>
              <i className='iconfont' onClick={handleSearch}>
                &#xe61a;
              </i>
            </div>
          </div>
          {searchResults.length > 0 && (
            <div className='searchResults'>
              {searchResults.map((result, index) => (
                <div
                  key={result}
                  className={`resultItem ${
                    index === selectedIndex ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSelectedIndex(index);
                    handleSearch();
                  }}
                >
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };
  
  
  
  






export default demoGraph;