class audioObj {
    constructor(t, u) {
        this.title = t;
        this.url = u;
    }
}

var audio = new Audio();
var queue = [];

var currentAudio;
var lastAddedAudio;
var lastPlayedAudio;
var loopCurrentAudio = false;

audio.addEventListener('ended', function () {
    lastPlayedAudio = currentAudio.title;
    playNextAudio();
})

async function audioManager(requestedAudio) {
    const fetchResult = await fetchAudio(requestedAudio);
    let title = fetchResult['title'];
    let url = fetchResult['url'];
    let ao = new audioObj(title, url);
    lastAddedAudio = ao;
    queue.push(ao);

    if (isAudioPlaying()) {
        return true;
    }
    playNextAudio();

    return false;
}

function fetchAudio(requestedAudio) {
    let data = "requestedAudio$" + requestedAudio + "$";
    const response = fetch("/searchAudio", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((resData) => {
            return resData;
        });

    return response;
}

function playNextAudio() {
    if (loopCurrentAudio) {
        queue.unshift(lastAddedAudio);
    }
    
    if (queue.length == 0 || isAudioPlaying()) {
        return;
    }

    currentAudio = queue.shift();
    audio.src = currentAudio.url;
    audio.load();
    audio.play();

    let msg = "<span class=\"inherit\">Now playing: " + currentAudio.title + "</span>";
    addLine(msg, "color2 margin", 80);

    return;
}

function pauseAudio() {
    if (!isAudioPlaying()) {
        return false;
    }
    audio.pause();

    return true;
}

function resumeAudio() {
    if (isAudioPlaying()) {
        return false;
    }
    audio.play();

    return true;
}

function skipAudio() {
    if (queue.length <= 0 && !isAudioPlaying()) {
        return false;
    }
    lastPlayedAudio = currentAudio.title;
    audio.pause();
    audio.currentTime = 0;

    return true;
}

function setVolume(vol) {
    let v = 0;
    if (vol >= 1) {
        v = 1;
    } else if (vol <= 0) {
        v = 0;
    } else {
        v = vol;
    }
    audio.volume = v;
    return true;
}

function shuffleAudio() {
    if (queue.length <= 1) {
        return false;
    }

    let currentIndex = queue.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [queue[currentIndex], queue[randomIndex]] = [queue[randomIndex], queue[currentIndex]];
    }
    return true;
}

function loopAudio() {
    if (isAudioPlaying()) {
        loopCurrentAudio = !loopCurrentAudio;
        return loopCurrentAudio;
    }

    return false;
}

function removeAudio() {
    console.log("removeAudio");
    return;
}

function audioList() {
    let res = [];
    let b = '<span class="command">';
    let e = '</span';
    let m = "";
    let r = "";

    if (queue.length == 0) {
        r = b + "The list is empty." + e;
        res.push(r);
    }
    else {
        for (let i = 0; i < queue.length; i++) {
            m = (i + 1).toString() + '. ' + queue[i].title;
            r = b + m + e;
            res.push(r)
        }
    }

    return res;
}

function isAudioPlaying() {
    if (audio.duration > 0 && !audio.paused) {
        return true;
    }
    return false;
}
