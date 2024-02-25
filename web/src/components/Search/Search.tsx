import { Graph, GraphData, NodeConfig } from '@antv/g6'
import { Reducer } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { GraphDataState } from '../../types/global'

interface SearchProps {
  graph: Graph
}
function Search({ graph }: SearchProps) {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const lastTargetNodeId = useRef<string | null>(null)
  const searchResultsContainerRef = useRef<HTMLDivElement | null>(null)
  const [searchVisible, setSearchVisible] = useState(false)

  const data: GraphData = useSelector(
    (
      state: Reducer<{
        GData: GraphDataState
      }>
    ) => state.GData
  )
  console.log(data)
  const handleSearchIconClick = () => {
    setSearchVisible(true)
  }

  const handleDeleteIconClick = () => {
    setSearchVisible(false)
  }
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    setSearchText(inputText)

    if (inputText === '') {
      setSearchResults([])
      setSelectedIndex(-1)
      return
    }

    if (!data.nodes) {
      return
    }
    const targetNodes: NodeConfig[] = data.nodes.filter(
      (node: NodeConfig) =>
        node.label && (node.label as string).includes(inputText)
    )
    const results = targetNodes.map((node: NodeConfig) => node.id)
    setSearchResults(results)
    setSelectedIndex(-1)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchResults.length > 0) {
        if (selectedIndex === -1) {
          setSelectedIndex(0)
        }

        handleSearch()
      } else {
        // 搜索结果为空时，直接执行搜索
        handleSearch()
      }
    } else if (e.code.startsWith('Digit') && searchResults.length > 0) {
      e.preventDefault()
      const index = Number(e.key) - 1
      setSelectedIndex(index >= 0 && index < searchResults.length ? index : -1)
      handleSearch() // 在按下数字键后，执行 handleSearch() 完成居中操作
    }
  }

  const handleSearch = () => {
    if (selectedIndex !== -1) {
      const selectedNodeId = searchResults[selectedIndex]
      const node = graph.findById(selectedNodeId)
      graph.setItemState(node, 'highlight', true)

      if (
        lastTargetNodeId.current &&
        lastTargetNodeId.current !== selectedNodeId
      ) {
        const lastNode = graph.findById(lastTargetNodeId.current)
        graph.clearItemStates(lastNode)
      }

      console.log('找到内容', selectedNodeId)
      graph.focusItem(selectedNodeId)

      lastTargetNodeId.current = selectedNodeId

      // 如果是最后一个节点，则重置选定的下标
      if (selectedIndex === searchResults.length - 1) {
        setSelectedIndex(-1)
      }
    } else if (searchResults.length === 1) {
      const selectedNodeId = searchResults[0]
      const node = graph.findById(selectedNodeId)
      graph.setItemState(node, 'highlight', true)

      if (
        lastTargetNodeId.current &&
        lastTargetNodeId.current !== selectedNodeId
      ) {
        const lastNode = graph.findById(lastTargetNodeId.current)
        graph.clearItemStates(lastNode)
      }

      console.log('找到内容', selectedNodeId)
      graph.focusItem(selectedNodeId)

      lastTargetNodeId.current = selectedNodeId

      // 重置选定的下标
      setSelectedIndex(0)
    } else {
      console.log('未找到目标节点')
    }
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      searchResultsContainerRef.current &&
      !searchResultsContainerRef.current.contains(e.target as Node)
    ) {
      setSearchResults([])
      setSelectedIndex(-1)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className="search">
      {!searchVisible && (
        <div className="searchIconContainer">
          <i className="iconfont searchIcon" onClick={handleSearchIconClick}>
            &#xe61a;
          </i>
        </div>
      )}
      {searchVisible && (
        <div className="searchCon">
          <input
            placeholder="输入搜索内容"
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="searchInput"
          />
          <div className="font">
            <div className="deleteButton" onClick={handleDeleteIconClick}>
              <i className="iconfont deleteIcon">&#xe60e;</i>
            </div>
            <div className="searchButton" onClick={handleSearch}>
              <i className="iconfont searchIcon">&#xe61a;</i>
            </div>
          </div>
        </div>
      )}
      {searchResults.length > 0 && searchVisible && (
        <div ref={searchResultsContainerRef} className="searchResults">
          {searchResults.map((result, index) => (
            <div
              key={result}
              className={`resultItem ${
                index === selectedIndex ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedIndex(index)
                handleSearch()
              }}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
