export async function preloading (imageArray) {
    let n = imageArray.length;
    for (let i = 0; i < n; i++) {
        let img = new Image();
        img.src = imageArray[i];
    }
}

export function onReady(callback) {
    let intervalId = window.setInterval(function() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 1000);
}

export function setVisible(selector, visible) {
    if (visible) {
        document.querySelector(selector).style.display ='block';
    } else {
        document.querySelector(selector).style.transition = 'opacity 0.7s';
        document.querySelector(selector).style.opacity = "0";
        document.querySelector(selector).addEventListener("transitionend", function () {this.style.display='none'}, true);
    }
}
