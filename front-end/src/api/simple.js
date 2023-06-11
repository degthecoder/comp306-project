import axios from 'axios';

const url = 'http://localhost:3000';

export const fetchLogin = (userData) => {
    // eslint-disable-next-line no-console
    const authenticate = axios.post(`${url}/`, userData);
    
    return authenticate;
};
