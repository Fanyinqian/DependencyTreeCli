import React, { useState, useEffect } from "react";
import './index.scss'
const Search = () => {
  const [show, setShow] = useState(false);

  const handleSearch = () => {
    console.log(1);
    setShow(!show);
  };
  // 在组件挂载后延迟一段时间后显示组件
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    },100);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div>
      {/* 根据 show 状态来应用渐渐出现的动画 */}
      <div className="wrapper">
        <div className={`myComponent ${show ? 'show' : ''}`}>
          {show && (
            <div className="search">
              <div className="searchCon">
                <input type="text" placeholder="输入搜索内容" />
                <div className="font">
                  <i className="iconfont">&#xe659;</i>
                  <i className="iconfont">&#xe65c;</i>
                  <i className="iconfont" onClick={handleSearch}>&#xed1a;</i>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;