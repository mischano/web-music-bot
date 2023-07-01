let msg = "";

function Play(req) {
    audioPlayer(req)    // player.js
        .then((res) => {
            if (res) {
                msg = "<span class=\"inherit\">Added to queue: " + lastAddedAudio.title + "</span>";
                addLine(msg, "color2 margin", 80);
                msg = "";
                console.log("added to queue:", lastAddedAudio.title);
            }
            return;
        })
}

function Pause() {
    if (pauseAudio()) {
        msg = "<span class=\"inherit\">Paused.</span>";
    }
    else {
        msg = "<span class=\"inherit\">Failed to paused.</span>";
    }
    addLine(msg, "color2 margin", 80);
    msg = "";

    return;
}

function Resume() {
    if (resumeAudio()) {
        msg = "<span class=\"inherit\">Resumed.</span>";
    } else {
        msg = "<span class=\"inherit\">Failed to resume.</span>";
    }
    addLine(msg, "color2 margin", 80);
    msg = "";

    return;
}

function Skip() {
    if (skipAudio()) {
        msg = "<span class=\"inherit\">Skipped: " + lastPlayedAudio + "</span>";
    } else {
        msg = "<span class=\"inherit\">Failed to skip.</span>";
    }
    addLine(msg, "color2 margin", 80);
    playNextAudio();

    return;
}

function Current() {
    if (isAudioPlaying()) {
        msg = "<span class=\"inherit\">Currently playing: " + currentAudio.title + "</span>";
    } else {
        msg = "<span class=\"inherit\">Playlist is empty.</span>";
    }
    addLine(msg, "color2 margin", 80);
    msg = "";

    return;
}

function Volume(vol) {
    setVolume(vol / 100);
    let tm = "";
    if (vol >= 100) {
        tm = "max";
    } else if (vol <= 0) {
        tm = "mute";
    } else {
        tm = vol.toString();
    }
    msg = "<span class=\"inherit\">Volume is set to: " + tm + " </span>";
    addLine(msg, "color2 margin", 80);
    msg = "";
    
    return;
}

function Remove(arg) {
    console.log("remove");
    return;
}

function Add() {
    console.log("add");
    return;
}

function List() {
    res = audioList();
    loopLines(res, "color1 margin", 250);
    return;
}

function Shuffle() {
    console.log("shuffle");
    return;
}

// window.addEventListener('load', createAudioObj, false);
// function createAudioObj() {
//     audio = new Audio();
// }

help = [
    '<span class="command">play   [SONG NAME]</span>      Ex: play Naive The Krooks',
    '<span class="command">pause</span>',
    '<span class="command">resume</span>',
    '<span class="command">current</span>',
    '<span class="command">skip</span>',
    '<span class="command">list</span>',
    '<span class="command">volume 0-100</span>',
    '<span class="command">add (coming soon...)</span>',
    '<span class="command">remove [SONG POS.] (coming soon...)</span>      Ex: remove 2',
    '<span class="command">shuffle (coming soon...)</span>',
    '<span class="command">loop</span>',

];

banner = [
    "_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|  ",
    "___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|;;;;;;;;;;;;;;;;;|___|",
    "_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__;;;;;;;;;;;;;;;;;__|__",
    "___██████╗ ███████╗████████╗████████╗███████╗██████╗___|_██████╗__█████╗_██████╗_██████╗|;;_|___|___|__;;|___|",
    "_|_██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗|___██╔══██╗██╔══██╗██╔══██╗██╔══██╗;;___|___|___|;;__|__",
    "___██████╔╝█████╗__|__██║__|___██║_|_█████╗|_██████╔╝___|██████╔╝███████║██████╔╝██║__██║;;_|___|___|__;;|___|",
    "_|_██╔══██╗██╔══╝_|___██║__|___██║___██╔══╝  ██╔══██╗|___██╔══██╗██╔══██║██╔══██╗██║  ██║;;___|___|___|;;__|__",
    "___██████╔╝███████╗_|_██║|___|_██║_|_███████╗██║  ██║__|_██████╔╝██║__██║██║__██║██████╔╝;;_|___|___|__;;|___|",
    "_|_╚═════╝ ╚══════╝___╚═╝__|___╚═╝____══════╝╚═╝  ╚═╝ ___╚═════╝ ╚═╝__╚═╝╚═╝__╚═╝╚═════╝ ;;___|___|___|;;__|__",
    "___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|_,;;;;;;|___|__,;;;;;;___|",
    "_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___;;;;;;;__|___|;;;;;;;_|__",
    "___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|_`;;;;;'|___|__`;;;;;'___|",
    " ",
    '<span class="color2">Author: Mansur Ischanov.</span>',
    "<span class=\"color2\">Type</span> <span class=\"command\">help </span><span class=\"color2\"></span><span class=\"color2\">to display the list of commands.</span>",
    ]; 


