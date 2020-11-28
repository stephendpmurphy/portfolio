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

        // Extract just the project name from the github url
        var githubProjName = this.project.proj_url.split("https://github.com/stephendpmurphy/")[1];

        this.markup = `<a href="${this.project.proj_url}" target="_blank">
                            <div class="project">
                                <p class="project__name">${this.project.name}</p>
                                <div class="project__link">
                                        <img class="project__link-figure" src="assets/github.svg">
                                        <p class="project__link-url">${githubProjName}</p>
                                </div>
                                <p class="project__desc">${this.project.desc}</p>
                                <div class="project__tags">${tagsMarkup}</div>
                            </div>
                        </a>`
    }
}