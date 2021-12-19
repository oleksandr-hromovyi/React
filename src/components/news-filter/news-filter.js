import React, { Component } from 'react';


export class NewsFilter extends Component {

  state = {
    checked: {},
  }
 handleChangeSearch = (e) => {
    let { onChangeSearch } = this.props;
    let { currentTarget } = e;
    onChangeSearch(currentTarget.value);
  };

handleSelect = (value) => {
  console.log(value)
  this.setState ({
    checked: {
      ...this.state.checked,
      [value]: !this.state.checked[value],
    }
  })

}


  render() { 
  	 const {
	  hasPicture,
    hasLink,
    isSpecial,
    search,
    hasCategory,
    onChangeHasPicture,
    onChangeHasLink,
    onChangeIsSpecial,
    onChangeHasCategory,
    data,
    } = this.props;

    let {checked} = this.state;

    let categories = data.map((el)=> {
      let finalArr = el.categories.map((el)=>{
        let arr=[];
        arr.push(el.name )
        return arr;
      });
      return finalArr.flat();
    })



let list = new Set(categories.flat());
let myArr = Array.from(list)

{/*this.props.onAddCategories(myArr);*/}




 
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
    <span><b>Categories:</b></span>
    <div >
   { myArr.map((value, index) => {
  return <button key={value} style={{marginRight: 5 + 'px', marginTop: 5 + 'px'}}
 onClick={()=> this.handleSelect(value) } checked={hasCategory}
 >
  {value} {this.state.checked[value] && '✅'}</button>
})}
</div>



  

    </div>
  	)
} }
  