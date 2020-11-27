import "../sass/main.scss";
import axios from 'axios'
import * as skillView from './view/skillView'
import * as projectView from './view/projectView';


const skillsAPI = axios.create({
    baseURL: 'https://api.stephendpmurphy.com/skills',
    timeout: 1000,
    method: 'get',
});

const projectsAPI = axios.create({
    baseURL: 'https://api.stephendpmurphy.com/projects',
    timeout: 1000,
    method: 'get',
});

async function retrieveSkills() {
    const resp = await skillsAPI.get('/');

    skillView.clearSkills();
    skillView.renderSkills(resp.data);
}

async function retrieveProjects() {
    const resp = await projectsAPI.get('/');

    projectView.clearProjects();
    projectView.renderProjects(resp.data);
}

retrieveSkills();
retrieveProjects();