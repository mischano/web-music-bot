const express = require('express');
const app = express();
const path = require('path');

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

// Routes. 
app.use('/', require('./routes/index'));    // Home page.
app.use('/users', require('./routes/users'));   // To be implemented.
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'css');

const allowedOrigins = ['www.googlevideo.com',
                      'googlevideo.com',
                      'https://manifest.googlevideo.com'];
app.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  
  }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
