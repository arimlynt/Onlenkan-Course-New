var express = require('express');
var router = express.Router();
const{index, actionCreate, actionEdit, actionDelete} = require('./controller')
const multer = require('multer')
const os = require('os')

// const {isLoginAdmin} = require('../midleware/auth')

// router.use(isLoginAdmin);
router.get('/', index);
router.post('/create', multer({dest: os.tmpdir()}).single('photo'), actionCreate);
router.put('/edit/:id', multer({dest: os.tmpdir()}).single('photo'), actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
