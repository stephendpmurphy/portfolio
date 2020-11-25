const axios = require('axios').default;
import "../sass/main.scss";

const skillsAPI = axios.create({
    baseURL: 'https://stephenmurphy-backend.herokuapp.com/api/skills',
    timeout: 1000,
    method: 'get',
});

async function retrieveSkills() {
    const resp = await skillsAPI.get('/');
    console.log(resp.data);
}

retrieveSkills();