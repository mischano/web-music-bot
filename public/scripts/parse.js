var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var CMD_NOT_FOUND = "<span class=\"inherit\">Command not found. For a list of commands," +
    "type <span class=\"command\">'help'</span>.</span>";


var git = 0;
var pw = false;
let pwd = false;
var commands = [];  // Command history

setTimeout(function () {
    loopLines(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
    // Enter pressed
    if (e.keyCode == 13) {
        commands.push(command.innerHTML);
        git = commands.length;
        addLine("mansur:~$ " + command.innerHTML, "no-animation", 0);
        // defaultPrompt();
        parseCommand(command.innerHTML);
        command.innerHTML = "";
        textarea.value = "";
    }
    // Up arrow pressed
    if (e.keyCode == 38 && git != 0) {
        git -= 1;
        textarea.value = commands[git];
        command.innerHTML = textarea.value;
    }
    // Down arrow pressed
    if (e.keyCode == 40 && git != commands.length) {
        git += 1;
        if (commands[git] === undefined) {
            textarea.value = "";
        } else {
            textarea.value = commands[git];
        }
        command.innerHTML = textarea.value;
    }
}

function stripWhitespace(in_) {
    return in_.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
}

function parseCommand(in_) {
    let str = stripWhitespace(in_)
    let wordList = str.split(" ");
    let command = wordList[0];
    let msg = "";

    console.log("parsed command:", command);
    switch (command) {
        case "play":
            msg = str.slice(5);
            if (msg.length > 0) {
                Play(msg);  // commands.js
            } else {
                addLine(CMD_NOT_FOUND, "error", 100);
            }
            break;
        case "pause":
            Pause();
            break;
        case "resume":
            Resume();
            break;
        case "skip":
            Skip();
            break;
        case "list":
            List();
            break;
        case "current":
            Current();
            break;
        case "remove":
            break;
        case "shuffle":
            break;
        case "volume":
            msg = str.slice(7);
            let x = parseInt(msg);
            if (Number.isInteger(x)) {
                Volume(x);
            } else {
                addLine(CMD_NOT_FOUND, "error", 100);
            }
            break;
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        default:
            addLine(CMD_NOT_FOUND, "error", 100);
            break;
    }

    return;
}
