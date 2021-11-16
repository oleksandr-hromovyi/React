import logo from './logo.svg';
import './App.css';
import data from './news.json';


function App() {
	const getFormattedDate = (dateStr) => {
		const date = new Date(dateStr.replaceAll(` `, ``));
		return date.toLocaleString();
	}
	
	return (
     <div>
       {data.map((item, index) =>
        	<div className = "block" key={`${item.id}${index}`}>
        		<span key={item.id} className="block-id"><b>Id:</b> {item.id}</span>
        		<hr/>
        		<h2 key={`${item.id} ${item.title}`} 
        			className={item.isSpecial === true ? "block-title_specialnews" : "block-title" } 
        		>{item.title}</h2>
         		<div className="block-content" dangerouslySetInnerHTML={{
       				__html: item.content}}/>     
        		<span key={`${item.id} ${item.dateCreated}`}>{getFormattedDate(item.dateCreated)}</span>
        		<ul>
        		{item.categories.map((item) => 
		        	<li data-id={item.id}>{item.name}</li>)}
				</ul>
				{item.link !== null && <a href={item.link} class="content-link">link</a> }
				{item.photo && <img src={item.photo} alt="" height="200px" width="200px"/>}
				{item.author && <p><em>{item.author}</em></p>}
          	</div> 
        	)}
     </div>
  );
}

export default App;
