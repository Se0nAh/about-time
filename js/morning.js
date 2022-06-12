import {preloading, onReady, setVisible} from "./utility.js";

try {
    await preloading([
        "../images/morning/background.png",
        "../images/gallery/gallery-morning.png",
        "../images/morning/1. Morning_Title.png",
        "../images/morning/2. Morning_Text.png",
        "../images/morning/guide1.PNG",
        "../images/morning/flower.png",
        "../images/morning/toaster-handle.png",
        "../images/morning/toaster-front.png",
        "../images/morning/bread.png",

    ])
} catch (e) {
    console.log(e)
}
onReady(function() {
    document.getElementById('introduction').style.animation = 'fadeout 3s forwards';
    document.getElementById('guide').style.animation = 'fadein, fadeout';
    document.getElementById('guide').style.animationDuration = ' 1.5s, 2s';
    document.getElementById('guide').style.animationDelay = '2s, 5s';
    document.getElementById('guide').style.animationFillMode = 'forwards, forwards';
    setVisible('#scene', true);
    setVisible('.loading-screen', false);
});
let isDrawingComplete = false;
let toastTimer
let isToasting = false
let toastCompleted = false
const canvas = document.getElementById("canvas");
canvas.style.marginLeft = 200 + "";
canvas.width = 150;
canvas.height = 160;
console.log(canvas.width, canvas.height)
let context = canvas.getContext("2d");

const breadCanvas = document.createElement("canvas")
breadCanvas.width = 150
breadCanvas.height = 160
breadCanvas.style.marginLeft = "25px"
breadCanvas.style.marginTop = "50px"

const scene = document.getElementById("scene");
const breadCanvasCtx = breadCanvas.getContext("2d")
const bread = document.getElementById("bread")
const breadContainer = document.getElementById("breadContainer")
const handle = document.getElementById("handle")
const gaugeBar = document.getElementById("gaugeBar")
const gaugeFill = document.getElementById("gaugeBar-fill")
const flower = document.getElementById("flower")
const uiSection = document.getElementById("uiSection")


bread.append(breadCanvas)
const handleClickComplete = () => {
    if (!isDrawingComplete) {
        isDrawingComplete = true
        gaugeBar.style.visibility = "visible"
        handle.style.transform = "translateY(165%)"
        breadContainer.style.transform = "translateY(30%)"
        uiSection.style.backgroundImage = "url('../images/morning/guide2.PNG')"
    }
}
const toastCompleteTime = 1.0
let toastTime = 0.0;

handle.addEventListener('click', handleClickComplete)


const toastBread = (e) => {
    if (e.keyCode === 32) {
        if (!isToasting && !toastCompleted) {
            isToasting = true;
            toastTimer = setInterval(() => {
                toastTime += 0.1;
                gaugeFill.style.width = (toastTime / toastCompleteTime) * 100 + "%"
                if (toastTime >= toastCompleteTime/2) {
                }
                if (toastTime >= toastCompleteTime) {
                    uiSection.style.opacity = "0";

                    breadCanvasCtx.drawImage(canvas, 0, 0)
                    breadContainer.classList.add("bounce")
                    handle.style.transitionDuration = "0.1s"
                    handle.style.transform = "translateY(100%)";
                    toastCompleted = true
                    flower.classList.add("spin")
                }
            }, 100)
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (isDrawingComplete) {
        toastBread(e)
    }
})

window.addEventListener('keyup', (e) => {
    if (!isToasting) return
    isToasting = false
    clearInterval(toastTimer)
})

let draw_color = "#c28131";
let draw_width = "12";
let is_drawing = false;

let restore_array = [];
let index = -1;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

// 이미지 그리는 부분
function start(event) {
    is_drawing = true;

    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft - scene.offsetLeft,
        event.clientY - canvas.offsetTop - scene.offsetTop);
    event.preventDefault();

    if (event.type != 'mouseout') {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
    console.log(restore_array);
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft - scene.offsetLeft,
            event.clientY - canvas.offsetTop - scene.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
}

function stop(event) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
}