import {preloading, onReady, setVisible} from "./utility.js";
const audio = new Audio('../audio/06. 밤_kida bgm factory-지금, 별.mp3');

try {
    await preloading([
        "images/gallery/gallery-midnight.png"
    ])
} catch (e) {
    console.log(e)
}
onReady(function() {
    setVisible('.loading-screen', false);
    audio.play();
    audio.volume = 0.6;
});