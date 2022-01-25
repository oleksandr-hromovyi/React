import { useState, useEffect } from 'react';
import './newsInfo.scss';
import useNewsService from '../../Services/NewsService';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
   
const NewsInfo = (props) => {
        
    const [arr, setNewsArr] = useState(null);
   

    const {loading, error, getAllNews} = useNewsService();

    useEffect(()=> {
        updateNews()
    }, [props.newsId])


    const updateNews =()=> {
        const {newsId} = props;
        if(!newsId && newsId !==0) {
            return;
        }
         
            getAllNews(newsId)
            .then(res => {
                //console.log(res)
                setNewsArr(res.articles[newsId]);
                //console.log(res.articles[newsId])
        })
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
        {arr.urlToImage ? <img src={arr.urlToImage} alt="news icon"/> : <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="no image available"/ >}
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