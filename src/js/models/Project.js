import axios from 'axios';

export default class Projects {
    constructor() {
    };

    async getProjects() {
        const projectsAPI = axios.create({
            baseURL: 'https://portfolio-backend-ecru.vercel.app/api/projects',
            timeout: 1500,
            method: 'get',
        });

        try {
            const resp = await projectsAPI.get('/');
            this.results = resp.data;
        } catch(error) {
            console.log(error);
        }
    }
}