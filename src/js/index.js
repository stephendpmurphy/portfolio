import "../sass/main.scss";
import axios from 'axios';
import * as skillView from './view/skillView';
import * as projectView from './view/projectView';
import { elements, renderLoader, clearLoader, renderFailedToLoad, clearFailedToLoad } from './view/base';

async function retrieveSkills() {
    const skillsAPI = axios.create({
        baseURL: 'https://api.stephendpmurphy.com/skills',
        timeout: 1500,
        method: 'get',
    });

    try {
        // Display the loader
        renderLoader(elements.skillsList);
        // Retrieve the skills list
        const resp = await skillsAPI.get('/');
        if( resp.data.length > 0 ) {
            // Remove the loader
            clearLoader(elements.skillsList);
            // Results found.. Display them
            skillView.renderSkills(resp.data);
        }
        else {
            // Remove the loader
            clearLoader(elements.skillsList);
            // No skills found. Render failed to load
            renderFailedToLoad(elements.skillsList);
        }
    }
    catch(err) {
        // Remove the loader
        clearLoader(elements.skillsList);
        // No skills found. Render failed to load
        renderFailedToLoad(elements.skillsList);
    }
}

async function retrieveProjects() {
    const projectsAPI = axios.create({
        baseURL: 'https://api.stephendpmurphy.com/projects',
        timeout: 1500,
        method: 'get',
    });

    try {
        // Display the loader
        renderLoader(elements.projectList);
        // Retrieve the projects list
        const resp = await projectsAPI.get('/');
        if( resp.data.length > 0 ) {
            // Remove the loader
            clearLoader(elements.projectList);
            // Results found.. Display them
            projectView.renderProjects(resp.data);
            // Add all of our event listeners to the projects
            const expand_btns = document.querySelectorAll('.project__expand');
            expand_btns.forEach( (el) => {
                el.addEventListener('click', () => {
                    el.parentElement.classList.toggle('project__active');
                })
            })
        }
        else {
            // Remove the loader
            clearLoader(elements.projectList);
            // No skills found. Render failed to load
            renderFailedToLoad(elements.projectList);
        }
    }
    catch(err) {
        // Remove the loader
        clearLoader(elements.projectList);
        // No projects found. Render failed to load
        renderFailedToLoad(elements.projectList);
    }
}

retrieveSkills();
retrieveProjects();