import * as React from 'react';
import './index.scss'
interface SearchProps {
  
}
 
interface SearchState {
  
}
 
class Search extends React.Component<SearchProps, SearchState> {
  // constructor(props: SearchProps) {
  //   super(props);
  //   this.state = { :  };
  // }
  render() { 
    return ( 
      <>
        <div className='search'>
          <div className="searchCon">
              <input type="text" placeholder='输入搜索内容' />
              <div className="font">
                <i className='iconfont'>&#xe61a;</i>
                <i className='iconfont'>&#xe659;</i>
                <i className='iconfont'>&#xe65c;</i>
                <i className='iconfont'>&#xed1a;</i>
              </div>
          </div>
        </div>
      </>
     );
  }
}
 
export default Search;