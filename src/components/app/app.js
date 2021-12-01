import React, { Component } from 'react';
import './app.css';
import data from '../news.json';
import {NewsFilter} from '../news-filter/news-filter';
import {NewsList} from '../news-list/news-list';

export class App extends Component {
	state = {
    hasPicture: false,
    hasLink: false,
    isSpecial: false,
    search: '',
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

  render() { 
  		const { hasPicture, hasLink, isSpecial, search} = this.state;
  let dataRender = data.filter((el) => {
    if (hasPicture && el.photo === null) return false;
    if (hasLink && el.link === null) return false;
    if (isSpecial && el.isSpecial === false) return false;
    if(el.title.toLowerCase().indexOf(search.toLowerCase())<0) return false;
  
   return true;
   });

  return (


  	<div>
  		<NewsFilter
	  hasPicture={hasPicture}
    hasLink={hasLink}
    isSpecial={isSpecial}
    search={search}
    onChangeHasPicture={this.handleChangeHasPicture}
    onChangeHasLink={this.handleChangeHasLink}
    onChangeIsSpecial={this.handleChangeIsSpecial}
    onChangeSearch={this.handleChangeSearch}
  		 />
  		<NewsList items={dataRender} />
  		
  	</div>
  	)
} }
  
export default App;