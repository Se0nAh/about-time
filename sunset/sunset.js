const scene = document.getElementById('scene')
const bg = document.getElementById('background')
const cloud1 = document.getElementById('cloud')
console.log(scene)

const maxXRange = [-200, 200]

window.addEventListener('mousemove', (e) => {
    console.log(scene.offsetWidth)
    const p = scene.offsetWidth / 360
    scene.style.filter = `hue-rotate(${(e.clientX - scene.offsetLeft)/p}deg)`
    console.log(e.clientX - scene.offsetLeft)

    const offsetCenterX = e.clientX - scene.offsetLeft - scene.offsetWidth/2
    const offsetCenterY = e.clientY - scene.offsetTop - scene.offsetHeight/2
    console.log(offsetCenterX)

    console.log(offsetCenterX/10)
    bg.style.transform = `scale(1.1) translateX(${-offsetCenterX/200}px) rotateY(${offsetCenterX/200}deg) translateY(${-offsetCenterY/200}px) `
    cloud1.style.transform = `translateX(${-offsetCenterX/50}px) translateY(${-offsetCenterY/50}px)`

})

