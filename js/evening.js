import {preloading, onReady, setVisible} from "./utility.js";

try {
    await preloading([
        "images/gallery/gallery-evening.png"
    ])
} catch (e) {
    console.log(e)
}
onReady(function() {
    setVisible('.loading-screen', false);
    window.alert("준비 중인 작품입니다.");
});