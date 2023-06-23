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
        msg = "<span class=\"inherit\">Skipped.</span>";
    } else {
        msg = "<span class=\"inherit\">Failed to skip.</span>";
    }
    addLine(msg, "color2 margin", 80);
    msg = "";

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
    if (res.length == 0) {
        msg = "<span class=\"inherit\">The list is empty." + "</span>";
        addLine(msg, "color2 margin", 80);
    }
    else {
        for (let i = 0; i < res.length; i++) {
            let title = (i + 1).toString() + ". " + res[i];
            msg = "<span class=\"inherit\">" + title + "</span>";
            addLine(msg, "color3 margin", 80);
        }
    }
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