function addZero(number) {
    return (number < 10)? `0${number}`: number;
}

function timer (selector, deadline) {

        function getTimeRemain() {
            const t = Date.parse(deadline) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);  

            return {
                t, days, hours, minutes, seconds 
            };
        }
        
        function setTime (){
            const timerBox = document.querySelector(selector),
            days = timerBox.querySelector('#days'),
            hours = timerBox.querySelector('#hours'),
            minutes = timerBox.querySelector('#minutes'),
            seconds = timerBox.querySelector('#seconds');
            
            const timeIntervalID = setInterval(changeClock, 1000);
            changeClock();
        function changeClock() {
            const time = getTimeRemain();
            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);

            if (time <= 0) {
                clearInterval(timeIntervalID);
            }
        }
    }
    setTime();
}

export default timer;