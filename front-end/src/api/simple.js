import axios from 'axios';

const url = 'http://127.0.0.1:3008';

export const getStarts = (data) => {
    // eslint-disable-next-line no-console
    const authenticate = axios.post(`${url}/`, data);
    
    return authenticate;
};
