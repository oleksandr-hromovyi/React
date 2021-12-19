import React, { Component } from 'react';
import './app.css';
import data from '../news.json';
import {NewsFilter} from '../news-filter/news-filter';
import {NewsList} from '../news-list/news-list';
import {NewsCreator} from '../news-creator/news-creator';

export class App extends Component {
	state = {
    hasPicture: false,
    hasLink: false,
    isSpecial: false,
    search: '', 
    isEditing: false,
    hasCategory: '',

  }

    handleChangeHasPicture = (newHasPicture) => {
    this.setState({
      hasPicture: newHasPicture,
    })
  };

  handleChangeHasLink = (newHasLink) => {
    this.setState({
      hasLink: newHasLink,
    })
  };

   handleChangeIsSpecial = (newIsSpecial) => {
    this.setState({
      isSpecial: newIsSpecial,
    })
  };

  handleChangeSearch = (newSearch) => {
    this.setState({
      search: newSearch,
    })
  };

 handleChangeHasCategory = (newCategory) => {
    this.setState({
      hasCategory: newCategory,
    })
  };




  render() { 
  		const { hasPicture, hasLink, isSpecial, search, isEditing, hasCategory} = this.state;
  let dataRender = data.filter((el) => {
    
    if (hasPicture && el.photo === null) return false;
    if (hasLink && el.link === null) return false;
    if (isSpecial && el.isSpecial === false) return false;
    if(el.title.toLowerCase().indexOf(search.toLowerCase())<0 && 
       el.content.toLowerCase().indexOf(search.toLowerCase())<0 && 
       el.author.toLowerCase().indexOf(search.toLowerCase())<0 ) return false;
    
   // el.categories.map((el)=>(el.name))
   
   return true;
   });

  return (


  	<div>
  		<NewsFilter
    hasCategory={hasCategory}
	  hasPicture={hasPicture}
    hasLink={hasLink}
    isSpecial={isSpecial}
    search={search}
    onChangeHasCategory={this.handleChangeHasCategory}
    onChangeHasPicture={this.handleChangeHasPicture}
    onChangeHasLink={this.handleChangeHasLink}
    onChangeIsSpecial={this.handleChangeIsSpecial}
    onChangeSearch={this.handleChangeSearch}
    data={data}
  		 />

    <button onClick={()=> this.setState ({isEditing: !isEditing})}>{isEditing ? "Close" : "Add news"}</button>
{isEditing && (
   <NewsCreator onAddNews={console.log}/>
  )}
      

  		<NewsList items={dataRender} />
  		
  	</div>
  	)
} }
  
export default App;