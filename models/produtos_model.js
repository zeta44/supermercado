const db = require('../config/db_connection');

//to do: Posteriormente add informação de estoque

function getById(id) {
    return new Promise((resolve, reject) => {
        let qr = `SELECT * FROM produtos WHERE id = ${id}`
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
        select 
            p.id
            , p.nome
            ,v.nome as volume_nome
            ,f.nome as fornecedor_nome
            ,s.nome as setor_nome
            ,p.preco
            ,(IFNULL((select sum(quantidade) from compras where compras.produto_id = p.id), 0)
            -
            (IFNULL((select sum(quantidade) from vendas where vendas.produto_id = p.id), 0))) as estoque
        from produtos as p
        join fornecedores as f on p.fornecedor_id = f.id
        join setores as s on p.setor_id = s.id
        join volumes as v on p.volume_id = v.id
        WHERE p.ativo = 1

        `
        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

function save(produto) {

    return new Promise((resolve, reject) => {
        let qr;
        if (produto.id == '') {
            qr = `INSERT INTO produtos
            (nome,
            volume_id,
            fornecedor_id,
            setor_id,
            preco)
            VALUES(
            '${produto.nome}',
            '${produto.volume_id}',
            '${produto.fornecedor_id}',
            '${produto.setor_id}',
            '${produto.preco}');
            
            `
        }
        else {
            qr = `
            UPDATE produtos
            SET
            nome = '${produto.nome}',
            volume_id = '${produto.volume_id}',
            fornecedor_id = '${produto.fornecedor_id}',
            setor_id = '${produto.setor_id}',
            preco = '${produto.preco}'
            WHERE id = '${produto.id}';
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
            UPDATE produtos
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