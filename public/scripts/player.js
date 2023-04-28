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

audio.addEventListener('ended', function () {
    playNextAudio();
})

var audioPlayer = async audioName => {
    console.log("brefore fetch");
    const fetchedAudio = await fetchAudio(audioName);
    console.log("after fetch");
    let title = parseTitle(fetchedAudio);
    let url = parseURL(fetchedAudio);
    let ao = new audioObj(title, url);
    lastAddedAudio = ao;
    queue.push(ao);

    console.log(fetchedAudio);
    if (isAudioPlaying()) {
        return true;
    }
    playNextAudio();

    return false;
}

function playNextAudio() {
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
    if (queue.length <= 0) {
        if (!isAudioPlaying()) {
            return false;
        }
        audio.pause();
        audio.currentTime = 0;
        return true;
    }
    audio.pause();
    audio.currentTime = 0;
    playNextAudio();

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

    res.push("<br>");
    if (queue.length == 0) {
        return res;
    }
    for (let i = 0; i < queue.length; i++) {
        m = (i + 1).toString() + queue[i].title;
        r = b + m + e;
        res.push(r)
    }
    res.push("<br>");
    return res;
}

function isAudioPlaying() {
    if (audio.duration > 0 && !audio.paused) {
        return true;
    }
    return false;
}

function fetchAudio(val) {
    const x = fetch(`/searchAudio?queryMsg=${val}`)
        .then(data => data.text())
        .then((src) => {
            return src;
        })

    return x;
}

function parseTitle(_in) {
    let title = _in.substring(
        _in.indexOf('AUDIO_TITLE:') + 13,
        _in.indexOf('AUDIO_URL:')
    );
    return title;
}

function parseURL(_in) {
    let url = _in.substring(
        _in.indexOf('AUDIO_URL:') + 11,
        _in.length
    );
    return url;
}
