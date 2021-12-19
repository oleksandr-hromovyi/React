import React, { Component } from 'react';
import faker from 'faker';
import {getBase64} from '../utils'
import data from '../news.json';

export class NewsCreator extends Component {


state = {
title: "",
content: "",
isSpecial: false,
dateCreated: "",
categories: [], 
link: "",
photo: "",
author: "",
};



handleSubmit = (e) => {
e.preventDefault();
const id = faker.datatype.uuid();
const newsData = this.state;
const news = {
  id,
  ...newsData,
  dateCreated : new Date().toLocaleString(),
};

this.props.onAddNews(news);

};

handleChangeText = (e) => {
 const input = e.currentTarget;
 const {value, name} = input;
 this.setState ({
  [name]: value,
 })
}

handleChangePhoto = (e) => {
  const file = e.currentTarget.files[0];
  getBase64(file, (base64) =>{
     this.setState({
        photo: base64,
  });
       })
}

handleChangeCategories = (e) => {
  const selected = document.querySelectorAll('#newsAddForm-categories option:checked');
  const values = Array.from(selected).map(el => el.value);
     this.setState({
        categories: values,
  });
};



  render() { 

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

   const { title, content, isSpecial, photo, author, link } = this.state
  return (
  	<div className="newsAddForm"> 
    <form onSubmit={this.handleSubmit} className="news-form__content">

    <div>
    <label htmlFor="newsAddForm-title">Enter your title: </label>
    <input type="text" onChange={this.handleChangeText} value={title} name="title" id="newsAddForm-title"/>
    </div>

    <div>
    <label htmlFor="newsAddForm-breakingNews">Is it breaking news? </label>
    <input type="checkbox" onClick={()=> this.setState({isSpecial: !isSpecial})}  value={isSpecial} name="isSpecial" id="newsAddForm-breakingNews"/>
    </div>

    <div>
    <label htmlFor="newsAddForm-photo">Add your news photo </label>
    <input type="file" onChange={this.handleChangePhoto}  id="newsAddForm-photo"
    accept=".jpeg, .jpg, .png"/>
    {/* {photo.length > 0 && (
              <img style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
              }} src={photo} alt=""/>
            )} // preview */ } 
    </div>

    <div>
    <label htmlFor="newsAddForm-content">Enter your content: </label>
    <textarea onChange={this.handleChangeText} value={content} name="content" id="newsAddForm-content"/>
    </div>


     <label htmlFor="newsAddForm-categories">Enter your categories: </label>
    <select multiple size="10" id="newsAddForm-categories" >
    {myArr.map((categories, index)=> {
     return <option key={index} value={categories} onClick={this.handleChangeCategories}>{categories}</option>} )}
    }
     </select>

    <div>
    <label htmlFor="newsAddForm-author">Enter author name: </label>
    <input type="text" onChange={this.handleChangeText} value={author} name="author" id="newsAddForm-author"/>
    </div>

    <div>
    <label htmlFor="newsAddForm-link">Add link: </label>
    <input type="text" onChange={this.handleChangeText} value={link} name="link" id="newsAddForm-link"/>
    </div>

    <div><button type="submit">Send news</button></div>
    
    </form>
</div>



  


  	)
} }
  