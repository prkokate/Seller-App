import React, { Component } from 'react'
import './Navbar.css'

export default class Results extends Component {
  render() {
    // let results=this.props;
    // results=[];
    return (
      
         <div className='srcresult' >
       {
       this.props.results && this.props.results.map((articles)=>{
        //  console.log(articles);
        // slice() function limits the no. of names shown to 5(here).
        return  <div key={articles.url} className='results' ><a href={articles.url}  target='_blank' rel='noreferrer' > {articles.title.slice(0,40)} </a></div> 
     })}
      </div>
    )
  }
}