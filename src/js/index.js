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
            const projects = document.querySelectorAll('.project');
            projects.forEach( (proj) => {
                proj.addEventListener('click', () => {
                    proj.classList.toggle('project__active');
                })
            })
            // Add an event listener to all of my Github links and
            // prevent event propogation
            const githubLinks = document.querySelectorAll('.project__link-url')
            githubLinks.forEach( (link) => {
                link.addEventListener('click', (e) => {
                    // e.preventDefault();
                    e.stopPropagation();
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