import header from './modules/header';
import multiRangeSlider from './modules/multiRangeSlider';
import calcTabs from './modules/calcTabs';
import gallery from './modules/gallery';
import timer from './modules/timer';
import reviewSlider from './modules/reviewSlider';
import news from './modules/news';
import subInput from './modules/subInput';
import anchor from './modules/anchor';

window.addEventListener('DOMContentLoaded', () => {
    header();
    multiRangeSlider();
    calcTabs();
    gallery();
    timer('.timer_box', '2021-01-01');
    reviewSlider('.review_slider', '.review_slides', '.review_card'); 
    news();
    subInput();
    anchor();
});