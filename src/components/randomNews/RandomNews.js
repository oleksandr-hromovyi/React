import {useState, useEffect} from 'react';
import './randomNews.scss';
import newsIcon from '../../resources/img/newsIcon.png';
import useNewsService from '../../Services/NewsService';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



const RandomNews =(props) => {

       const [author, setAuthor] = useState(null);
       const [title, setTitle] = useState(null);
       const [description, setDescription] = useState(null);        
       const [url, setUrl] = useState(null);
       const [urlToImage, setUrlToImage] = useState(null);
       const [publishedAt, setPublishedAt] = useState(null);
      
       
     
   useEffect (()=>{
    updateNews();
    
   },[])

   const {loading, error, getAllNews} = useNewsService();

      const updateNews=()=> {
       let id = Math.floor(Math.random() * (20 - 0) + 0);
            getAllNews()
            .then(res => {
                setAuthor(res.articles[id].author);
                setTitle(res.articles[id].title);
                setDescription(res.articles[id].description);
                setUrl(res.articles[id].url)
                setUrlToImage(res.articles[id].urlToImage);
                setPublishedAt(res.articles[id].publishedAt);
             })
         
    }

   
    const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); }
        
    let infoBlock =  <div className="randomchar__block">
      
{urlToImage ? <img src={urlToImage} className="randomchar__img" alt="news photo"/> : <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"  className="randomchar__img" alt="no image available"/ >}
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
                    <button className="button button__main" onClick={updateNews}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={newsIcon} alt="news icon" className="randomchar__decoration" height="100px"/>
                </div>
            </div>
        )
} 
export default RandomNews;