import {preloading, onReady, setVisible} from "../utility.js";

try {
    await preloading([
        "../images/morning/배경.png",
        "../images/gallery/gallery-daytime.png",
        "../images/daytime/벚꽃나무.png",
        "../images/daytime/DayTime_Title.png",
        "../images/daytime/벚꽃1.png",
        "../images/daytime/벚꽃2.png",

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
const scene = document.getElementById('scene')
const guide = document.getElementById('guide')
const petalGroup = document.getElementById('petal-group')
const petalPositionXRange = [-50, 99]
const toggleAnimationForExistsPetals = false
const createPetal = () => {
    const newPetal = document.createElement('div')
    newPetal.className = `petal defaultAnimation image${getRandomIntInclusive(1, 2)} fall-infinite`

    newPetal.style.left = getRandomIntInclusive(0, 99) + "%"
    console.log(`${getRandomIntInclusive(0, 18) / 2}s ${getRandomIntInclusive(0, 6) / 3}s`)
    const fallingDelay = getRandomIntInclusive(0, 40) / 4
    const shakeDelay = getRandomIntInclusive(1, 20) / 10
    newPetal.style.animationDelay = `${fallingDelay}s, ${shakeDelay}s`
    return newPetal
}

for (let i = 0; i < 20; i++) {
    petalGroup.append(createPetal(true))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}


const createNewWindyPetal = () => {
    const left = getRandomIntInclusive(petalPositionXRange[0], petalPositionXRange[1])
    const newPetal = document.createElement('div')
    newPetal.className = `petal windyAnimation image${getRandomIntInclusive(1, 2)}`
    // newPetal.style.backgroundColor = "red"
    newPetal.style.left = left + "%"
    return newPetal
}

let isWindy = false
let createPetalTimer
const blowWind = (e) => {
    if (e.keyCode === 32) {
        if (!isWindy) {
            guide.style.animation = "fadeout 1s forwards"
            guide.style.animationDelay = "0s"
            isWindy = true
            createPetalTimer = setInterval(() => {
                scene.append(createNewWindyPetal())
            }, 150)
            petalGroup.childNodes.forEach(item => console.log(item.nodeValue))
        }
    }
}
const stopWind = (e) => {
    if (e.keyCode === 32) {
        if (!isWindy) return
        isWindy = false
        clearInterval(createPetalTimer)
    }
}


window.addEventListener('keydown', blowWind)

window.addEventListener('keyup', stopWind)
