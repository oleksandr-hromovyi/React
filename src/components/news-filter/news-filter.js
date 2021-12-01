import React, { Component } from 'react';

export class NewsFilter extends Component {

 handleChangeSearch = (e) => {
    let { onChangeSearch } = this.props;
    let { currentTarget } = e;
    onChangeSearch(currentTarget.value);
  };



  render() { 
  	 const {
	  hasPicture,
    hasLink,
    isSpecial,
    search,
    onChangeHasPicture,
    onChangeHasLink,
    onChangeIsSpecial,
    } = this.props;

 
  return (
  	<div> 

  	<span><b>Filters</b></span>

    <label className="filters__label"> 
    <input 
		onChange={() => onChangeHasPicture(!hasPicture)}
 		 type="checkbox" checked={hasPicture} /> <span>Has Picture</span>
    </label>

    <label className="filters__label"> 
  
    <input 
	onChange={() => onChangeHasLink(!hasLink)}
  	type="checkbox" checked={hasLink} /> <span>Has Link</span>
    </label>

    <label className="filters__label"> 
    <input 
	onChange={() => onChangeIsSpecial(!isSpecial)}
    type="checkbox" checked={isSpecial} /> <span>Breaking News</span>
    </label>

    <label className="filters__label"> 
      <input
              type="text"
              value={search}
              onChange={this.handleChangeSearch}
            />
    </label>
    </div>
  	)
} }
  