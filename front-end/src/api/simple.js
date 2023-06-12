import axios from 'axios';

const url = 'http://127.0.0.1:3008';

export const getStarts = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/starInMovies`, data);
    
    return send;
};

export const postPlayedInBoth = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/playedInBoth`, data);
    
    return send;
};

export const actedInAtLeast = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/actedInAtLeast`, data);
    
    return send;
};

export const directedAllGenres = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/directedAllGenres`, data);
    
    return send;
};

export const highestRated = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/highestRated`, data);
    
    return send;
};

export const avgRating = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/avgRating`, data);
    
    return send;
};

export const higherThanAverage = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/higherThanAverage`, data);
    
    return send;
};

export const oneMovieBetween = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/oneMovieBetween`, data);
    
    return send;
};


export const directorsWithLowerRating = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/directorsWithLowerRating`, data);
    
    return send;
};

export const genreCount = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/genreCount`, data);
    
    return send;
};

export const getMostVoted = () => {
    // eslint-disable-next-line no-console
    const send = axios.get(`${url}/getMostVoted`);
    
    return send;
};


export const getAllGenres = () => {
    // eslint-disable-next-line no-console
    const send = axios.get(`${url}/getAllGenres`);
    
    return send;
};

export const getBestOfGenres = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/getBestOfGenres`, data);
    
    return send;
};

export const allMoviesOfAStar = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/allMoviesOfAStar`, data);
    
    return send;
};

export const allMoviesDirectedBy = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/allMoviesOfADirector`, data);
    
    return send;
};


export const getCastOfTheMovie = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/getCastOfTheMovie`, data);
    
    return send;
};
