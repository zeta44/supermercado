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

exports.save = (venda) => {
    return new Promise((resolve, reject) => {

        function performVenda() {
            let qr = `INSERT INTO vendas 
            (
            nf,
            cliente_id,
            produto_id,
            quantidade,
            total)
            VALUES
            ('${venda.nf}',
            ${venda.cliente_id},
            ${venda.produto_id},
            ${venda.quantidade},
            ${venda.total}
            );
            `;

            db.query(qr, function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            })
        }

        var pquery = `
        select  (IFNULL((select sum(quantidade) from compras where compras.produto_id = p.id), 0)
                    -
                    (IFNULL((select sum(quantidade) from vendas where vendas.produto_id = p.id), 0))) as estoque
        from produtos as p 
        where id = ${venda.produto_id}
        `

        db.query(pquery, function (err, result) {
            if (err) {
                return reject(err);
            }
            if (result[0].estoque > venda.quantidade) {
                performVenda()
            }
            else {
                reject('estoque insuficiente');
            }
        })
    });
}