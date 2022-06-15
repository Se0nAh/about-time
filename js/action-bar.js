const audioFilePath = {
    'dawn': '../audio/01. 새벽_Ikson - Letter Home (Official).wav',
    'morning': '../audio/02. 아침_ VoiceMessage - Black Sea.mp3',
    'daytime': '../audio/03. 낮_Ujabes - Siamese cat (샴).mp3',
    'sunset': '../audio/04. 노을_WINYELLE - AUTUMN STROLL.mp3',
    'evening': '../audio/05. 저녁_old days(BPM114)_master.wav',
    'night': '../audio/06. 밤_kida bgm factory-지금, 별.mp3',
}

const pageSequence = {
    'dawn': 0,
    'morning': 1,
    'daytime': 2,
    'sunset': 3,
    'evening': 4,
    'night': 5,
}

function getPageName(pathName) {
    if (pathName.includes('dawn')) return 'dawn';
    if (pathName.includes('morning')) return 'morning';
    if (pathName.includes('daytime')) return 'daytime';
    if (pathName.includes('lunch')) return 'lunch';
    if (pathName.includes('sunset')) return 'sunset';
    if (pathName.includes('evening')) return 'evening';
    if (pathName.includes('night')) return 'night';
}

const pageName = getPageName(window.location.pathname)
const bodySection = document.getElementsByTagName("body")[0];
bodySection.insertAdjacentHTML('beforeend', `
    <div class="action-section action-section-l">
        <div class="action-button button-photo">
            <img class="action-button-img" src="../images/icon-photo-camera.png"/>
        </div>
        <div class="action-button button-sound">
            <img class="action-button-img" src="../images/icon-sound.png"/>
        </div>
        <div class="button-prev-section">
            <div class="action-button button-prev">
                <img class="action-button-img-lg" src="../images/left-arrow.png"/>
            </div>
        </div>
    </div>
    <div class="action-section action-section-r">
        <div class="action-button button-close">
            <img class="action-button-img" src="../images/icon-close.png"/>
        </div>
        <div class="action-button button-restart">
            <img class="action-button-img" src="../images/icon-restart.png"/>
        </div>
        <div class="button-next-section">
            <div class="action-button button-next">
                 <img class="action-button-img-lg" src="../images/right-arrow.png"/>
            </div>
        </div>
    </div>
    `)
const soundButton = document.querySelector(".button-sound");
const audio = new Audio(audioFilePath[pageName]);
audio.play();
let isPlayingAudio = !audio.paused;
if (isPlayingAudio) {
    soundButton.querySelector('img').src = "../images/icon-sound.png"
} else {
    soundButton.querySelector('img').src = "../images/icon-no-sound.png"
}
audio.volume = 0.6;

const photoButton = document.querySelector(".button-photo");
const closeButton = document.querySelector(".button-close");
const restartButton = document.querySelector(".button-restart");
const prevPageButton = document.querySelector(".button-prev");
const nextPageButton = document.querySelector(".button-next");

soundButton.onclick = function () {
    if (isPlayingAudio) {
        isPlayingAudio = false;
        audio.pause();
        soundButton.querySelector('img').src = "../images/icon-no-sound.png"
    } else {
        isPlayingAudio = true;
        audio.play();
        soundButton.querySelector('img').src = "../images/icon-sound.png"
    }
}
photoButton.onclick = function () {
    window.location.href = `/photo-booth#${pageName}`;
}
closeButton.onclick = function () {
    window.location.href = `/`;

}
restartButton.onclick = function () {
    window.location.reload();
}
prevPageButton.onclick = function () {
    let targetIndex = pageSequence[pageName] - 1
    if (targetIndex < 0) targetIndex = 5
    const target = Object.keys(pageSequence)[targetIndex]
    console.log(targetIndex, target)

    window.location.href = `/${target}`
}
nextPageButton.onclick = function () {
    let targetIndex = (pageSequence[pageName] + 1) % 6
    const target = Object.keys(pageSequence)[targetIndex]
    console.log(targetIndex, target)

    window.location.href = `/${target}`
}