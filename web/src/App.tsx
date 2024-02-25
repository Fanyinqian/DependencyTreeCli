// import { useState } from 'react'
import './App.scss'
// import SearchBox from './Search'
// import Assit from './Assit'
// import RGClock from './RGClock';
// import G6demo2 from './G6demo2';
// import G6demo1 from './G6demo';
// import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './router/routes'
function App() {
  return (
    <>
      {/* <RGClock /> */}
      {/* <SearchBox></SearchBox> */}
      {/* <Assit></Assit> */}
      <Router>
        <div>
          {routes} {/* 插入路由配置 */}
        </div>
      </Router>
    </>
  )
}

export default App
