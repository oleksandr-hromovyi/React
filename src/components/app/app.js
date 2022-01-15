import { useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomNews from "../randomNews/RandomNews";
import NewsList from "../newsList/NewsList";
import NewsInfo from "../newsInfo/NewsInfo";

import decoration from '../../resources/img/paper.png';

const App = () => {

	const [selectedNews, setSelectedNews] = useState(null);

    const onNewsSelected = (id) => {
        setSelectedNews(id);
            
    }
  
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomNews/>
                <div className="char__content">
                    <NewsList onNewsSelected={onNewsSelected}/>
                    <NewsInfo newsId={selectedNews}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="newspaper" height="200px"/>
            </main>
        </div>
    )
}

export default App;