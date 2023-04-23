class audioObj {
    constructor(t, u) {
        this.title = t;
        this.url = u;
    }
}

var audio = new Audio();
var queue = [];
var currentAudio;

audio.addEventListener('ended', function () {
    playNextAudio();
})

var audioPlayer = async audioName => {
    const fetchedAudio = await fetchAudio(audioName);

    let title = parseTitle(fetchedAudio);
    let url = parseURL(fetchedAudio);

    let ao = new audioObj(title, url);
    queue.push(ao);

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
    audio.volume = 0.1;

    let msg = "<span class=\"inherit\">Now playing: " + currentAudio.title + "</span>";
    addLine(msg, "color2 margin", 80);

    return;
}

// Success: 1
// Failed: 0
function pauseAudio() {
    if (!isAudioPlaying()) {
        return false;
    }
    audio.pause();
    return true;
}

function resumeAudio() {
    if (!isAudioPlaying()) {
        return false;
    }
    audio.play();
    return true;
}

function skipAudio() {
    if (queue.length <= 0) {
        if (!isAudioPlaying() || !audio.paused) {
            return false;
        }
        audio.pause();
        audio.currentTime = 0;
        return true;
    } else {
        audio.pause();
        playNextAudio();
        return true;
    }
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
