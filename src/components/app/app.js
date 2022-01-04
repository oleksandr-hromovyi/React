import {Component} from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomNews from "../randomNews/RandomNews";
import NewsList from "../newsList/NewsList";
import NewsInfo from "../newsInfo/NewsInfo";

import decoration from '../../resources/img/paper.png';

class App extends Component {
    state = {
        selectedNews : null,
    }

    onNewsSelected = (id) => {
        this.setState({
            selectedNews : id,
            })
    }
    render(){
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomNews/>
                <div className="char__content">
                    <NewsList onNewsSelected={this.onNewsSelected}/>
                    <NewsInfo newsId={this.state.selectedNews}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="newspaper" height="200px"/>
            </main>
        </div>
    )
}
}
export default App;