import { NodeConfig } from '@antv/g6'
import { createSlice } from '@reduxjs/toolkit'
import { GraphDataState } from '../../types/global'

const initialState: GraphDataState = {
  jsonData: {},
  GData: { nodes: [], edges: [] }
}

const GraphDataStore = createSlice({
  name: 'GraphData',
  // 数据
  initialState,
  // 同步修改方法
  reducers: {
    setData(state, action) {
      state.jsonData = action.payload
      //构建节点数据
      const nodes: NodeConfig[] = Object.keys(state.jsonData!).map(
        (key: string) => {
          const newNode = {
            id: key,
            label: key,
            version: state.jsonData![key].version,
            description: state.jsonData![key].description
          }
          if (key == 'treeRoot') {
            return {
              ...newNode,
              style: {
                width: 140,
                height: 60,
                fill: 'orange'
              }
            }
          }
          return newNode
        }
      )

      console.log(nodes)

      //构建节点方向
      const edges: { source: string; target: string }[] = []
      const getEdges = () => {
        for (const item of Object.values(state.jsonData)) {
          // console.log(item);
          for (const v of item.dependencies) {
            //如果当前依赖包不在
            if (!(v in state.jsonData)) continue
            edges.push({
              source: item.name,
              target: v
            })
          }
        }
      }
      getEdges()
      console.log(edges)
      state.GData = { nodes, edges }
    }
  }
})

// 解构出actionCreater
const { setData } = GraphDataStore.actions

const processJsonData = async () => {
  //获取数据
  const response = await fetch('test.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  const res = await response.json()
  setData(res)
}

processJsonData()

// 获取reducer函数
const GraphDataReducer = GraphDataStore.reducer

export default GraphDataReducer
