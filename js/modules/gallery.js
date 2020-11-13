function gallery() {
    const galleryBox = document.querySelectorAll('.gallery_photo');
    
    galleryBox.forEach( box => {
        box.addEventListener('mouseover', () => {
            box.querySelector('img').style.transform = 'scale(1.5)';  
        });
        box.addEventListener('mouseout', () => {
            box.querySelector('img').style.transform = '';   
        });
    });
}

export default gallery;