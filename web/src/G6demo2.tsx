import React, { useEffect, useRef, useState } from 'react';
import JSON_data from '../public/data1.json';
import G6, { Graph } from '@antv/g6';
interface JsonData {
    [key: string]: {
        name: any;
        dependencies: string[];
        // 其他属性
    };
}

// let res = await fetch("./test.json", {
//     method: "GET",
//         mode: "cors", // 设置跨域模式
//     })
// 数据
const processJsonData = (jsonData: JsonData) => {
    let tmp = new Map();
    let nodes = [{ id: "treeRoot", label: "treeRoot" }];
    let findNodes = (name: any) => {
        if (jsonData[name]) {
            jsonData[name].dependencies.map((item) => {
                // 如果不存在才加进去
                if (!tmp.has(item)) {
                    nodes.push({ id: item, label: item });
                    findNodes(item);
                }
                tmp.set(item, 1);
            });
        }
    };
    findNodes("treeRoot");
    console.log(nodes);

    let edges: { source: any; target: string; type: 'can-running' }[] = [];
    const getEdges = () => {
        for (let item of Object.values(jsonData)) {
            // console.log(item);
            for (let v of item.dependencies) {
                edges.push({
                    source: item.name,
                    target: v,
                    type: 'can-running'
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

// 内置高亮节点
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
            outDiv.innerHTML = `${model.name}`;
        } else {
            const source = e.item.getSource();
            const target = e.item.getTarget();
            outDiv.innerHTML = `来源：${source.getModel().name}<br/>去向：${target.getModel().name}`;
        }
        return outDiv;
    },
});
//虚线运动
G6.registerEdge(
    'line-dash',
    {
        afterDraw(cfg, group: any) {
            // get the first shape in the group, it is the edge's path here=
            const shape = group.get('children')[0];
            let index = 0;
            // Define the animation
            shape.animate(
                () => {
                    index++;
                    if (index > 9) {
                        index = 0;
                    }
                    const res = {
                        lineDash: Number,
                        lineDashOffset: -index,
                    };
                    // returns the modified configurations here, lineDash and lineDashOffset here
                    return res;
                },
                {
                    repeat: true, // whether executes the animation repeatly
                    duration: 3000, // the duration for executing once
                },
            );
        },
    },
    'cubic', // extend the built-in edge 'cubic'
);
G6.registerEdge(
    'can-running',
    {
        setState(name, value, item: any) {
            const shape = item.get('keyShape');
            if (name === 'running') {
                if (value) {
                    let index = 0;
                    shape.animate(
                        () => {
                            index++;
                            if (index > 9) {
                                index = 0;
                            }
                            const res = {
                                lineDash: Number,
                                lineDashOffset: -index,
                            };
                            // return the params for this frame
                            return res;
                        },
                        {
                            repeat: true,
                            duration: 3000,
                        },
                    );
                } else {
                    shape.stopAnimate();
                    shape.attr('lineDash', null);
                }
            }
        },
    },
    'cubic-horizontal',
);
const demoGraph = () => {
    console.log("youjici???????????????????????????");

    const containerRef = React.useRef<HTMLDivElement>(null);
    let graphRef = React.useRef<Graph | undefined>(undefined);

    useEffect(() => {
        if (graphRef.current || !containerRef.current) return;
        const graph = new G6.Graph({
            container: containerRef.current,
            layout: {
                type: 'force',
                preventOverlap: true,// 防止节点重叠
                linkDistance: 300, // 指定边距离为100
                nodeSize: 150,
            },
            width: 1800,
            height: 1000,
            defaultNode: {
                type: 'rect',
                size: 85,
                style: {
                    width: 120,
                    height: 40,
                    fill: '#ffffff',
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
                default: ["drag-canvas", "zoom-canvas", 'activate-relations', 'click-select'],
            },
            // plugins: [minimap]
            // 定义插件
            plugins: [tooltip],//悬浮显示信息  暂时是undefined
            // defaultNode: {
            //     type: 'node',
            //     labelCfg: {
            //         style: { fill: '#000000A6', fontSize: 10 },
            //     },
            //     style: { stroke: '#72CC4A', width: 150 },
            // },
            // defaultEdge: { type: 'polyline' },
        });
        console.log(graph);
        console.log(G6);

        // graph.registerNode()
        // 结构数据
        console.log(JSON_data);
        const graphJsonData = processJsonData(JSON_data);
        // const graphJsonData: any = {
        //     // rootId: 'treeRoot',
        //     nodes: nodesData,
        //     edges: linksData,
        // };
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
        graph.on("node:dragend", function (e) {
            // e.item.get("model").fx = null;
            // e.item.get("model").fy = null;
            console.log(e.item);

        });
        graph.on('node:mouseenter', (ev) => {
            const node = ev.item;
            console.log(ev);

            const edges = node?._cfg?.edges;
            edges.forEach((edge: any) => graph.setItemState(edge, 'running', true));
        });
        graph.on('node:mouseleave', (ev) => {
            const node = ev.item;
            console.log(node);
            const edges = node?._cfg?.edges;
            edges.forEach((edge: any) => graph.setItemState(edge, 'running', false));
        });
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



    // const handleNodeClick = (nodeObject: any, event: MouseEvent | TouchEvent) => {
    //     console.log('Node clicked:', nodeObject, event);
    //     // console.log(seeksRelationGraph$);
    //     const allLinks = graphRef?.current.getLinks();
    //     allLinks.forEach((link: any) => {
    //         // 还原所有样式
    //         link.relations.forEach((line: any) => {
    //             line.color = "#ccc";
    //             line.fontColor = "#ccc"
    //             line.lineWidth = 2;
    //         });
    //     });
    //     // 让与{nodeObject}相关的所有连线高亮
    //     allLinks
    //         .filter(
    //             (link: any) => link.fromNode === nodeObject || link.toNode === nodeObject
    //         )
    //         .forEach((link: any) => {
    //             link.relations.forEach((line: any) => {
    //                 console.log("line:", line);
    //                 line.color = "#ff0000";
    //                 line.fontColor = "#ff0000";
    //                 line.lineWidth = 3;
    //             });
    //         });
    //     graphRef.current.getInstance().dataUpdated();
    //     return true;
    //     // 在这里可以添加你的自定义逻辑
    // };
    return (<>
        <h1>demo2-tsx</h1>
        <div ref={containerRef} style={{ border: "3px solid black" }}></div>
    </>
    );
}

export default demoGraph;