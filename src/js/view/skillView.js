import { elements } from './base'

export const renderSkills = skills => {
    // If the list given to us is empty, then just return
    if( skills.length < 1 ) return;


    // Create an empty markup var to hold all of the html we are about to create
    var markup = '';

    skills.forEach(element => {
        const template = `<p class="badge badge-gray">${element.skill}</p>`;
        markup += template;
    });

    elements.skillsList.insertAdjacentHTML('afterbegin', markup);
}

export const clearSkills = () => {
    elements.skillsList.innerHTML = "";
}