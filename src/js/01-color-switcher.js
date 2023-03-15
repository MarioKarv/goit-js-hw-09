const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body')

intervalId = null;

startBtn.addEventListener('click', StartColoring);
stopBtn.addEventListener('click', StopColoring);

function StartColoring() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    
    startBtn.toggleAttribute('disabled')
}

function StopColoring() {
    clearInterval(intervalId);
    startBtn.removeAttribute('disabled');
}
    
    
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}