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
            renderFailedToLoad(elements.projectList);
        }
    }
    catch(err) {
        console.log(err);
        // Clear the loader
        clearLoader(elements.skillsList);
        // No skill found. Render failed to load
        renderFailedToLoad(elements.projectList);
    }
}

async function controlProjects() {
    try {
        // Clear the projects view
        projectView.clearProjects();

        // Projects query string
        const query = window.location.hash.replace('#', '');

        // Create a new instance of our projects class
        state.projects = new Project();

        // Display a loader in the projects list
        renderLoader(elements.projectList);

        // Retrieve our projects
        await state.projects.getProjects();

        // Filter our projects list if a query string was given
        if( query !== '' ) {
            state.projectsForDisplay = filterProjects(state.projects.results, query);
        }
        else {
            state.projectsForDisplay = state.projects.results;
        }

        // Clear the loader
        clearLoader(elements.projectList);

        if( state.projectsForDisplay.length > 0 ) {
            // Results found.. Display them
            projectView.renderProjects(state.projectsForDisplay);

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
            console.log("no projects to render");
            // No projects found. Render failed to load
            renderNoProjects();
        }
    }
    catch(err) {
        console.log(err);
        // Remove the loader
        clearLoader(elements.projectList);
        // No projects found. Render failed to load
        renderFailedToLoad(elements.projectList);
    }
}

const filterProjects = (projectsList, queryString) => {
    const filteredList = [];

    if( queryString === '' ) {
        return projectsList;
    }

    if( projectsList.length > 0 ) {
        // Iterate through all of our projects
        projectsList.forEach( (proj) => {
            for( var i=0; i < proj.tags.length; i++) {
                if( proj.tags[i].toUpperCase() === queryString.toUpperCase() ) {
                    filteredList.push(proj);
                    break;
                }
            }
        })
    }

    return filteredList;
}

const setupSearchEvents = () => {
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', () => {
        const search = document.querySelector('.search');
        search.classList.toggle('search-active');
        // Focus on the text field input
        const searchField = document.querySelector('.search-field');
        searchField.focus();
    })

    //setup before functions
    let typingTimer;                //timer identifier
    let doneTypingInterval = 500;  //time in ms
    let searchInput = document.querySelector('.search-field');

    //on keyup, start the countdown
    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (searchInput.value) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
        else {
            console.log("input empty!");
            doneTyping();
        }
    });
}

// Function executed when user has finished typing
function doneTyping () {
    let searchInput = document.querySelector('.search-field');
    history.pushState(null, null, `#${searchInput.value}`);
    hashChangeFunc();
}

function hashChangeFunc() {
    console.log("hash change!");
    // If the search bar is not active.. Then make it active and then set the current value
    // to our new hash
    const search = document.querySelector('.search');
    if( !search.classList.contains('search-active') ) {
        // Toggle the active class
        search.classList.toggle('search-active');
    }

    // Set the current field value to our hash
    const query = window.location.hash.replace('#', '');
    let searchInput = document.querySelector('.search-field');
    searchInput.value = query.toLowerCase();

    // Focus on the text field input
    const searchField = document.querySelector('.search-field');
    searchField.focus();

    // Render the new value
    controlProjects();

    console.log("Scrolling to the search bar");
    // Scroll to the projects div to display as many as possible.
    document.querySelector('.projects__list').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

setupSearchEvents();

window.addEventListener('load', e => {
    e.preventDefault();
    controlSkills();
    controlProjects();
});

window.addEventListener('hashchange', hashChangeFunc);