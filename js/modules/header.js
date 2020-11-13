function header() {
    const header = document.querySelector('.header_backdrop'),
          menuItems = document.querySelectorAll('[data-menu]'),
          blocks = document.querySelectorAll('[data-block]');

    
    let media =  window.matchMedia('(max-width: 767px)');
    window.addEventListener('scroll', scrollFunction);

    function scrollFunction () {
        
        checkInit();
        blocks.forEach( block => {
            if (window.pageYOffset+100 >= block.offsetTop) {
                clearActive();
                document.querySelector(`[data-menu="${block.getAttribute('id')}"]`)
                .classList.add('active_header_item');
            }
        });
    }

    function checkInit() {
        if(!media.matches){
            if (window.pageYOffset !== 0) {
                header.style.background = 'rgba(77,78,84,1)';
                menuItems.forEach( item => {
                    item.classList.remove('header_not_scrolled');
                });
            }
            else {
                header.style.background = '';
                menuItems.forEach( item => {
                    item.classList.add('header_not_scrolled');
                });
            }
        }     
    }

    function clearActive() {
        menuItems.forEach( item => {
           item.classList.remove('active_header_item'); 
        });
    }

    function setActive(index) {
        menuItems[index].classList.add('active_header_item');
    }
    clearActive();
    setActive(0);


    /* adaptive */

    const burgerBtn = document.querySelector('.header_burger'),
          burgerClose = document.querySelector('.header_close_burger'),
          headerMenuItems = document.querySelector('.header_menu_items'),
          line = document.querySelector('.header_bottom_line');


    

    media.addEventListener('change', mediaFunction);

    function mediaFunction () {
        if (media.matches) {
            menuItems.forEach( item => {
                item.classList.remove('header_not_scrolled');
            });
            // window.removeEventListener('scroll', scrollFunction);
            headerMenuItems.style.transform = 'translateY(-400px)';
            burgerBtn.style.display = 'flex';
            burgerBtn.addEventListener('click', () => {
                headerMenuItems.style.transition = '.3s all';
                burgerBtn.style.display = 'none';
                burgerClose.style.display = 'flex';
                headerMenuItems.style.transform = 'translateY(0)';
                line.style.transform = 'translateY(398px)';
            });
        
        
            burgerClose.addEventListener('click', () => {
                burgerClose.style.display = 'none';
                burgerBtn.style.display = 'flex';
                headerMenuItems.style.transform = 'translateY(-400px)';
                line.style.transform = 'none';
            });
        }
        else {
            window.addEventListener('scroll', scrollFunction);
            burgerBtn.style.display = 'none';
            burgerClose.style.display = 'none';
            headerMenuItems.style.transition = 'none';
            headerMenuItems.style.transform = 'translate(0)';
            line.style.transform = 'none';
            checkInit();
        }
    }

    mediaFunction();
}  

export default header;