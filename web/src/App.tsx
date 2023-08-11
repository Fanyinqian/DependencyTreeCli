// import { useState } from 'react'
import './App.scss'
import Assit from './Assit'
import ShortCut from './Search/ShortCut'

function App() {

  return (
    <>
    <canvas className='canvas'></canvas>
    <ShortCut></ShortCut>
    <Assit></Assit>
    </>
  )
}

export default App
