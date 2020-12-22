import { elements } from './base'
import * as badge from '../view/badge';

export const renderProjects = projects => {
    // If the list given to us is empty, then just return
    if( projects.length < 1 ) return;

    // Create an empty markup var to hold all of the html we are about to create
    var markup = '';
    var tagsMarkup = '';

    projects.forEach(project => {
        tagsMarkup = '';

        project.tags.forEach( tag => {
            tagsMarkup += badge.createBadge( {
                badgeTxt: tag,
                color: "white",
                scale: "noScale",
                size: "small"
            })
        })

        // Store the generated markup
        markup += `<div class="project">
                        <p class="project__name">${project.name}</p>
                        <div class="project__desc">
                            <p class="project__about">${project.desc}</p>
                            <div class="project__link">
                                <img class="project__link-figure" src="assets/github.svg">
                                <a href="${project.proj_url}" target="_blank">
                                    <p class="project__link-url">View on Github</p>
                                </a>
                            </div>
                            <div class="project__tags">${tagsMarkup}</div>
                        </div>
                        <img class="project__expand" src="assets/expand.svg">
                    </div>`;
    });

    elements.projectList.insertAdjacentHTML('afterbegin', markup);
}

export const clearProjects = () => {
    elements.projectList.innerHTML = "";
}