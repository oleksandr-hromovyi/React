import {Component} from 'react';
import './newsInfo.scss';
import NewsService from '../../Services/NewsService';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
   
class NewsInfo extends Component {
                state = {
        arr: null,
        loading: false,
        error: false,
        
    };

    newsService = new NewsService();

    componentDidMount(){
        this.updateNews();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.newsId !== prevProps.newsId) {
            this.updateNews();
        }

    }

    updateNews =()=> {
        const {newsId} = this.props;
        if(!newsId && newsId !=0) {
            return;
        }
        this.onNewsLoading();
        this.newsService
            .getAllNews(newsId)
            .then(res => {
                console.log(res)
                this.setState({
                    arr: res.articles[newsId],
                    loading: false,
               }) 
            })
            .catch(this.onError)
    }


    onNewsLoading() {
        this.setState ({
            loading: true,
        })
    }

    onError =()=> {
    console.log(`error`)
    this.setState({
            loading: false,
            error: true,
        })

}

    render() {
  const {loading, error,arr} = this.state;

  const skeleton = arr || loading || error ? null : <Skeleton/>
  const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !arr) ? <View arr={arr}/> : null;
        console.log(content)
    return (
        <div className="char__info">
        {skeleton}
           {content}
        {errorMessage}
        {spinner}
        </div>
    )
}
}
const View = ({arr}) => {
   
    console.log(arr)
    return (
        <>
         <div className="char__basics">
                <img src={arr.urlToImage} alt="news icon"/>
                <div>
                    <div className="char__info-name">{arr.title}</div>
                    <div className="char__btns">
                        <a href={arr.url} className="button button__main" target="_blank" rel="noreferrer">
                            <div className="inner">homepage</div>
                        </a>

                    </div>
                </div>
            </div>
            <div className="char__descr"> {arr.description}

            </div>
                        </>
        )
}

export default NewsInfo;