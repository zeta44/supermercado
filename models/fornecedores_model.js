const db = require('../config/db_connection');


function getById(id) {
    return new Promise((resolve, reject) => {
        let qr = `SELECT * FROM fornecedores WHERE id = ${id}`
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
        let qr = `SELECT * FROM fornecedores WHERE ativo = 1`
        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

function save(fornecedor) {

    return new Promise((resolve, reject) => {
        let qr;
        if (fornecedor.id == '') {
            qr = `INSERT INTO fornecedores
            (nome,
            cnpj,
            telefone,
            email)
            VALUES(
            '${fornecedor.nome}',
            '${fornecedor.cnpj}',
            '${fornecedor.telefone}',
            '${fornecedor.email}'
            );
            
            `
        }
        else {
            qr = `
            UPDATE fornecedores
            SET
            nome = '${fornecedor.nome}',
            volume_id = '${fornecedor.cnpj}',
            fornecedor_id = '${fornecedor.telefone}',
            setor_id ='${fornecedor.email}'
            WHERE id = '${fornecedor.id}';
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
            UPDATE fornecedores
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