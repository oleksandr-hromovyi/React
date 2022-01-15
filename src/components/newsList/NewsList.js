import { useState, useEffect, useRef} from 'react';
import './newsList.scss';
import NewsService from '../../Services/NewsService';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const NewsList = (props) => {

    const [arr, setNewsArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newsItem, setNewsItem] = useState (9); 
  

    const newsService = new NewsService();

    useEffect(()=>{
        updateNews();
    }, []);
        

    const onNewsLoading = () => {
        setLoading(true);
    }

    const updateNews=()=> {
        onNewsLoading();
        newsService
            .getAllNews()
            .then(res => {
            // console.log(res)
                setNewsArr(res.articles);
                setLoading(false);
                
             }) 
             .catch(onError)
                
    }

    const onError =()=> {
        //console.log(`error`)
            setLoading(false);
            setError(true);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
            itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
            itemRefs.current[id].classList.add('char__item_selected');
            itemRefs.current[id].focus();
    }

    function renderItems (arr, newsItem) {
            //console.log(newsItem)

        const items =  arr.map((item, index) => {
            if (index < newsItem) {
            return (
                <li className="char__item"
                    ref={item => itemRefs.current[index] = item}
                    key={index} 
                    onClick={() => { 
                            props.onNewsSelected(index);
                            focusOnItem(index);}}
                        tabIndex={0}
                        key={index}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                 props.onNewsSelected(index);
                                 focusOnItem(index);}}}>
                            <img src={item.urlToImage} alt="news photo"/>
                            <div className="char__name">{item.title}</div>
                    </li>
                )}
            });
            // Конструкция вынесена для центровки спиннера/ошибки
            return (
                <ul className="char__grid">
                    {items}
                </ul>
            )
        }
        
        const items = renderItems(arr, newsItem);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return ( <div className="char__list">
                        {errorMessage}
                        {spinner}
                        {content}
                        <button 
                        className="button button__main button__long"
                        onClick={()=>setNewsItem(newsItem + 3)}
                        style={{'display': newsItem >= 20 ? 'none' : 'block'}}>
                            <div className="inner">load more</div>
                        </button>
                     </div>
        )
}

export default NewsList;