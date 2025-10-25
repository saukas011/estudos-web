function timerSetup(){
    const timerContainer = document.querySelector('.timer-container');
    const btnStart = document.querySelector('.start');
    const btnStop = document.querySelector('.stop');
    const btnClear = document.querySelector('.clear');

    let timer;
    let isRunning = false;
    let secondsLapsed = 0;
    let time;

    function startTimer(){
        timer = setInterval(function(){
            secondsLapsed++;
            time = new Date(secondsLapsed*1000);
            timerContainer.innerHTML = timeFormat(time);
        }, 1000);
    }

    function timeFormat(time){
        return time.toLocaleTimeString('pt-BR', {
            timeZone: 'UTC',
            hour12: false
        }, 1000)    
    }
    
    document.addEventListener('click', function(e){
        const clickedElement = e.target;

        if(clickedElement === btnStart){
            timerContainer.classList.remove("not-running");
            if(!isRunning){
                startTimer();
                isRunning = !isRunning; 
            }

        }else if(clickedElement === btnStop){
            if(isRunning){
                clearInterval(timer);
                timerContainer.classList.add("not-running");
                isRunning = !isRunning;
            }

        }else if(clickedElement === btnClear){
            timerContainer.innerHTML = '00:00:00';
            secondsLapsed = 0;
            if(isRunning){
                clearInterval(timer);
                startTimer();
            }
        }

    })
}
timerSetup();
