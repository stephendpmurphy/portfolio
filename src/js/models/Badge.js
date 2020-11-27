export default class Badge {
    constructor(badgeTxt, config) {
        this.badgeTxt = badgeTxt;
        this.config = config;
    };

    create() {
        var classConfig = '';
        // Parse the class config if any was given
        if( typeof(this.config) !== 'undefined' ) {
            if( typeof(this.config.color) !== 'undefined' ) {
                classConfig += `badge-${this.config.color} `;
            }

            if( typeof(this.config.scale) !== 'undefined' ) {
                classConfig += `badge-${this.config.scale} `;
            }

            if( typeof(this.config.size) !== 'undefined' ) {
                classConfig += `badge-${this.config.size} `;
            }
        }
        // Populate the txt field
        this.markup = `<p class="badge ${classConfig}">${this.badgeTxt}</p>`;
    }
}
