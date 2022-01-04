import {Component} from 'react';
import './newsList.scss';
import NewsService from '../../Services/NewsService';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class NewsList extends Component {

            
    state = {        
        arr: [],
        loading: true,
        error: false,
        newsItem: 9,
     };

    componentDidMount(){
        this.updateChar();
    }

    newsService = new NewsService();

    onNewsLoading() {
        this.setState ({
            loading: true,
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.newsItem !== prevProps.newsItem) {
            this.updateChar();
        }

    }

    updateChar=()=> {

        this.onNewsLoading();
        this.newsService
            .getAllNews()
            .then(res => {
               // console.log(res)
                this.setState({
                    arr: res.articles,
                    loading: false,
                    newsItemLoading: false,

                }) 
            })
            .catch(this.onError)
            
}

onError =()=> {
    //console.log(`error`)
    this.setState({
            loading: false,
            error: true,
        })

}

    renderItems(arr, newsItem) {
        //console.log(newsItem)

        const items =  arr.map((item, index) => {
            if (index < newsItem) {
            return (
                <li 
                    className="char__item"
                    key={index} onClick={() => this.props.onNewsSelected(index)}>
                        <img src={item.urlToImage} alt="news photo"/>
                        <div className="char__name">{item.title}</div>
                </li>
            )}
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    render() {

        const {loading, error,arr, newsItem, newsItemLoading} = this.state;
        

const items = this.renderItems(arr, newsItem);
           
 const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

            

    

    
 return ( <div className="char__list">
  {errorMessage}
                {spinner}
                {content}

            <button 
            className="button button__main button__long"
            onClick={()=>this.setState({newsItem: newsItem + 3})}
            style={{'display': newsItem >= 20 ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            
            </button>
        </div>
    )
}
}

export default NewsList;