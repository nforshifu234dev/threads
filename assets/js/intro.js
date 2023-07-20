const fadeOut = () => {

    const loaderContainer = document.querySelector(".preloader-container");
    loaderContainer.classList.add('fade');

}

window.addEventListener('load', fadeOut);