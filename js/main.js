import {preloading, onReady, setVisible} from "./utility.js";
// 참고: https://www.youtube.com/watch?v=55esdUIdYw0&ab_channel=1%EB%B6%84%EC%BD%94%EB%94%A9
try {
    let imageList;
    const imagePath = '/images/main'
    imageList = [
        imagePath + '/background.png',
        imagePath + '/sun.png',
        imagePath + '/cloud.png',
        imagePath + '/button_artwork.png',
        imagePath + '/text_guide.png'
    ]
    await preloading(imageList)
    onReady(function() {
        setVisible('.scene', true);
        setVisible('.loading-screen', false);
    });
} catch (e) {
    console.log(e)
}
let previousStep = 0
let currentStep = 0
const titleByStep = ["Dawn", "Morning", "Daytime", "Sunset", "Evening", "Night"]
// const hrefByStep = ["/dawn", "/morning", "/daytime", "/sunset", "/evening", "/night"]
let isMouseDown = false;
const mainScene = document.querySelector(".scene");
const mainBg = document.querySelector(".background");
const secondBg = document.querySelector(".background-second");
let cloud = document.querySelector(".cloud");
let center = { x: mainScene.clientWidth/2, y: mainScene.clientHeight - 100 };

let sunForInteract = document.querySelector(".sun-for-interact");
let sunForDisplay = document.querySelector(".sun-for-display");
let sunAreaForInteract = document.querySelector(".sun-area-for-interact");
let sunAreaForDisplay = document.querySelector(".sun-area-for-display");
let artworkLinkButton = document.querySelector(".artwork-link")
let artworkTitle = document.querySelector(".artwork-title")

sunAreaForInteract.style.left = center.x - (sunAreaForInteract.clientWidth/2) + 'px';
sunAreaForInteract.style.top = center.y +'px';
sunAreaForDisplay.style.left = center.x -( sunAreaForInteract.clientWidth/2) + 'px';
sunAreaForDisplay.style.top = center.y +'px';

const sectionCount = 5
const sectionOffset = 180 / sectionCount
const startDegree = -360
const endDegree = -180

mainBg.addEventListener('animationend',  function () {
    mainBg.classList.remove('fade-in')
    secondBg.style.backgroundPositionX = -window.innerWidth*previousStep+'px'
})

const delay = 300;
let timer = null;

//Javascript
window.addEventListener('resize', function(){
    mainBg.style.backgroundPositionX = -window.innerWidth*currentStep + 'px'
    secondBg.style.backgroundPositionX = -window.innerWidth*previousStep+'px'
    // clearTimeout(timer);
    // timer = setTimeout(function(){
    //     mainBg.style.backgroundPositionX = -window.innerWidth * currentStep + 'px'
    // }, delay);
});
sunForInteract.onmousedown = function(e) {
    sunAreaForDisplay.style.transition = null;
    sunAreaForInteract.style.transition = null;

    isMouseDown = true;
    let currentDeg
    function onMouseMove(e) {
        let radian = Math.atan2(e.pageY - mainScene.offsetTop - center.y, e.pageX - mainScene.offsetLeft - center.x);
        let radianToDegree =  (180 * radian / Math.PI -180)
        if(radianToDegree > -90 && radianToDegree < 0) currentDeg = startDegree
        else {
            currentDeg = Math.max(Math.min(endDegree, radianToDegree), startDegree-10)
        }
        sunAreaForDisplay.style.transform = 'rotate(' + currentDeg + 'deg) scaleX(1.2)';
        sunAreaForInteract.style.transform = 'rotate(' + currentDeg + 'deg) scaleX(1.2)';
        const stepByDegree = parseInt((currentDeg - startDegree + 18) / sectionOffset)
        if (stepByDegree !== currentStep) {
            previousStep = currentStep
            currentStep = stepByDegree
            cloud.style.backgroundPositionX = -cloud.clientWidth*currentStep+'px'
            sunForDisplay.style.backgroundPositionX = -sunForDisplay.clientWidth*currentStep+'px'
            mainBg.style.backgroundPositionX = -window.innerWidth*currentStep+'px'

            mainBg.classList.add('fade-in')
            secondBg.style.backgroundPositionX = -window.innerWidth*previousStep+'px'
            artworkLinkButton.href = `/${titleByStep[currentStep].toLowerCase()}`
            artworkTitle.innerHTML = titleByStep[currentStep]
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
        sunAreaForDisplay.style.transition = 'transform 0.5s'
        sunAreaForInteract.style.transition = 'transform 0.5s'
        let temp = currentStep * sectionOffset
        currentDeg = startDegree + temp
        sunAreaForDisplay.style.transform = 'rotate(' + currentDeg + 'deg) scaleX(1.2)';
        sunAreaForInteract.style.transform = 'rotate(' + currentDeg + 'deg) scaleX(1.2)';
        document.removeEventListener('mousemove', onMouseMove);
        sunForInteract.onmouseup = null;
        isMouseDown = false;
    };
}

sunForInteract.ondragstart = function() {
    return false;
};
