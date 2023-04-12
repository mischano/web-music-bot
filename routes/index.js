const express = require('express');
const router = express.Router();
const path = require('path');

// router.get('/', (req, res) => res.render('Welcome'));

router.get('/', (req, res) => 
    res.sendFile(path.join(process.cwd() + '/views/index.html')))


router.get('/commands', (req, res) => res.send('Commands!'));

module.exports = router;