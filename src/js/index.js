import "../sass/main.scss";
import * as skillView from './view/skillView';
import * as projectView from './view/projectView';
import Skill from './models/Skill';
import Project from "./models/Project";
import { elements, renderLoader, clearLoader, renderFailedToLoad, renderNoProjects, clearFailedToLoad } from './view/base';

const state = {};

async function controlSkills() {
    try {
        // Create a new instance of our skills class
        state.skills = new Skill();

        // Display a loader in the skills list.
        renderLoader(elements.skillsList);

        // Retrieve our skills
        await state.skills.getSkills();

        // Clear the loader
        clearLoader(elements.skillsList);

        if( state.skills.results.length > 0 ) {
            // Render the results
            skillView.renderSkills(state.skills.results);
        }
        else {
            // No skill found. Render failed to load
            renderFailedToLoad(elements.skillsList);
        }
    }
    catch(err) {
        console.log(err);
        // Clear the loader
        clearLoader(elements.skillsList);
        // No skill found. Render failed to load
        renderFailedToLoad(elements.skillsList);
    }
}

async function controlProjects() {
    try {
        // Clear the failed to load
        clearFailedToLoad(elements.projectList);

        // Clear the projects view
        projectView.clearProjects();

        // Create a new instance of our projects class
        state.projects = new Project();

        // Display a loader in the projects list
        renderLoader(elements.projectList);

        // Retrieve our projects
        await state.projects.getProjects();

        // Clear the loader
        clearLoader(elements.projectList);

        // If any projects were given for display
        if( state.projects.results.length > 0 ) {
            // Results found.. Display them
            projectView.renderProjects(state.projects.results);

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
            // No projects are available for display
            console.log("no projects to render");
            // No projects found. Render a message.
            renderNoProjects();
        }
    }
    catch(err) {
        // Remove the loader
        clearLoader(elements.projectList);
        // No projects found. Render failed to load
        renderFailedToLoad(elements.projectList);
    }
}

window.addEventListener('load', e => {
    e.preventDefault();
    controlSkills();
    controlProjects();
});