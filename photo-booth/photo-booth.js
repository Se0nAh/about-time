// webcam 관련 코드: https://velog.io/@davelee/browser%EC%97%90%EC%84%9C-webcam-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0
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

document.addEventListener("DOMContentLoaded", () => {
    new App();
})

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
        }

        video.addEventListener( "loadedmetadata", () => {
            window.requestAnimationFrame(this.draw.bind(this));
        });

        window.addEventListener("hashchange", () => {
            const hashValue = location.hash.replace('#', '')
            currentFrameImage.src = `../images/photo-booth/frame-${hashValue}.png`
            currentFrameImage.title = hashValue
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