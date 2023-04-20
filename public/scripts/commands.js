var audio = new Audio();
var queue = [];

class audioObj {
    constructor(t, u) {
        this.title = t;
        this.url = u;
    }
}

audio.addEventListener('ended', function () {
    playNextAudio();
})
// Play() calls audioManager().
/*
    audioManager():
        *fetches requested audio.
        *pushes it into the queue.
        *Calls playNextAudio().
 */
const audioManager = async audioName => {
    const fetchedAudio = await fetchAudio(audioName);

    let title = parseTitle(fetchedAudio);
    let url = parseURL(fetchedAudio);

    let ao = new audioObj(title, url);
    queue.push(ao);

    if (isAudioPlaying()) {
        let msg = "<span class=\"inherit\">Added to queue: " + title + "</span>";
        addLine(msg, "color2 margin", 80);
        return;
    }
    else {
        playNextAudio();
    }
}

// function Play(audioName) {
//     let res = audioManager(audioName);
//     switch (res) {
//         case 1:
//             print: "now playing " + title;
//             break;
//         case 0:
//             print: "added to the queue " + title;
//             break;
//         default:
//             print: "Error playing audio " + title;
//             break;
//     }
// }

function pauseAudio() {
    console.log(audio.duration);
    console.log(audio.paused);
    return;
}

function Resume() {
    console.log("resume");
    return;
}

function Add() {
    console.log("add");
    return;
}

function Current() {
    console.log("current");
    return;
}

function Skip() {
    console.log("skip");
    return;
}

function Remove(arg) {
    console.log("remove");
    return;
}

function AudioList() {
    console.log("audiolist");
    return;
}

function Shuffle() {
    console.log("shuffle");
    return;
}

function playNextAudio() {
    if (queue.length == 0 || isAudioPlaying()) {
        return;
    }
    
    let current = queue.shift();
    audio.src = current.url;
    audio.load();
    audio.play();
    audio.volume = 0.1;

    let msg = "<span class=\"inherit\">Now playing: " + current.title + "</span>";
    addLine(msg, "color2 margin", 80);

    return;
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

function isAudioPlaying() {
    if (audio.duration > 0 && !audio.paused) {
        return true;
    }
    return false;
}

// window.addEventListener('load', createAudioObj, false);
// function createAudioObj() {
//     audio = new Audio();
// }

help = [
    "<br>",
    '<span class="command">play   [SONG NAME]</span>      Ex: play Robbie Williams Feel',
    '<span class="command">pause</span>',
    '<span class="command">resume</span>',
    '<span class="command">current</span>',
    '<span class="command">skip</span>',
    '<span class="command">list</span>',
    '<span class="command">remove [SONG POS.]</span>      Ex: remove 2',
    '<span class="command">shuffle</span>',
    "<br>",
];

banner = [
    '<span class="index">ForrestKnight (FK) Not A Corporation. All knights reserved.</span>',
    "         ___   ____",
    "       /' --;^/ ,-_\\     \\ | /       ",
    "      / / --o\\ o-\\ \\\\   --(_)--   ",
    "     /-/-/|o|-|\\-\\\\|\\\\   / | \\   ______                          __     __ __       _       __    __   ",
    "      '`  ` |-|   `` '          / ____/___  _____________  _____/ /_   / //_/____  (_)___ _/ /_  / /_ ",
    "            |-|                / /_  / __ \\/ ___/ ___/ _ \\/ ___/ __/  / ,<  / __ \\/ / __ `/ __ \\/ __/ ",
    "            |-|O              / __/ / /_/ / /  / /  /  __(__  ) /_   / /| |/ / / / / /_/ / / / / /_  ",
    "            |-(\\,__          /_/    \\____/_/  /_/   \\___/____/\\__/  /_/ |_/_/ /_/_/\\__, /_/ /_/\\__/ ",
    "         ...|-|\\--,\\_....                                                         /____/    © 2022",
    "      ,;;;;;;;;;;;;;;;;;;;;;;;;,.   ",
    "~~,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
    '<span class="color2">Welcome to my interactive web terminal.</span>',
    "<span class=\"color2\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color2\">.</span>",
];