const db = require('../config/db_connection');

exports.list = () => {
    return new Promise((resolve, reject) => {
        let qr = `
        SELECT 
            c.id
            ,c.nf
            ,p.nome as produto_nome
            ,c.quantidade
            ,c.total
            ,c.datahora
        FROM compras as c
        JOIN produtos as p on c.produto_id = p.id
        `
        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

exports.save = (compra) => {

    return new Promise((resolve, reject) => {
        let qr = `INSERT INTO compras 
            (
            nf,
            total,
            produto_id,
            quantidade)
            VALUES
            ('${compra.nf}',
            ${compra.total},
            ${compra.produto_id},
            ${compra.quantidade}
            );
            `


        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}