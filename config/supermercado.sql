DROP database supermercados;

create database supermercados;

USE supermercados;

DROP TABLE IF EXISTS fornecedores CASCADE;

DROP TABLE IF EXISTS funcionarios CASCADE;

DROP TABLE IF EXISTS cargos CASCADE;

DROP TABLE IF EXISTS vendas CASCADE;

DROP TABLE IF EXISTS clientes CASCADE;

DROP TABLE IF EXISTS produtos CASCADE;

DROP TABLE IF EXISTS setores CASCADE;

CREATE TABLE IF NOT EXISTS cargos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS setores (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(10) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS fornecedores(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cnpj VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS volumes (
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS produtos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    volume VARCHAR(10) NOT NULL,
    estoque INT NOT NULL,
    setor_id INT,
    fornecedor_id INT,
    volume_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(setor_id) REFERENCES setores(id),
    FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id),
    FOREIGN KEY(volume_id) REFERENCES volumes(id)
);

CREATE TABLE IF NOT EXISTS clientes (
    id INT NOT NULL AUTO_INCREMENT,
    cpf VARCHAR(30) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    UNIQUE (cpf),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS funcionarios(
    id INT NOT NULL AUTO_INCREMENT,
    cpf VARCHAR(30) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    matricula VARCHAR(12) NOT NULL,
    setor_id INT,
    cargo_id INT,
    UNIQUE (cpf),
    PRIMARY KEY(id),
    FOREIGN KEY(setor_id) REFERENCES setores(id),
    FOREIGN KEY(cargo_id) REFERENCES cargos(id)
);

CREATE TABLE IF NOT EXISTS vendas (
    id INT NOT NULL AUTO_INCREMENT,
    total FLOAT NOT NULL,
    cliente_id INT NOT NULL,
    produdo_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(id),
    FOREIGN KEY(produdo_id) REFERENCES produtos(id)
);


INSERT INTO
    cargos(nome)
values
('Gerente'),
('Auxiliar'),
('Caixa'),
('Vendedor'),
('Estoquista'),
('Repositor'),
('Açougueiro');

INSERT INTO
    setores(nome)
values
('Guiche'),
('Açougue'),
('Estoque'),
('Gerencia');

INSERT INTO 
	volumes(nome)
values
('Peça'),
('Lote'),
('Lata'),
('Saco'),
('Pacote'),
('Unidade'),
('Caixa');
    
INSERT INTO
    fornecedores(nome, cnpj)
values
('Queijos e C&A', '12121/00001-00'),
('Babado de Vaca', '78121/00001-01'),
('Tapioca de Deus', '125654/00001-00'),
('Topifaive', '15521/00001-00');

INSERT INTO
    produtos(nome, volume, estoque, setor_id, volume_id)
values
('Arroz', '1kg', 1000, 3, 4),
('Feijão', '1kg', 1000, 3, 4),
('Café', '1Pk', 700, 3, 5),
('Azeite', '1l', 50, 3, 3),
('Açúcar', '1kg', 60, 3, 7);

INSERT INTO
    clientes(cpf, nome)
values
('45632180358', 'José Joaquim'),
('45632180357', 'Maria Joaquina'),
('45631280358', 'Patrícia Silva'),
('45321080358', 'Iolanda Pozon');





INSERT INTO
    funcionarios(cpf, nome, matricula, setor_id, cargo_id)
values
(25665487230, 'Manuel Pereira', 'AAA2235', 4, 1),
(45885652145, 'Maria da Silva', 'BBB2235', 4, 2),
(65666932012, 'Mariroca da Silva', 'BBB1135', 1, 3);

INSERT INTO
    vendas(total, cliente_id, produdo_id)
values
(70.50, 1, 1),
(7.50, 2, 1),
(45.50, 3, 1),
(60.50, 4, 1);
