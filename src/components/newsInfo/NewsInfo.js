import { useState, useEffect } from 'react';
import './newsInfo.scss';
import NewsService from '../../Services/NewsService';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
   
const NewsInfo = (props) => {
        
    const [arr, setNewsArr] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const newsService = new NewsService();

    useEffect(()=> {
        updateNews()
    }, [props.newsId])




    const updateNews =()=> {
        const {newsId} = props;
        if(!newsId && newsId !==0) {
            return;
        }
        onNewsLoading();
        newsService
            .getAllNews(newsId)
            .then(res => {
                //console.log(res)
                setNewsArr(res.articles[newsId]);
                //console.log(res.articles[newsId])
                setLoading(false);
            })
            .catch(onError)
    }


    const onNewsLoading = () => {
        setLoading(true);
    }

    const onError =()=> {
    console.log(`error`)
        setLoading(false);
        setError(true);
    }

    const skeleton = arr || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !arr) ? <View arr={arr}/> : null;
    return (
        <div className="char__info">
        {skeleton}
        {content}
        {errorMessage}
        {spinner}
        </div>
    )
}

const View = ({arr}) => {
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