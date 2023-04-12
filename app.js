const express = require('express');
const app = express();
const path = require('path');


// let runPy = new Promise(function (suc, nosuc) {
//     const { spawn } = require('child_process')
//     let arg = "Robbie Williams Feel"
//     console.log(audioInquiry)
//     const pyprog = spawn('python', ['test.py', arg])

//     pyprog.stdout.on('data', function (data) {
//         suc(data)
//     })
// })
const runPy = (arg) => {
    return new Promise((suc, nosuc) => {
        const { spawn } = require('child_process')
        const pyprog = spawn('python', ['test.py', arg])

        pyprog.stdout.on('data', function (data) {
            suc(data)
        })
    })
}

app.get('/foo', function (req, res) {
    let audioInquiry = req.query.song
    runPy(audioInquiry).then(function (fromRunpy) {
        console.log(fromRunpy.toString())
        res.end(fromRunpy)
    })
})


// Routes
app.use('/', require('./routes/index'));
// app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'css');


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));