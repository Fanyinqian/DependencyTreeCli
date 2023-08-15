// import { useState } from 'react'
import './App.scss'
import Search from './Search'
import Assit from './Assit'
import RGClock from './RGClock';
function App() {

  return (
      <>
    <RGClock />
    {/* <canvas className='canvas'></canvas> */}
    <Search></Search>
    <Assit></Assit>
    </>
  )
}

export default App
