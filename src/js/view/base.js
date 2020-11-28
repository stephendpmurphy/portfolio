export const elementStrings = {
    loader: 'loader'
}

export const elements = {
    skillsList: document.querySelector('.about__skills'),
    projectList: document.querySelector('.projects__list')
}

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <img class="loader__img" src="assets/loading.svg">
        </div>
    `;

    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if( loader ) {
        loader.parentElement.removeChild(loader);
    }
};

export const renderFailedToLoad = parent => {
    const failed = `
        <div class="loader__failed">
            <p>Failed to load.</p>
        </div>
    `;

    parent.insertAdjacentHTML("afterbegin", failed);
}

export const clearFailedToLoad = parent => {
    const failed = document.querySelector(`.${elementStrings.loader}`);
    if( failed ) {
        failed.parentElement.removeChild(failed);
    }
}