import axios from 'axios';

export default class Skills {
    constructor() {
    };

    async getSkills() {
        const skillsAPI = axios.create({
            baseURL: 'https://api.github.com/repos/stephendpmurphy',
            timeout: 1500,
            method: 'get',
        });

        try {
            const {data} = await skillsAPI.get('/stephendpmurphy');
            this.results = data.topics;
        } catch(error) {
            console.log(error);
        }
    }
}