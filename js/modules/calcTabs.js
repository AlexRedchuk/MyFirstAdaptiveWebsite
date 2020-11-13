function calcTabs() {
    const tabs = document.querySelectorAll('.tab'),
          tabsContent = document.querySelectorAll('[data-tab]');

    tabs.forEach( (tab, i) => {
       tab.addEventListener('click', () => {
            hideAll();
            showOne(i); 
       });
    });
        
    function hideAll() {
        tabs.forEach( tab => {
            tab.classList.remove('active_tab');
        });
        tabsContent.forEach( content => {
            content.classList.add('hide');
            content.classList.remove('show');
            content.classList.remove('fade');
        });
    }

    function showOne(idx) {
        tabsContent[idx].classList.add('show');
        tabsContent[idx].classList.add('fade');
        tabsContent[idx].classList.remove('hide');
        tabs[idx].classList.add('active_tab');
        
    }
    hideAll();
    showOne(0);

    /* Adaptation */

}

export default calcTabs;