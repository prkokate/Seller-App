

import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
// import Carsitem from './components/Carsitem'
import Cars from './components/Cars';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';



export default function App() {
  return (
<div className="App">
  <div className="container">
  
        <Router>
  
        <Navbar/>
    <Routes>
    <Route exact path="/" element={<Cars/>} />
        
    </Routes>
        </Router>
  </div>
</div>
  )
}

        
        
        
    // ) return (
    //   <Router>
    //   <div  className='App' >
    //   <Navbar searchText={this.setsrctext} srcRes={this.setSrcRes}  id="navbar" />
    //   <LoadingBar
    //   color='#f11946'
    //   progress={this.state.progress}
    //   // onLoaderFinished={() => setProgress(0)}
    // />
    //   <br /><br /><br /><br /><br /><br />
      
      
{/*       
        <Routes> */}
  {/***VERY IMP : Give UNIQUE "key" to every element to for RE-MOUNT of every element. If not, New page won't be loaded */}
          {/* <Route exact path='/' element={<Cars search={0} setProgress={this.setProgress} key="general" categ="general" country='in' PageSize={this.pagesize}/>}/>
          <Route exact path='/business' element={<Cars search={0} setProgress={this.setProgress} key="business" categ="business" country='in' PageSize={this.pagesize}/>}/>
          <Route exact path='/sports' element={<Cars search={0} setProgress={this.setProgress} key="sports" categ="sports" country='in' PageSize={this.pagesize}/>}/>
          <Route exact path='/entertainment' element={<Cars search={0} setProgress={this.setProgress} key="entertainment" categ="entertainment" country='in' PageSize={this.pagesize}/>}/>
          <Route exact path='/technology' element={<Cars search={0} setProgress={this.setProgress} key="technology" categ="technology" country='in' PageSize={this.pagesize}/>}/>
          <Route exact path='/science' element={<Cars search={0} setProgress={this.setProgress} key="science" categ="science" country='in' PageSize={this.pagesize}/>}/>
          <Route exact path='/search' element={<Cars  q={this.state.searchResult} search={1} setProgress={this.setProgress} key="search" categ={this.state.srctext} />} />
        </Routes>
      <br /><br /><br /><br /><br /> */}
  


