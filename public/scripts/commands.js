function Play(strInput) {
    audioName = strInput.slice(5)
    fetch(`/foo?song=${audioName}`)
        .then(res => res.text())
        .then(data => console.log(data))
    return;
}

function Pause() {
    console.log("pause");
    fetch('/foo')
        .then(res => res.text())
        .then(data => console.log(data))
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