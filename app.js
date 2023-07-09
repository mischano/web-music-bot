const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const runYTDLP = (reqAudio) => {
    return new Promise((suc, nosuc) => {
        let pyScriptDir = __dirname + '/public/scripts/ytdlp.py'

        const { spawn } = require('child_process')
        const pyprog = spawn('python', [pyScriptDir, reqAudio])

        pyprog.stdout.on('data', function (data) {
            suc(data)
        })
    })
}

app.get('/searchAudio', function (req, res) {
    console.log("fetch request received. Running py script...")
    let queryParam = req.query.queryMsg
    runYTDLP(queryParam).then(function (fromYTDLP) {
        res.end(fromYTDLP)
    })
    console.log("py script finished executing.")
})

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.get('/searchAudio', cors(corsOptions), function (req, res, next) {
//     // res.json({msg: 'This is CORS-enabled for only example.com.'})
//     console.log("fetch request received. Running py script...")
//     let queryParam = req.query.queryMsg
//     runYTDLP(queryParam).then(function (fromYTDLP) {
//         res.end(fromYTDLP)
//     })
//     console.log("py script finished executing.")
// })

app.options('*', cors())
app.use(cors());
// Routes. 
app.use('/', require('./routes/index'));    // Home page.
app.use('/users', require('./routes/users'));   // To be implemented.
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'css');

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
