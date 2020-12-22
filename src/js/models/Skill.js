import axios from 'axios';

export default class Skills {
    constructor() {
    };

    async getSkills() {
        const skillsAPI = axios.create({
            baseURL: 'https://api.stephendpmurphy.com/skills',
            timeout: 1500,
            method: 'get',
        });

        try {
            const resp = await skillsAPI.get('/');
            this.results = resp.data;
        } catch(error) {
            console.log(error);
        }
    }
}