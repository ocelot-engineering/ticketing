import axios from 'axios';

const LandingPage = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
    if (typeof window === 'undefined') {
        // executed on server
        const { data } = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
            { headers: req.headers }
        );
        return data;
    } else {
        // executed on browser
        const { data } = await axios.get('/api/users/currentuser');
        return data;
    }
};

export default LandingPage;