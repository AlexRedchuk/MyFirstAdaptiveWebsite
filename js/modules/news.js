function news() {
    const newsBlocks = document.querySelectorAll('.news_card');

    newsBlocks.forEach( block => {
        block.addEventListener('mouseover', () => {
            block.querySelector('.news_img_backdrop ').style.opacity = '1';
        });
        block.addEventListener('mouseout', () => {
            block.querySelector('.news_img_backdrop ').style.opacity = '0';
        });
    });
}

export default news;