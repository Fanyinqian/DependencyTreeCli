import React, { useState } from "react";
import './index.scss'
import ShortcutKeys from "../ShortcutKeys";
const Assit = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  return (
    <div>
      <div className="assit">
          <div className="assitCon">
            <i className='iconfont'  onClick={handleAnimation}>&#xe623;</i>
          </div>
      </div>
      <ShortcutKeys isAnimating={isAnimating}></ShortcutKeys>
    </div>
  );
};

export default Assit;
