import { elements } from './base'
import * as badge from '../view/badge';

export const renderSkills = skills => {
    // If the list given to us is empty, then just return
    if( skills.length < 1 ) return;

    // Create an empty markup var to hold all of the html we are about to create
    var markup = '';

    skills.forEach(i => {
        markup += badge.createBadge( {
            badgeTxt: i,
            color: "gray"
        })
    });

    elements.skillsList.insertAdjacentHTML('afterbegin', markup);
}

export const clearSkills = () => {
    elements.skillsList.innerHTML = "";
}