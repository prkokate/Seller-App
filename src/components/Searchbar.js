import React, { Component } from 'react'
import './Navbar.css'

export default class Searchbar extends Component {


    constructor(){
        super();
        this.state={
            text:""
        }
    }

    handlechange= async(event)=>{
    this.setState({
        text: event.target.value
    });
    let searchtxt=event.target.value;
    // fetch("https://jsonplaceholder.typicode.com/users").then((response)=>response.json()).then((users)=>{
    //     const results=users.filter((user)=>{
    //         return user && user.name && user.name.toLowerCase().includes(searchtxt);         \\METHOD 2
    //   })
    //   console.log(results);
    // })
    if(searchtxt!==""){
    let url= await fetch(`https://newsapi.org/v2/top-headlines?q=${searchtxt}&apiKey=e4509d5d89db45dab1b3ee1e7cba6811&page=1&pageSize=50`);
    
    let users= await url.json();
    if(users.articles && users.articles.length>0){
        // console.log(users.articles);
        // const results=users.filter((user)=>{
        //         return searchtxt && user && user.name && user.name.toLowerCase().includes(searchtxt.toLowerCase());  
        // })
        this.props.SearchName(users.articles);
        
    }
}
else{
    this.props.SearchName(null);
}
this.props.searchText(searchtxt);
    

    // console.log(results);
}


  render() {
   
    return (
        <input value={this.state.text} onChange={this.handlechange} type="text" id='search' placeholder= 'Search for categories,names and more..' />
    )
  }
}


