// webcam 관련 코드: https://velog.io/@davelee/browser%EC%97%90%EC%84%9C-webcam-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0
import {preloading, onReady, setVisible} from "./utility.js";

try {
    await preloading([
        "../images/photo-booth/frame-dawn.png",
        "../images/photo-booth/frame-morning.png",
        "../images/photo-booth/frame-daytime.png",
        "../images/photo-booth/frame-sunset.png",
        "../images/photo-booth/frame-evening.png",
        "../images/photo-booth/frame-midnight.png",
    ])
} catch (e) {
    console.log(e)
}

onReady(function() {
    new App();
    setVisible('.loading-screen', false);
});

const currentFrameImage = new Image()
currentFrameImage.title = ""
const canvas = document.querySelector("#mirrored");
const video = document.querySelector("#videoElement");
const downloadButton = document.getElementById("camera-button")

downloadButton.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = `${currentFrameImage.title}.png`;
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
});


class App {
    constructor() {

        const video = document.querySelector("#videoElement");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then( (stream) => {
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        if(location.hash && location.hash.length > 0) {
            const hashValue = location.hash.replace('#', '')
            currentFrameImage.src = `../images/photo-booth/frame-${hashValue}.png`
            document.querySelector(`.${hashValue}`).classList.add('frame-option-selected')
        } else {
            location.hash = '#dawn'
            currentFrameImage.src = `../images/photo-booth/frame-dawn.png`
            document.querySelector('.dawn').classList.add('frame-option-selected')
        }

        video.addEventListener( "loadedmetadata", () => {
            window.requestAnimationFrame(this.draw.bind(this));
        });

        window.addEventListener("hashchange", (e) => {
            const previousHashValue = e.oldURL.split('#')[1]
            const hashValue = location.hash.replace('#', '')
            currentFrameImage.src = `../images/photo-booth/frame-${hashValue}.png`
            currentFrameImage.title = hashValue
            document.querySelector(`.${hashValue}`).classList.add('frame-option-selected')
            document.querySelector(`.${previousHashValue}`).classList.remove('frame-option-selected')
        })
    }

    draw(t) {
        window.requestAnimationFrame(this.draw.bind(this));

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.translate(video.videoWidth, 0);
        ctx.scale(-1,1);
        ctx.drawImage(video, 0, 0,
            video.videoWidth,
            video.videoHeight);
        ctx.setTransform(1,0,0,1,0,0);

        ctx.drawImage(currentFrameImage, 0, 0, video.videoWidth, video.videoHeight);

    }
}