const db = require('../config/db_connection');

//to do: Posteriormente add informação de estoque

function getById(id) {
    return new Promise((resolve, reject) => {
        let qr = `SELECT * FROM clientes WHERE id = ${id}`
        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            if (result.length) {
                return resolve(result[0]);
            }
            return null;
        })
    });
}

function list() {
    return new Promise((resolve, reject) => {
        let qr = `
        select * from clientes WHERE ativo = 1

        `
        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

function save(cliente) {

    return new Promise((resolve, reject) => {
        let qr;
        if (cliente.id == '') {
            qr = `INSERT INTO clientes
            (nome,
            cpf,
            telefone,
            email)
            VALUES(
            '${cliente.nome}',
            '${cliente.cpf}',
            '${cliente.telefone}',
            '${cliente.email}'
            );
            
            `
        }
        else {
            qr = `
            UPDATE clientes
            SET
            nome = '${cliente.nome}',
            cpf = '${cliente.cpf}',
            telefone = '${cliente.telefone}',
            email ='${cliente.email}'
            WHERE id = '${cliente.id}';
            `
        }


        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

function remove(id) {

    return new Promise((resolve, reject) => {
        let qr = `
            UPDATE clientes
            SET
            ativo = 0
            WHERE 
            id = ${id}
            `
        

        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}




module.exports.list = list
module.exports.save = save
module.exports.remove = remove
module.exports.getById = getById