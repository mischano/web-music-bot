const express = require('express');
const app = express();

const runYTDLP = (reqAudio) => {
    return new Promise((success, nosuccess) => {
        let pyScriptDir = __dirname + '/public/scripts/py/ytdlp.py';

        const { spawn } = require('child_process');
        const pyprog = spawn('python', [pyScriptDir, reqAudio]);

        pyprog.stdout.on('data', function (data) {
            success(data);
        });

        pyprog.stderr.on('data', (data) => {
            nosuccess(data);
        });
    });
}

app.post('/searchAudio', function (req, res) {
    console.log("backend: fetching...");
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let x = body.split("$");
        let incomingMessage = x[1];
        console.log("backend: incoming message:", incomingMessage);

        console.log("backend: running py script...");
        runYTDLP(incomingMessage).then(function (fromYTDLP) {
            res.end(fromYTDLP);
        })
        console.log("finished py script...");
    });
})

// Routes. 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/index'));    // Home page.
app.use('/users', require('./routes/users'));   // To be implemented.
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'css');

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
