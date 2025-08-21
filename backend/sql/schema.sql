CREATE DATABASE IF NOT EXISTS projeto;
USE projeto;

CREATE TABLE clientes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  idUsuario BIGINT,
  DataHoraCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
  Codigo VARCHAR(15),
  Nome VARCHAR(150),
  CPF_CNPJ VARCHAR(20),
  CEP INT,
  Logradouro VARCHAR(100),
  Endereco VARCHAR(120),
  Numero VARCHAR(20),
  Bairro VARCHAR(50),
  Cidade VARCHAR(60),
  UF VARCHAR(2),
  Complemento VARCHAR(150),
  Fone VARCHAR(15),
  LimiteCredito FLOAT,
  Validade DATE
);
