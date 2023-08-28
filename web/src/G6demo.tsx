import React, { useEffect, useRef, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import JSON_data from '../public/data1.json';
import G6, { Graph } from '@antv/g6';
import './Search/index.scss'
import './side.scss'
import { Link } from 'react-router-dom';
// 引入样式
import './G6demo.scss'
// import { log } from 'console';
interface JsonData {
    [key: string]: {
        name: any;
        dependencies: string[];
        // 其他属性
        version: string,
        description: string
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
// let chooseColor: any = 'blue';
const bgC: any = {
    blue: '#eff8fa',
    dark: '#303030',
    gray: '#fff'
}
const defaultNodeColor: any = {
    blue: {
        defaultNodeFill: '#84a1c8',
        defaultLabel: 'white',
        defaultEdge: '#8898ae',
        defaultOpacity: 0.8
    },
    gray: {
        defaultNodeFill: '#e7e8ed',
        defaultLabel: 'black',
        defaultEdge: '#9fa1ad',
        defaultOpacity: 0.8
    },
    dark: {
        defaultNodeFill: '#e7e8ed',
        defaultLabel: 'black',
        defaultEdge: '#9fa1ad',
        defaultOpacity: 1
    }
}
const StateColor: any = {
    blue: {
        edgeHoverColor: "#8898ae",
        edgeClickFill: "#36445c",
        edgeClickOpacity: 1,
        nodeFill: "#36445c",
        nodeSelectedStroke: "#36445c",
        nodeHighlightFill: "#36445c",
        nodeHighlightstroke: "#84a1c8",
        nodeHighlightOpacity: 0.8,
        nodeHoverStroke: "#9a9898",
        textWeight: 500
    },
    gray: {
        edgeHoverColor: "#15171b",
        edgeClickFill: "#8b9092",
        nodeSelectedStroke: "#795548",
        edgeClickOpacity: 1,
        nodeFill: "#f7f7f7",
        nodeHighlightFill: "#e8e8e8",
        nodeHighlightstroke: "#9b9999",
        nodeHighlightOpacity: 0.8,
        nodeHoverStroke: "#9a9898",
        textWeight: 700
    },
    dark: {
        edgeHoverColor: "#e9c46a",
        edgeClickFill: "#e9c46a",
        nodeSelectedStroke: "#fd6d5a",
        edgeClickOpacity: 1,
        nodeFill: "#f7f7f7",
        nodeHighlightFill: "#c07093",
        nodeHighlightstroke: "#c07093",
        nodeHighlightOpacity: 1,
        nodeHoverStroke: "#9a9898",
        textWeight: 700
    }
}


// 数据
const processJsonData = (jsonData: JsonData) => {
    let tmp = new Map();
    let nodes: any = [];
    nodes.push({
        id: jsonData['treeRoot'].name,
        label: jsonData['treeRoot'].name,
        version: jsonData['treeRoot'].version,
        description: jsonData['treeRoot'].description,
        style: {
            width: 140,
            height: 60,
            fill: 'orange'
        }
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
                        description: jsonData[name].description,

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
// 选择布局 力force 流程图dagre 辐射radial
const layoutChoose: any = 'force';
const layoutInfo: any = {
    'force': {
        // type: 'force',//radial dagre
        preventOverlap: true,// 防止节点重叠
        linkDistance: 100, // 指定边距离为100
        nodeSize: 150,
        tyle: {
            'background-color': '#000',
            color: 'white'
        }
    },
    'radial': {
        linkDistance: 600,
        preventOverlap: true,// 防止节点重叠
        unitRadius: 200,
        nodeSize: 100,
        nodeSpacing: 90,
        // strictRadial: false
    },
    'dagre': {
        rankdir: 'LR',
        nodesep: 1,
    }
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
    const searchResultsContainerRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        setSearchText(inputText);

        if (inputText === '') {
            setSearchResults([]);
            setSelectedIndex(-1);
            return;
        }

        const data = processJsonData(JSON_data);
        const targetNodes = data.nodes.filter((node: any) =>
            node.label.includes(inputText)
        );
        const results = targetNodes.map((node: any) => node.id);
        setSearchResults(results);
        setSelectedIndex(-1);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchResults.length > 0) {
                if (selectedIndex === -1) {
                    setSelectedIndex(0);
                }

                handleSearch();
            } else {
                // 搜索结果为空时，直接执行搜索
                handleSearch();
            }
        } else if (e.code.startsWith('Digit') && searchResults.length > 0) {
            e.preventDefault();
            const index = Number(e.key) - 1;
            setSelectedIndex(index >= 0 && index < searchResults.length ? index : -1);
            handleSearch(); // 在按下数字键后，执行 handleSearch() 完成居中操作
        }
    };

    const handleSearch = () => {
        if (selectedIndex !== -1) {
            const selectedNodeId = searchResults[selectedIndex];
            const node = graph.findById(selectedNodeId);
            graph.setItemState(node, 'click', true);

            if (lastTargetNodeId.current && lastTargetNodeId.current !== selectedNodeId) {
                const lastNode = graph.findById(lastTargetNodeId.current);
                graph.clearItemStates(lastNode);
            }

            console.log('找到内容', selectedNodeId);
            graph.focusItem(selectedNodeId);

            lastTargetNodeId.current = selectedNodeId;

            // 如果是最后一个节点，则重置选定的下标
            if (selectedIndex === searchResults.length - 1) {
                setSelectedIndex(-1);
            }
        } else if (searchResults.length === 1) {
            const selectedNodeId = searchResults[0];
            const node = graph.findById(selectedNodeId);
            graph.setItemState(node, 'highlight', true);
            if (lastTargetNodeId.current && lastTargetNodeId.current !== selectedNodeId) {
                const lastNode = graph.findById(lastTargetNodeId.current);
                graph.clearItemStates(lastNode);
            }

            console.log('找到内容', selectedNodeId);
            graph.focusItem(selectedNodeId);

            lastTargetNodeId.current = selectedNodeId;

            // 重置选定的下标
            setSelectedIndex(0);
        } else {
            console.log('未找到目标节点');
        }
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (
            searchResultsContainerRef.current &&
            !searchResultsContainerRef.current.contains(e.target as Node)
        ) {
            setSearchResults([]);
            setSelectedIndex(-1);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

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
                    <div className='font' onClick={handleSearch}>
                        <i className='iconfont'>&#xe61a;</i>
                    </div>
                </div>
                {searchResults.length > 0 && (
                    <div ref={searchResultsContainerRef} className='searchResults'>
                        {searchResults.map((result, index) => (
                            <div
                                key={result}
                                className={`resultItem ${index === selectedIndex ? 'selected' : ''
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
interface SidebarProps {
    chooseColor: string;
    onColorChange: (color: string) => void;
}
//侧边栏部分
const Sidebar: React.FC<SidebarProps> = ({ chooseColor, onColorChange }) => {
    const [activeItemId, setActiveItemId] = useState(null);
    const containerRef = useRef(null);
    
    const listItems = [
      {
        id: 1,
        title: <span><i className='iconfont'>&#xe6ab;</i><br/>样式</span>,
        subcontents: [
          {
            id: 1,
            text: 'Subcontent 1',
          },
          {
            id: 2,
            text: 'Subcontent 2',
          },
          {
            id: 3,
            text: 'Subcontent 3',
          },
        ]
      },
      {
        id: 2,
        title: <span><i className='iconfont'>&#xe6c1;</i><br/>布局</span>,
        subcontents: [
          {
            id: 3,
            text: 'Subcontent 3',
          },
          {
            id: 4,
            text: 'Subcontent 4',
          }
        ]
      },  
    ];
  
    const activeItem = listItems.find((item) => item.id === activeItemId);
  
    const handleClick = (itemId: any) => {
      if (itemId === activeItemId) {
        setActiveItemId(null);
      } else {
        setActiveItemId(itemId);
        //切换
        if (itemId === 1) {
            onColorChange('gray'); // 在颜色选择变化时调用父组件的回调函数
        }
      }
    };
  
    //点击消失
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !(containerRef.current as HTMLDivElement).contains(event.target as Node)) {
          setActiveItemId(null);
        }
      };
    
      document.addEventListener('mousedown', handleOutsideClick);
    
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
  
    return (
      <div className='sidebar'>
        <ul>
          {listItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={item.id === activeItemId ? 'active' : ''}
            >
              {item.title}
            </li>
          ))}
        </ul>
        <div className={`container ${activeItem ? 'active' : ''}`} ref={containerRef}>
          {activeItem && (
            <div className='tooltip-container'>
              <div className='tooltip-left'>
                {activeItem.subcontents.map((subcontent) => (
                  <div
                    key={subcontent.id}
                    className='rect-tip'
                    // 各个内容的id 
                    onClick={() => console.log(`Clicked ${subcontent.id}`)}
                  >
                    <p>{subcontent.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
// 总的父组件
const demoGraph = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    let graphRef = React.useRef<Graph | undefined>(undefined);
    const [chooseColor, setChooseColor] = useState('blue');
    const handleColorChange = (color: React.SetStateAction<string>) => {
        setChooseColor(color); // 更新父组件的颜色状态
    };
    console.log('chooseColor', chooseColor);
    let abc = {
        hover: {
            stroke: StateColor[chooseColor].edgeHoverColor,
            lineWidth: 3,
            shadowColor: "#dce3e4",
            shadowBlur: 50,
            color: StateColor[chooseColor].edgeHoverColor,
            opacity: .7,
        },
        clicked: {
            lineWidth: 3,
            // color: StateColor[chooseColor].edgeClickFill,
            stroke: StateColor[chooseColor].edgeClickFill,
            opacity: StateColor[chooseColor].edgeClickOpacity,
        },
    }
    useEffect(() => {
        console.log('chooseColor', chooseColor);
        let edgeStateStyles: any;
        edgeStateStyles = Object.assign({}, abc);
        let nodeStateStyles: any;
        // 点击当前节点是select 相关节点是highlight 鼠标悬浮是hover
        nodeStateStyles = {
            selected: {
                fill: StateColor[chooseColor].nodeFill,
                stroke: StateColor[chooseColor].nodeSelectedStroke,
                lineWidth: 3,
                // shadowColor: "rgb(95, 149, 255)",
                // shadowBlur: 10,
                "text-shape": {
                    fontWeight: StateColor[chooseColor].textWeight
                },
                "shadowColor": "#aeaeae",
                "shadowBlur": 10,
                opacity: StateColor[chooseColor].edgeClickOpacity,
            },
            // 高亮
            highlight: {
                fill: StateColor[chooseColor].nodeHighlightFill,
                // "stroke": "#4572d9",
                "lineWidth": 2,
                "text-shape": {
                    "fontWeight": StateColor[chooseColor].textWeight
                },
                "stroke": StateColor[chooseColor].nodeHighlightstroke,
                opacity: StateColor[chooseColor].edgeClickOpacity
            },
            hover: {
                // stroke: "yellow",
                // "fill": "rgb(247, 250, 255)",
                "stroke": StateColor[chooseColor].nodeHoverStroke,
                // "lineWidth": 2,
                "shadowColor": "#d7b140",
                "shadowBlur": 25
            },
            target: {
                fill: "rgb(255, 255, 255)",
                stroke: "#000",
                lineWidth: 4,
                shadowBlur: 10,
                "text-shape": {
                    fontWeight: 500
                }
            }
        }
        console.log('useEffect', chooseColor);
        console.log(containerRef);

        // let selectNode: any = { id: "treeRoot", label: "treeRoot" };
        if (graphRef.current) {
            graphRef.current?.destroy();
            // return;
        }
        if (!containerRef.current) {
            return;
        }
        const graph = new G6.Graph({
            container: containerRef.current as HTMLElement,
            layout: {
                type: layoutChoose,
                ...layoutInfo[layoutChoose]
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
                    fill: defaultNodeColor[chooseColor].defaultNodeFill,
                    // stroke: '#red',
                    padding: [2, 3, 2, 3],
                    radius: 5,
                    lineWidth: 0,
                    opacity: defaultNodeColor[chooseColor].defaultOpacity
                },
                labelCfg: {
                    style: {
                        fill: defaultNodeColor[chooseColor].defaultLabel,
                        fontSize: 12,
                        fontWeight: 700,

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
                        fill: defaultNodeColor[chooseColor].defaultEdge,
                        stroke: defaultNodeColor[chooseColor].defaultEdge,
                        opacity: 0.3,
                    },
                    lineWidth: 2,
                    opacity: 0.3,

                }, lineJoin: 'bevel',
                color: defaultNodeColor[chooseColor].defaultEdge,
            },
            modes: {
                default: ["drag-canvas", "zoom-canvas"],
            },
            // plugins: [minimap]
            // 定义插件
            plugins: [tooltip, minimap],//悬浮显示信息  暂时是undefined
            edgeStateStyles: edgeStateStyles,
            nodeStateStyles: nodeStateStyles,
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
            const nodeItem: any = ev.item;
            graph.setItemState(nodeItem, 'hover', true); // 设置当前
        });
        // 鼠标离开悬浮节点
        graph.on('node:mouseleave', (ev) => {
            // console.log(ev);
            const node = ev.item;
            // console.log(node);
            const edges = node?._cfg?.edges;
            edges.forEach((edge: any) => graph.setItemState(edge, 'running', false));
            const nodes = graph.findAllByState('node', 'hover');
            nodes.forEach((node: any) => graph.setItemState(node, 'hover', false));
        });
        graph.on('edge:mouseleave', (ev) => {
            const edges = graph.findAllByState('edge', 'hover');
            edges.forEach((edge: any) => graph.setItemState(edge, 'hover', false));
        })

        // 鼠标悬浮线条
        graph.on('edge:mouseenter', (ev) => {
            const edgeItem: any = ev.item;
            graph.setItemState(edgeItem, 'hover', true); // 设置当前
        })
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
            graph.setItemState(clickEdge.getSource(), 'highlight', true);
            graph.setItemState(clickEdge.getTarget(), 'highlight', true);
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

    }, [chooseColor])
    return (<>
        {/* <h1>demo2-tsx</h1> */}
        <div id="search-container"></div>
        <Sidebar chooseColor={chooseColor} onColorChange={handleColorChange}></Sidebar>
        <div ref={containerRef} style={{ width: '100%', height: '100vh', backgroundColor: bgC[chooseColor] }}></div>

    </>
    );
}
export default demoGraph;