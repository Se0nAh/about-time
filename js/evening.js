import {preloading, onReady, setVisible} from "./utility.js";
const audio = new Audio('../audio/05. 저녁_old days(BPM114)_master.wav');

try {
    await preloading([
        "images/gallery/gallery-evening.png"
    ])
} catch (e) {
    console.log(e)
}
onReady(function() {
    setVisible('.loading-screen', false);
    audio.play();
    audio.volume = 0.6;
});