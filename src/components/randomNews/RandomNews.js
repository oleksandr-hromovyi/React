import {Component} from 'react';
import './randomNews.scss';
import newsIcon from '../../resources/img/newsIcon.png';
import NewsService from '../../Services/NewsService';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



class RandomNews extends Component {

    state = {
        author: null,
        title: null,
        description: null,
        url: null,
        urlToImage: null,
        publishedAt: null,
        loading: true,
        error: false,
        
     
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


    updateChar=()=> {
       let id = Math.floor(Math.random() * (20 - 0) + 0);
        this.onNewsLoading();
        this.newsService
            .getAllNews()
            .then(res => {
                console.log()
                this.setState({
                author: res.articles[id].author,
                title: res.articles[id].title,
                description: res.articles[id].description,
                url: res.articles[id].url,
                urlToImage: res.articles[id].urlToImage,
                publishedAt: res.articles[id].publishedAt,
                loading: false,
                }) 
            })
            .catch(this.onError)
    }

    onError =()=> {
        console.log(`error`)
        this.setState({
                loading: false,
                error: true,
            })
    }

    render(){
       
    const {error,author, title, description, url, urlToImage, publishedAt, loading} = this.state;

    const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); }
        
    let infoBlock =  <div className="randomchar__block">
        {urlToImage &&  <img src={urlToImage} alt="Random news" className="randomchar__img"/>}

            <div className="randomchar__info">
                <span className="randomchar__date">{getFormattedDate(publishedAt)}</span>
                    <p className="randomchar__newsTitle">{title}</p>
                    <p className="randomchar__descr">{description}</p>
                    {author && <p className="randomchar__author">{author}</p> }
                       
                    <div className="randomchar__btns">
                        <a href={url} className="button button__main" target="_blank" rel="noreferrer">
                         <div className="inner">link</div>
                        </a>
                            
                    </div>
                </div>
                </div>
       return (
            <div className="randomchar">
            {loading ? <Spinner/> : null}
          {/*  {error ? <ErrorMessage/> : null} */}
            {!(error || loading) ? infoBlock : null}



                
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random news for today!<br/>
                        Do you want to get to know it better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={newsIcon} alt="news icon" className="randomchar__decoration" height="100px"/>
                </div>
            </div>
        )
} }

export default RandomNews;