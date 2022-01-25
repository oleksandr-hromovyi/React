import {useHttp} from '../hooks/http.hook';


const useNewsService = () => {

	const {loading, request, error, clearError} = useHttp();

	const apiBase = "https://newsapi.org/v2/top-headlines?country=ua&apiKey=f7641b7094da4a27afa113370148874e";



	const getAllNews = async () => {
		return await request(apiBase);
	}

	
 return {loading, error, getAllNews}
	

}

export default useNewsService;

