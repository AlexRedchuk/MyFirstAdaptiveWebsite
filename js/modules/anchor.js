function anchor () {
    const anchor = document.querySelector('.anchor');

    anchor.style.display = 'none';
    anchor.style.opacity = 0;
    document.addEventListener('scroll', (e) => {
        anchor.style.display = 'flex';
        if(window.pageYOffset > 700) {
            anchor.style.opacity = 1;
        }
        else {
            anchor.style.opacity = 0;
        }
    });
    anchor.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
}

export default anchor;