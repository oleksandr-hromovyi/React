
class NewsService {

	_apiBase = "https://newsapi.org/v2/top-headlines?country=ua&apiKey=f7641b7094da4a27afa113370148874e";

	getResourse = async (url) => {
		let res = await fetch(url);

		if(!res.ok) {
			throw new Error (`Could not fetch ${url}, status ${res.status}`);
		}
//console.log(res)
		return await res.json();
	}

	getAllNews = async () => {
		return this.getResourse(`${this._apiBase}`);
	}



	

}

export default NewsService;

