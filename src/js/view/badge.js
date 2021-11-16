export const createBadge = (config) => {
    var classConfig = '';
    // Parse the class config if any was given
    if( typeof(config) !== 'undefined' ) {
        if( typeof(config.color) !== 'undefined' ) {
            classConfig += `badge-${config.color} `;
        }

        if( typeof(config.scale) !== 'undefined' ) {
            classConfig += `badge-${config.scale} `;
        }

        if( typeof(config.size) !== 'undefined' ) {
            classConfig += `badge-${config.size} `;
        }
    }
    // Populate the txt field
    const markup = `<p class="badge ${classConfig}">${config.badgeTxt}</p>`;

    // Return the generated markup
    return markup;
}