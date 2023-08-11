import React from 'react';
import './index.scss';
interface AnimatedComponentProps {
  isAnimating: boolean;
}
const ShortcutKeys: React.FC <AnimatedComponentProps> = ({ isAnimating }) => {
  return (
    <div className={`animated-component ${isAnimating ? 'slide-in-right' : 'slide-out-left'}`}>
    <div className="shortcut-keys">
      <h2>快捷键说明</h2>
      <i className='iconfont'>&#xe60e;</i>
      <ul>
        <li>
          <span className="description">复制</span>
          <span className="key">Ctrl + C</span>
        </li>
        <li>
          <span className="description">剪切</span>
          <span className="key">Ctrl + X</span>
        </li>
        <li>
          <span className="description">粘贴</span>
          <span className="key">Ctrl + V</span>
        </li>
        <li>
          <span className="description">重置缩放</span>
          <span className="key">Ctrl + 0</span>
        </li>
        <li>
          <span className="description">画布缩放</span>
          <span className="key">Ctrl + 鼠标滚轮</span>
        </li>
        <li>
          <span className="description">拖动画布</span>
          <span className="key">鼠标左键</span>
        </li>
        <li>
          <span className="description">全屏显示</span>
          <span className="key">F11</span>
        </li>
        <li>
          <span className="description">查找</span>
          <span className="key">Ctrl + 8</span>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default ShortcutKeys;
