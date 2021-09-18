const express = require('express');
const router = express.Router();
const produtos_controller = require('../controllers/produtos_controller');

//Direcionar para o EJS
router.get('/produtos_editar:id?', produtos_controller.produtos_editar_get);

module.exports = router;