let currentStep = 0
const hrefByStep = ["/dawn", "/daytime", "/morning", "/sunset", "/evening", "/midnight"]
let isMouseDown = false;
const mainScene = document.querySelector(".scene");
const mainBg = document.querySelector("body");
let cloud = document.querySelector(".cloud");
let center = { x: mainScene.clientWidth/2, y: mainScene.clientHeight - 100 };

let sunForInteract = document.querySelector(".sun-for-interact");
let sunForDisplay = document.querySelector(".sun-for-display");
let sunAreaForInteract = document.querySelector(".sun-area-for-interact");
let sunAreaForDisplay = document.querySelector(".sun-area-for-display");
let artworkLinkButton = document.querySelector(".artwork-link")

sunAreaForInteract.style.left = center.x - (sunAreaForInteract.clientWidth/2) + 'px';
sunAreaForInteract.style.top = center.y +'px';
sunAreaForDisplay.style.left = center.x -( sunAreaForInteract.clientWidth/2) + 'px';
sunAreaForDisplay.style.top = center.y +'px';
console.log(sunAreaForInteract.style.left)

console.log( center.x,center.y)


const sectionCount = 5
const sectionOffset = 180 / sectionCount
const startDegree = -360
const endDegree = -180

sunForInteract.onmousedown = function(e) {
    sunAreaForDisplay.style.transition = null;
    sunAreaForInteract.style.transition = null;


    isMouseDown = true;
    let currentDeg
    function onMouseMove(e) {
        let radian = Math.atan2(e.pageY - mainScene.offsetTop - center.y, e.pageX - mainScene.offsetLeft - center.x);
        currentDeg = Math.max(Math.min(endDegree, (180 * radian / Math.PI -180)), startDegree-10)
        sunAreaForDisplay.style.transform = 'rotate(' + currentDeg + 'deg) scaleX(1.2)';
        sunAreaForInteract.style.transform = 'rotate(' + currentDeg + 'deg) scaleX(1.2)';
        const stepByDegree = parseInt((currentDeg - startDegree + 18) / sectionOffset)
        if (stepByDegree !== currentStep) {
            currentStep = stepByDegree
            sunForDisplay.style.backgroundImage = `url("images/main/sun/${currentStep+1}.png")`
            mainBg.style.backgroundImage = `url("images/main/bg/${currentStep+1}.png")`
            cloud.style.backgroundImage = `url("images/main/cloud/${currentStep+1}.png")`
            artworkLinkButton.href = hrefByStep[currentStep]
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
        console.log(currentDeg, "onmouseup")
        sunAreaForDisplay.style.transition = 'transform 0.5s'
        sunAreaForInteract.style.transition = 'transform 0.5s'
        let temp = currentStep * sectionOffset
        console.log(currentStep)
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
