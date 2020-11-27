import { elements } from './base'
import Project from '../models/Project';

export const renderProjects = projects => {
    // If the list given to us is empty, then just return
    if( projects.length < 1 ) return;

    // Create an empty markup var to hold all of the html we are about to create
    var markup = '';

    projects.forEach(element => {
        // Create a new badge with our provided config
        const project = new Project(element);

        // Generate the markup
        project.create();

        // Store the generated markup
        markup += project.markup;
    });

    elements.projectList.insertAdjacentHTML('afterbegin', markup);
}

export const clearProjects = () => {
    elements.projectList.innerHTML = "";
}