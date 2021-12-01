import React, { Component } from 'react';
import {NewsItem} from '../news-item/news-item';


export class NewsList extends Component {
  render() { 
  let { items } = this.props;
 
  return (
  	<div>
       {items.map((item, index) =>
          <NewsItem key={item.id} item={item}/>
          )}
     </div>
  	)
} }
  