const controller = require('../controllers/vendas_controller');
//Direcionar para o EJS
module.exports.map = (router) => {
    router.get('/vendas_cadastrar', controller.vendas_cadastrar_get);
    router.post('/vendas_cadastrar', controller.vendas_cadastrar_post);
}