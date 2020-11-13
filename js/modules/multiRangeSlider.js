function multiRangeSlider() {
    const inputLeft = document.querySelector('#input_left'),
          inputRight = document.querySelector('#input_right'),
          thumbLeft = document.querySelector('.slider > .thumb.left'),
          thumbRight = document.querySelector('.slider > .thumb.right'),
          range = document.querySelector('.slider > .range'),
          minPrice = document.querySelector('.price .min'),
          maxPrice = document.querySelector('.price .max');


    function setLeftValue() {
        let _this = inputLeft,
            min = parseInt(_this.min),
            max = parseInt(_this.max);

        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) -1);
        let percent = ((_this.value - min) / (max - min)) * 100;
        thumbLeft.style.left = percent + '%';
        range.style.left = percent + '%';
        minPrice.textContent = `$${(percent * 120).toFixed(0)}`;
    }
    setLeftValue();

    function setRightValue() {
        let _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) +1);
        let percent = ((_this.value - min) / (max - min)) * 100;
        thumbRight.style.right = (100 - percent )  + '%';
        range.style.right = (100 - percent) + '%';
        maxPrice.textContent = `$${(percent * 120).toFixed(0)}`;
    }
    setRightValue();


    inputLeft.addEventListener('input', setLeftValue);
    inputRight.addEventListener('input', setRightValue);
}

export default multiRangeSlider;