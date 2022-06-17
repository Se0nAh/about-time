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

const artworkInfo = {
    'dawn': {
        title: "Dawn",
        description: "새벽은 공기가 차갑기도 하지만 따뜻한 햇살이 들기 시작하는 시간인데요.\n" +
            "이러한 따뜻한 햇살을 받으며, 숲의 맑은 공기를 느끼며, 지친 몸을 녹이다 갈 수 있게 잠시 쉬어가세요.\n",
        artist: "사은우"
    },
    'morning':  {
        title: "Morning",
        description: "바삭바삭하고 따뜻한 토스트 한장으로 시작되는 평화로운 아침.\n 내가 그린 그림이 토스트에 뿅하고 나타나면 기분 좋은 하루가 시작됩니다.\n 나만의 귀여운 토스트를 만들어보세요. 귀여운 거 최고!",
        artist: "최서윤"
    },
    'daytime': {
        title: "Daytime",
        description: "학교에 가느라, 회사에 다니느라, 낮 시간의 따뜻한 햇빛과 선선한 공기를 느끼지 못할 때가 많아요.\n그래서 가장 좋은 날에 하는 피크닉에서 힐링받을 수 있게 작품으로 준비해봤습니다.\n기분 좋은 바람에 함께 흩날리는 벚꽃잎을 즐겨보세요.\n",
        artist: "사은우"
    },
    'sunset': {
        title: "Sunset",
        description: "하교길, 퇴근길, 혹은 일과를 끝내고 지친 몸과 마음으로 집으로 돌아가는 길에 발견하는 아름다운 풍경. \n시시각각 변하는 하늘 색에 우리도 모르게 발걸음을 멈추고 멍하니 하늘을 바라보게 됩니다. \n마우스를 움직여 유유히 흘러가는 구름 사이로 다채롭게 변하는 노을을 여유롭게 감상해보세요.",
        artist: "최서윤"
    },
    'evening': {
        title: "Evening",
        description: "바쁜 일상에 치이다 보면 집에서 아무것도 안하는 시간이 그리워질 때가 있죠.\n" +
            "집에서는 아무것도 안하더라도 에너지가 충전되는 느낌이 드는 데요.\n" +
            "집에는 생각보다 우리에게 소중한 것들이 많은 데, 내가 닥친 일들을 해결하기 급급하여 그 시간들을 잊고 지내는 것 같아요. 사람들이 이 작품으로 하여금 창 밖의 노을을 바라보며 휴식하며 에너지를 충전하다 가세요.\n",
        artist: "사은우"
    },
    'night':  {
        title: "Night",
        description: "밤에 문득 하늘을 올려다봤을 때 별을 발견하면 마치 보물을 발견한 것처럼 기분이 좋아지는데요. \n애니메이션의 한 장면처럼 별이 무수히 많은 하늘 아래 자리잡고, 떨어지는 별똥별에 소원을 마음껏 빌어보세요. \n혹시 몰라요. 소원이 이뤄질지도..?",
        artist: "최서윤"
    },
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
        <div class="action-button button-description">
            <img class="action-button-img" src="../images/icon-description.png"/>
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
        <div class="action-button">
        </div>
        <div class="button-next-section">
            <div class="action-button button-next">
                 <img class="action-button-img-lg" src="../images/right-arrow.png"/>
            </div>
        </div>
    </div>
    `)
const artworkSection = document.getElementById("scene")
artworkSection.insertAdjacentHTML('beforeend', `
    <section class="description-section">
        <div class="description-close-button">
            CLOSE
        </div>
        <div class="description-title-section">
            <h1 class="description-title">${artworkInfo[pageName].title}</h1>
            <div class="description-artist">
               ${artworkInfo[pageName].artist}
            </div>
        </div>
        <p class="description">${artworkInfo[pageName].description}</p>
    </section>
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
const descriptionButton = document.querySelector(".button-description");
const descriptionSection = document.querySelector(".description-section");
const descriptionCloseButton = document.querySelector(".description-close-button");
let descriptionVisible = false;
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

    window.location.href = `/${target}`
}
nextPageButton.onclick = function () {
    let targetIndex = (pageSequence[pageName] + 1) % 6
    const target = Object.keys(pageSequence)[targetIndex]

    window.location.href = `/${target}`
}

const handleCloseDescriptionSection = function () {
    if (descriptionVisible) {
        descriptionVisible = false;
        descriptionButton.classList.remove("button-description-clicked");
        descriptionSection.style.bottom = "-100%"
    }
}


const handleToggleDescriptionSection = function () {
    if (!descriptionVisible) {
        descriptionVisible = true;
        descriptionButton.classList.add("button-description-clicked");
        descriptionSection.style.bottom = "0"
    } else {
        descriptionVisible = false;
        descriptionButton.classList.remove("button-description-clicked");
        descriptionSection.style.bottom = "-100%"
    }
}

descriptionButton.onclick = handleToggleDescriptionSection;
descriptionCloseButton.onclick = handleCloseDescriptionSection;
artworkSection.addEventListener('mousedown', handleCloseDescriptionSection)