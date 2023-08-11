import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Search from './index'


const ShortCut: React.FC = () => {
  useEffect(() => {
    // 快捷键
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log(33);
      if (event.ctrlKey && event.key === '8') {
        // console.log(1);
        
        // 阻止浏览器的默认行为
        event.preventDefault();

        // 渲染 搜索Search 组件
        const shortCut = document.getElementById('short-cut');
        if (shortCut) {
          const existingRoot = createRoot(shortCut);
          existingRoot.render(<Search />);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div id="short-cut" />;
};

export default ShortCut;
