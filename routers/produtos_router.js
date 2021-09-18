const express = require('express');
const router = express.Router();
const produtos_controller = require('../controllers/produtos_controller');
const fornecedores_controller = require('../controllers/fornecedores_controller');

//Direcionar para o EJS


router.get('/produtos_listar', produtos_controller.produtos_listar_get);
router.get('/produtos_editar:id?', produtos_controller.produtos_editar_get);
router.post('/produtos_editar', produtos_controller.produtos_editar_post);
router.get('/fornecedores_listar', fornecedores_controller.fornecedores_listar_get);

module.exports = router;