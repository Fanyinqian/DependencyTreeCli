import { configureStore } from '@reduxjs/toolkit'

import GraphDataReducer from './modules/GraphData'

const store = configureStore({
  reducer: {
    // 注册子模块
    GData: GraphDataReducer
  }
})
export default store
