function subInput (){
    const subInput = document.querySelector('.sub_input');
    subInput.addEventListener('focus', () => {    
        setTimeout(() => {
            subInput.classList.add('sub_input_focus');
        },400);
        
    });
    subInput.addEventListener('focusout', () => {
        subInput.classList.remove('sub_input_focus');
 
    });
}

export default subInput;