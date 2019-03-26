const api_key = '463b8bfc45cbc59423a7200dbfcb5351';


export const getMovie = async (id = 76341)=>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
    const resJSON = await res.json();
    return resJSON;
}

export const getSearchQueryMovie = async (query) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=${api_key}&query=${query}`);
    const resJSON = await res.json();
    return resJSON;
  };


export const discoverMovie = async (popularity, year_min, year_max, generes) => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=${popularity}&include_adult=false&include_video=false&release_date.gte=${year_min}&release_date.lte=${year_max}&with_genres=${generes}`);
    const resJSON = await res.json();
    return resJSON;
  };


  export const getGeneres = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=463b8bfc45cbc59423a7200dbfcb5351`);
    const resJSON = await res.json();
    return resJSON;
  };