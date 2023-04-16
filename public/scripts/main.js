var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");


// var git = 0;
// var pw = false;
// let pwd = false;
// var commands = [];  // Command history

// setTimeout(function () {
//     loopLines(banner, "", 80);
//     textarea.focus();
// }, 100);

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

function validateCommand(in_) {
    return in_.split(" ")[0];
}

function stripWhitespace(in_) {
    return in_.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
}

function sliceMessageAt(in_, at) {
    return in_.slice(at);
}

function parseCommand(input) {
    let input_ = stripWhitespace(input);
    let cmd = validateCommand(input_);

    switch (cmd) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "play":
            msg = sliceMessageAt(input_, 5);
            if (msg.length > 0) {
                audioManager(msg);
            }
            else {
                addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
            }
            break;
        case "pause":
            pauseAudio();
            break;
        default:
            addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
            console.log("Invalid input");
            break;
    }
    // switch (input) {
    //     case "help":
    //         loopLines(help, "color2 margin", 80);
    //         break;
    //     case "pause":
    //         Pause();
    //         break;
    //     case "resume":
    //         console.log("resume");
    //         break;
    //     case "current":
    //         console.log("current");
    //         break;
    //     case "skip":
    //         console.log("skip");
    //         break;
    //     case "list":
    //         console.log("list");
    //         break;
    //     case "shuffle":
    //         console.log("shuffle");
    //         break;
    //     default:
    //         addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
    //         console.log("Invalid input");
    //         break;
    // }
}