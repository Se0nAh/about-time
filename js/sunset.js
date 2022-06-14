import {preloading, onReady, setVisible} from "./utility.js";

try {
    await preloading([
        "../images/sunset/background.png",
        "../images/sunset/Sunset_Text.png",
        "../images/sunset/Sunset_Title.png",
        "../images/gallery/gallery-sunset.png",
        "../images/sunset/moon.png",
        "../images/sunset/tree.png",
        "../images/sunset/cloud1.png",
        "../images/sunset/cloud2.png"
    ])
} catch (e) {
    console.log(e)
}
onReady(function() {
    document.getElementById('introduction').style.animation = 'fadeout 3s forwards';
    document.getElementById('guide').style.animation = 'fadein, fadeout';
    document.getElementById('guide').style.animationDuration = ' 1.5s, 2s';
    document.getElementById('guide').style.animationDelay = '2s, 8s';
    document.getElementById('guide').style.animationFillMode = 'forwards, forwards';
    setVisible('#scene', true);
    setVisible('.loading-screen', false);
});
const scene = document.getElementById('scene')
const bg = document.getElementById('background')
const cloud1 = document.getElementById('cloud1')
const cloud2 = document.getElementById('cloud2')
const tree = document.getElementById('tree')
window.addEventListener('mousemove', (e) => {
    const p = scene.offsetWidth * scene.offsetHeight / 360
    scene.style.filter = `hue-rotate(${(e.clientX - scene.offsetLeft) * (e.clientY - scene.offsetTop) / p}deg)`

    const offsetCenterX = e.clientX - scene.offsetLeft - scene.offsetWidth / 2
    const offsetCenterY = e.clientY - scene.offsetTop - scene.offsetHeight / 2

    bg.style.transform = `scale(1.1) translateX(${-offsetCenterX / 200}px) rotateY(${offsetCenterX / 200}deg) translateY(${-offsetCenterY / 200}px) `
    cloud1.style.transform = `translateX(${-offsetCenterX / 100}px) translateY(${-offsetCenterY / 100}px)`
    cloud2.style.transform = `translateX(${-offsetCenterX / 30}px) translateY(${-offsetCenterY / 80}px)`
    tree.style.transform = `scaleX(1.15) rotateY(${offsetCenterX / 100}deg) translateX(${-offsetCenterX / 20}px)`

})

