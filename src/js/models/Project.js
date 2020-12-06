import Badge from './Badge';

export default class Project {
    constructor(project) {
        this.project = project
    };

    create() {
        // Build a list of badges to append in the tags section
        var tagsMarkup = '';

        this.project.tags.forEach( (el) => {
            // Create a new badge with our provided config
            const badge = new Badge(el, {
                color: "white",
                scale: "noScale",
                size: "small"
            });
            // Generate the markup
            badge.create();

            // Store the generated markup
            tagsMarkup += badge.markup;
        })

        this.markup = `<div class="project">
                            <p class="project__name">${this.project.name}</p>
                            <div class="project__desc">
                                <p class="project__about">${this.project.desc}</p>
                                <div class="project__link">
                                    <img class="project__link-figure" src="assets/github.svg">
                                    <a href="${this.project.proj_url}" target="_blank">
                                        <p class="project__link-url">View on Github</p>
                                    </a>
                                </div>
                                <div class="project__tags">${tagsMarkup}</div>
                            </div>
                            <img class="project__expand" src="assets/expand.svg">
                        </div>`
    }
}