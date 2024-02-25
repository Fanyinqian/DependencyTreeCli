import { GraphData } from '@antv/g6'

type JsonData = {
  [key: string]: {
    name: string
    dependencies: string[]
    // 其他属性
    version: string
    description: string
  }
}

type GraphDataState = {
  jsonData: JsonData
  GData: GraphData
}
