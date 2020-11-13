function reviewSlider(sliderSelector, itemsSelector, slideName) {
    let sliderContainer = document.querySelector(sliderSelector),
        items = document.querySelector(itemsSelector),
        slides = document.querySelectorAll(slideName),
        navigators = document.querySelectorAll('[data-slidernav]'),
        media1024 = window.matchMedia('(min-width: 768px) and (max-width: 1024px)'),
        media767 = window.matchMedia('(max-width: 767px)');

    const firstClone = slides[0].cloneNode(true),
        lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = "firctclone";
    lastClone.id = "lastclone";
    items.append(firstClone);
    items.prepend(lastClone);

    let position = -380,
        index = 0,
        posX1 = 0,
        posX2 = 0,
        posInitial = 0;

    items.style.transform = `translate(${position}px)`;
    items.onmousedown = dragStart;

    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    items.addEventListener('transitionend', () => {
        // items = document.querySelector(itemsSelector);
        // slides = items.querySelectorAll(slideName);


        let delimeter = 0,
            currentNav = navigators;


        if (media1024.matches) {
            if (position > 380) {
                items.classList.remove('shifting');
                position = -2280;
                items.style.transform = `translate(${position}px)`;
            }
            if (position < -2280) {
                items.classList.remove('shifting');
                position = 380;
                items.style.transform = `translate(${position}px)`;
            }
            delimeter = 2;
            currentNav = document.querySelectorAll('[data-slidernav]');
        } else if (media767.matches) {
            if (position > 0) {
                items.classList.remove('shifting');
                position = -3040;
                items.style.transform = `translate(${position}px)`;
            }

            if (position < -3040) {
                items.classList.remove('shifting');
                position = 0;
                items.style.transform = `translate(${position}px)`;
            }
            delimeter = 1;
            currentNav = document.querySelectorAll('[data-slidernav]');
        }
        else {
            if (position > 760) {
                items.classList.remove('shifting');
                position = -1520;
                items.style.transform = `translate(${position}px)`;
            }
            
            if (position < -1520) {
                items.classList.remove('shifting');
                position = 760;
                items.style.transform = `translate(${position}px)`;
            }
            delimeter = 3;
        }

        clearActiveNavigation(currentNav);
        setActiveNavigation(delimeter, currentNav);
    });



    function changeNavs(navigators) {
        navigators.forEach(nav => {
            nav.addEventListener('click', () => {

                let currentNav = navigators;
                if (media1024.matches) {
                    position = 380 - 760 * +nav.getAttribute('data-slidernav');
                    if (+nav.getAttribute('data-slidernav') == 4) {
                        position = -2280;
                    }
                    currentNav = document.querySelectorAll('[data-slidernav]');
                }
                else if (media767.matches) {
                    position = 0 - 380 * +nav.getAttribute('data-slidernav');
                    currentNav = document.querySelectorAll('[data-slidernav]');
                }
                else {
                    position = 760 - 1140 * +nav.getAttribute('data-slidernav');
                }

                clearActiveNavigation(currentNav);
                items.classList.add('shifting');
                nav.classList.add('active_navigation_circle');
                items.style.transform = `translate(${position}px)`;
            });
        });
    }

    changeNavs(navigators);

    function dragStart(e) {
        e.preventDefault();
        items.style.cursor = 'grab';
        slides.forEach(slide => {
            slide.style.cursor = 'grab';
        });

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
            posX2 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            posX2 = e.clientX;
        }


        document.onmousemove = dragAction;
        document.onmouseup = dragEnd;
    }

    function dragAction(e) {
        items.classList.remove('shifting');
        if (posX1 > posX2) {
            position += posX1 - posX2;
        }
        else if (posX1 < posX2) {
            position -= posX2 - posX1;
        }

        posX2 = posX1;
        if (e.type == 'touchmove') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
        }

        items.style.transform = `translate(${position}px)`;
    }

    function dragEnd(e) {
        document.onmouseup = null;
        document.onmousemove = null;
        items.style.cursor = 'pointer';
        slides.forEach(slide => {
            slide.style.cursor = 'pointer';
        });
        shiftSlide();
    }

    function shiftSlide() {
        if (position >= 0) {
            if (position % 380 >= 380 / 2) {
                position += (380 - position % 380);
            }
            else {
                position -= position % 380;
            }
        } else if (position < 0) {
            if (Math.abs(position % 380) < 380 / 2) {
                position += Math.abs(position % 380);
            }
            else if (Math.abs(position % 380) >= 380 / 2) {
                position -= 380 - Math.abs(position % 380);
            }
        }

        items.classList.add('shifting');
        items.style.transform = `translate(${position}px)`;


        let delimeter = 0,
            currentNav = navigators;


        if (media1024.matches) {
            delimeter = 2;
            currentNav = document.querySelectorAll('[data-slidernav]');
        } else if (media767.matches) {
            delimeter = 1;
            currentNav = document.querySelectorAll('[data-slidernav]');
        }
        else {
            delimeter = 3;
        }

        setActiveNavigation(delimeter, currentNav);
    }

    function setActiveNavigation(adaptiveDelimeter, navigators) {

        if (media1024.matches) {
            index = Math.round((Math.abs(position - 760) / 380) + 1);
            navigators.forEach(nav => {
                if (index / adaptiveDelimeter > +nav.getAttribute('data-slidernav')) {
                    clearActiveNavigation(navigators);
                    nav.classList.add('active_navigation_circle');
                }
            });
        }
        else if (media767.matches) {
            index = Math.round((Math.abs(position - 380) / 380));
            navigators.forEach(nav => {
                if (index / adaptiveDelimeter > +nav.getAttribute('data-slidernav')) {
                    clearActiveNavigation(navigators);
                    nav.classList.add('active_navigation_circle');
                }
            });
        }
        else {
            index = Math.round((Math.abs(position - 1140) / 380) + 1);
            navigators.forEach(nav => {
                if (index / adaptiveDelimeter > +nav.getAttribute('data-slidernav')) {
                    clearActiveNavigation(navigators);
                    nav.classList.add('active_navigation_circle');
                }
            });
        }
    }

    function clearActiveNavigation(navigators) {
        navigators.forEach(nav => {
            nav.classList.remove('active_navigation_circle');
        });
    }

    clearActiveNavigation(navigators);
    setActiveNavigation(3, navigators);

    /* Adaptation */



    media1024.addEventListener("change", mediaAdaptation);
    media767.addEventListener("change", mediaAdaptation);

    mediaAdaptation();

    function removeAdptiveNav() {
        const nav = document.querySelectorAll('[data-slidernav]');

        nav.forEach(item => {
            if (+item.getAttribute('data-slidernav') > 2) {
                item.remove();
            }
        });
    }

    function mediaAdaptation() {
        if (media1024.matches) {
            removeAdptiveNav();
            const navigatorContainer = document.querySelector('.review_slider_navigation');
            navigatorContainer.insertAdjacentHTML('beforeend', `
                    <div data-slidernav="3" class="navigation_circle"></div>
                    <div data-slidernav="4" class="navigation_circle"></div>
            `);
            const adaptiveNavs = document.querySelectorAll('[data-slidernav]');
            changeNavs(adaptiveNavs);
            setActiveNavigation(2, adaptiveNavs);
        }
        else if (media767.matches) {
            const navigatorContainer = document.querySelector('.review_slider_navigation');
            removeAdptiveNav();
            navigatorContainer.insertAdjacentHTML('beforeend', `
                    <div data-slidernav="3" class="navigation_circle"></div>
                    <div data-slidernav="4" class="navigation_circle"></div>
                    <div data-slidernav="5" class="navigation_circle"></div>
                    <div data-slidernav="6" class="navigation_circle"></div>
                    <div data-slidernav="7" class="navigation_circle"></div>
                    <div data-slidernav="8" class="navigation_circle"></div>
            `);
            const adaptiveNavs = document.querySelectorAll('[data-slidernav]');
            changeNavs(adaptiveNavs);
            setActiveNavigation(1, adaptiveNavs);
        }

        else if (!media1024.matches && !media767.matches) {
            removeAdptiveNav();
            changeNavs(navigators);
            setActiveNavigation(3, navigators);
        }
    }
}

export default reviewSlider;