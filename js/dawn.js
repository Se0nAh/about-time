import {preloading, onReady, setVisible} from "./utility.js";
try {
    await preloading([
        "../images/dawn/커튼1.png",
        "../images/gallery/gallery-dawn.png",
        "../images/dawn/배경.png",
        "../images/dawn/마우스커서_손.png",
        "../images/dawn/Dawn_InterationMent.png",
        "../images/dawn/Dawn_MainText.png",
        "../images/dawn/Dawn_Title.png",
        "../images/dawn/창틀-t.png",
        "../images/dawn/창틀-l.png",
        "../images/dawn/창틀-b.png",
        "../images/dawn/창틀-r.png",
    ])
} catch (e) {
    console.log(e)
}
onReady(function() {
    document.getElementById('introduction').style.animation = 'fadeout 3s forwards';
    document.getElementById('guide').style.animation = 'fadein 1.5s forwards';
    document.getElementById('guide').style.animationDelay = '2s';
    setVisible('#scene', true);
    setVisible('.loading-screen', false);
});
const fixedSize = {
    width: 1280,
    height: 720
}
let circleResizeTimer;
const initialRadius = 100;
const bg = document.getElementById('scene');
const guide = document.getElementById('guide');
let isMakingCircle = false
let mouseX = 0, mouseY = 0;
const cursorStyle = {
    hand: "url('../images/dawn/마우스커서_손.png'), auto",
    mouth: "url('../images/dawn/마우스커서_입.png'), auto"
}

window.addEventListener('mousedown', () => {
    guide.style.animation = "fadeout 1s forwards"
    guide.style.animationDelay = "0s"
})

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})
window.addEventListener('keydown', (e) => {

    bg.style.cursor = cursorStyle.mouth
    if (isMakingCircle) return
    isMakingCircle = true
    const circle = document.createElement('div')
    bg.appendChild(circle)
    circle.classList.add('circle')
    circle.style.position = "absolute";
    circle.style.left = mouseX - bg.offsetLeft - initialRadius / 2 + "px";
    circle.style.top = mouseY - bg.offsetTop - initialRadius / 2 + "px";
    circle.style.backgroundPositionX = -mouseX + bg.offsetLeft + initialRadius / 2 + "px";
    circle.style.backgroundPositionY = -mouseY + bg.offsetTop + initialRadius / 2 + "px";

    let radius = initialRadius;
    let scaleUpRate = 1.0;

    circleResizeTimer = setInterval(() => {
        scaleUpRate += 0.01;
        let nextRadius = initialRadius * scaleUpRate

        circle.style.top = circle.style.top.slice(0, -2) - initialRadius * 0.01 / 2 + "px";
        circle.style.left = circle.style.left.slice(0, -2) - initialRadius * 0.01 / 2 + "px";
        circle.style.width = nextRadius + "px";
        circle.style.height = nextRadius + "px";
        circle.style.backgroundPositionX = Number(circle.style.backgroundPositionX.slice(0, -2)) + initialRadius * 0.01 / 2 + "px";
        circle.style.backgroundPositionY = Number(circle.style.backgroundPositionY.slice(0, -2)) + initialRadius * 0.01 / 2 + "px";
    }, 10)
})

window.addEventListener('keyup', (e) => {
    if (!isMakingCircle) return
    isMakingCircle = false
    clearInterval(circleResizeTimer)
    bg.style.cursor = cursorStyle.hand
})

const canvas = document.createElement("canvas");
bg.append(canvas)
const originalImgCanvas = document.createElement("canvas")
const inputCanvas = document.createElement("canvas")
const img = document.createElement("img")
img.src = "../images/dawn/배경.png"
img.width = fixedSize.width;
img.height = fixedSize.height;


originalImgCanvas.classList.add("canvas")
originalImgCanvas.style.position = "absolute"
originalImgCanvas.width = fixedSize.width;
originalImgCanvas.height = fixedSize.height;
originalImgCanvas.style.zIndex = "15";
const imgCanvasCtx = originalImgCanvas.getContext('2d')

inputCanvas.classList.add("canvas")
inputCanvas.style.position = "absolute"
inputCanvas.width = fixedSize.width;
inputCanvas.height = fixedSize.height;
inputCanvas.style.zIndex = "40";
const inputCanvasCtx = inputCanvas.getContext('2d')

bg.append(originalImgCanvas)
bg.append(inputCanvas)

canvas.width = fixedSize.width;
canvas.height = fixedSize.height;
let context = canvas.getContext("2d");
let draw_color = "rgba(256,256,256,1)";
let draw_width = "20";
let is_drawing = false;

let restore_array = [];
let index = -1;

inputCanvas.addEventListener("touchstart", start, false);
inputCanvas.addEventListener("touchmove", draw, false);
inputCanvas.addEventListener("mousedown", start, false);
inputCanvas.addEventListener("mousemove", draw, false);

inputCanvas.addEventListener("touchend", stop, false);
inputCanvas.addEventListener("mouseup", stop, false);
inputCanvas.addEventListener("mouseout", stop, false);

function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - bg.offsetLeft,
        event.clientY - bg.offsetTop);
    event.preventDefault();

    if (event.type != 'mouseout') {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - bg.offsetLeft,
            event.clientY - bg.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
        imgCanvasCtx.globalCompositeOperation = "source-over"


        imgCanvasCtx.drawImage(canvas, 0, 0)
        imgCanvasCtx.globalCompositeOperation = "source-atop"
        imgCanvasCtx.drawImage(img, 0, 0, fixedSize.width, fixedSize.height)
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
