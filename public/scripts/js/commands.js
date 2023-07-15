let msg = "";

function Play(req) {
    audioManager(req)    // player.js
        .then((res) => {
            if (res) {
                msg = "<span class=\"inherit\">Added to queue: " + lastAddedAudio.title + "</span>";
                addLine(msg, "color2 margin", 80);
                msg = "";
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
    return;
}

function Add() {
    return;
}

function List() {
    res = audioList();
    loopLines(res, "color1 margin", 250);
    return;
}

function Shuffle() {
    if (shuffleAudio()) {
        msg = "<span class=\"inherit\">Shuffled.</span>";
    }
    else {
        msg = "<span class=\"inherit\">The list is too small. </span>";
    }
    addLine(msg, "color2 margin", 80);

    return;
}

function getRandomSong() {
    return "\t         Example: " + favSongs[Math.floor(Math.random() * favSongs.length)];
}

help = [
    '<span class="command">play   [SONG NAME]</span>',
    '<span class="command">pause</span>',
    '<span class="command">resume</span>',
    '<span class="command">current</span>',
    '<span class="command">skip</span>',
    '<span class="command">list</span>',
    '<span class="command">volume 0-100</span>',
    '<span class="command">shuffle</span>',
    '<span class="command">add (coming soon...)</span>',
    '<span class="command">remove [SONG POS.] (coming soon...)</span>      Ex: remove 2',
    '<span class="command">loop (coming soon...)</span>',

];

favSongs = ["Ophelia The Lumineers", "I wanna be yours Arctic Monkeys", "Stereo love Edward Maya", 
                "Because you move me Tinlicker", "Budapest George Ezra", "Naive The Krooks", "Good luck Broken Bells", 
                "Tidal wave Portugal The Man", "Take it all Gorgon City", "Just breathe Crooked Colours", 
                "Calm down Rema", "I miss you Blink-182", "My blood Twenty One Pilots", "Cool kids Echosmith",
                "Love me again John Newman", "Dreamers Savoir Adore", "Dreams Fleetwood Mac", "Seminole NoMBe", 
                "Rendezvous Rufus Du Sol", "Lily was here Dave Stewart", "Matarebeli Megi Gogitidze", "Lost on you LP", 
                "Love at first sight TEEMID", "Fade out lines The Avener", "Bones Oliver Koltzki", "Elara Parra for Cuva", 
                "Fading nights Parra for Cuva", ]
banner = [
    "_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|",
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


