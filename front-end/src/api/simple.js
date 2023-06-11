import axios from 'axios';

const url = 'http://localhost:3000';

export const = (data) => {
    // eslint-disable-next-line no-console
    const authenticate = axios.post(`${url}/`, data);
    
    return authenticate;
};
