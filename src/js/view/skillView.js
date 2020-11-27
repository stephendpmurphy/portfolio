import { elements } from './base'
import Badge from '../models/Badge';

export const renderSkills = skills => {
    // If the list given to us is empty, then just return
    if( skills.length < 1 ) return;

    // Create an empty markup var to hold all of the html we are about to create
    var markup = '';

    skills.forEach(element => {
        // Create a new badge with our provided config
        const badge = new Badge(element.skill, {
            color: "gray",
        });

        // Generate the markup
        badge.create();

        // Store the generated markup
        markup += badge.markup;
    });

    elements.skillsList.insertAdjacentHTML('afterbegin', markup);
}

export const clearSkills = () => {
    elements.skillsList.innerHTML = "";
}