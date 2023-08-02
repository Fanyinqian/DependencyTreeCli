// import { myCache } from "./lib/cache/index";
const main = async () => {
  const container = document.getElementById("container");
  let res = await fetch("./test.json", {
    method: "GET",
    mode: "cors", // 设置跨域模式
  }).then((res) => res.json());
  let nodes = [{ id: "treeRoot", label: "treeRoot" }];
  let findNodes = (name) => {
    if (res[name]) {
      res[name].dependencies.map((item) => {
        nodes.push({ id: item, label: item });
        findNodes(item);
      });
    }
  };
  findNodes("treeRoot");
  console.log(nodes);

  let edges = [];
  const getEdges = () => {
    for (let item of Object.values(res)) {
      console.log(item);
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

  const graph = new G6.Graph({
    container: container, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: 3000,
    height: 2000,
    defaultNode: {
      size: 50,
    },
    defaultEdge: {
      labelCfg: {
        autoRotate: true,
      },
    },
    // layout: {
    //   type: "force2",
    //   animate: true, // 设置为 false 可关闭布局动画
    //   maxSpeed: 100,
    //   linkDistance: 50,
    //   clustering: true,
    //   nodeClusterBy: "cluster",
    //   clusterNodeStrength: 300,
    // },

    // modes: {
    //   default: [
    //     "drag-canvas",
    //     "zoom-canvas",
    //     "drag-node",
    //     {
    //       type: "tooltip", // 提示框
    //       formatText(model) {
    //         // 提示框文本内容
    //         const text =
    //           "label: " + model.label + "<br/> class: " + model.class;
    //         return text;
    //       },
    //     },
    //   ], // 允许拖拽画布、放缩画布、拖拽节点
    // },
    layout: {
      type: "force",
      linkDistance: 200,
      preventOverlap: true,
    },
    modes: {
      default: ["drag-canvas", "zoom-canvas"],
    },
  });

  graph.data(data); // 读取 Step 2 中的数据源到图上
  graph.render(); // 渲染图
  graph.on("node:dragstart", function (e) {
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on("node:drag", function (e) {
    refreshDragedNodePosition(e);
  });
  graph.on("node:dragend", function (e) {
    e.item.get("model").fx = null;
    e.item.get("model").fy = null;
  });

  if (typeof window !== "undefined")
    window.onresize = () => {
      if (!graph || graph.get("destroyed")) return;
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };

  function refreshDragedNodePosition(e) {
    const model = e.item.get("model");
    model.fx = e.x;
    model.fy = e.y;
  }
};
main();
