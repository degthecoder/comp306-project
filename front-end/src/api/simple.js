import axios from 'axios';

const url = 'http://127.0.0.1:3008';

export const getStarts = (data) => {
    // eslint-disable-next-line no-console
    const send = axios.post(`${url}/starsDirectedBy`, data);
    
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


