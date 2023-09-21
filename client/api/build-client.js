import axios from 'axios';

export const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // server
        return axios.create({
            baseURL: 'http://www.ticket-machine.xyz',
            headers: req.headers,
        });
    } else {
        // browser
        return axios.create({
            baseURL: '/',
        });
    }
};
