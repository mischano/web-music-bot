var audio = new Audio();
var queue = [];

var audioObj = function(t, u) {
    this.title = t;
    this.url = u;
}

// window.addEventListener('load', createAudioObj, false);
// function createAudioObj() {
//     audio = new Audio();
// }

audio.addEventListener('ended', function () {
    playNextAudio();
})

function parseTitle(_in) {
    // let title = _in.substring(
    //     _in.search(/AUDIO_TITLE:/) + 13,
    //     _in.search(/AUDIO_URL:/)
    // console.log(_in);
    // console.log(_in.search(/AUDIO_URL:/));
    // return title;
    
    let t = _in.indexOf("AUDIO_TITLE:");
    console.log(t);
}

function parseURL(_in) {

    let url = _in.substring(
        _in.search(/AUDIO_URL:/) + 10,
        _in.length - 1
    );
    return url;
}

const audioManager = async audioName => {
    console.log("fetching the audio...");
    const fetchedAudio = await fetchAudio(audioName);
    console.log("audio fetched.");
    // console.log(fetchedAudio);
    parseTitle(audioName);
    // let title = parseTitle(audioName);
    // let url = parseURL(audioName);

    // console.log(title);
    // console.log("\n");
    // console.log(url);
    return;
    if (isAudioPlaying()) {
        queue.push(fetchedAudio);
        // addLine("<span class=\"inherit\">Song added to playlist.</span>", "error", 100);
        return;
    }

    audio.src = fetchedAudio;
    audio.load();
    audio.play();
    audio.volume = 0.1;
    // addLine("<span class=\"inherit\">Song is playing.</span>", "color2 margin", 80);
}

function playNextAudio() {
    console.log("playNextAudio()");
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