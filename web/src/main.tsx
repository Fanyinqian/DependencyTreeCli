import ReactDOM from 'react-dom/client'
import App from './App'
import '../public/font/iconfont.css'
// 导入store提供组件Provider
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
