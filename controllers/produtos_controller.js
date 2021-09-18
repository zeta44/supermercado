const db_con = require('../config/db_connection');
const fornecedores_model = require('../models/fornecedores_model');
const setores_model = require('../models/setores_model');
const volumes_model = require('../models/volumes_model');
const mysql = require('mysql');

exports.produtos_editar_get = (req, res) => {

    let model = {
        title: "Cadastro de Produtos",
        fornecedores: [],
        setores: [],
        volumes: []
    };

    fornecedores_model.list()
        .then((fornecedores) => {
            model.fornecedores = fornecedores;
            setores_model.list()
                .then((setores) => {
                    model.setores = setores;
                    volumes_model.list()
                        .then((volumes) => {
                            model.volumes = volumes;
                        })
                        .then(() => {
                            res.render("./views/pages/produtos_editar", model);
                        })
                })
        });
};