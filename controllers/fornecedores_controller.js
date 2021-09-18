const db_con = require('../config/db_connection');
const fornecedores_model = require('../models/fornecedores_model');
const setores_model = require('../models/setores_model');
const volumes_model = require('../models/volumes_model');
const produtos_model = require('../models/produtos_model')


exports.fornecedores_listar_get = (req, res) => {
    fornecedores_model.list().then((fornecedores)=>{
        let model = {
            title: "Lista de Fornecedores",
            fornecedores: fornecedores
        };
        res.render("./views/pages/fornecedores_listar", model);
    })
}

