-- Criação do banco e tabelas
CREATE DATABASE IF NOT EXISTS projeto_clientes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE projeto_clientes;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS clientes (
  ID BIGINT PRIMARY KEY AUTO_INCREMENT,
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
  LimiteCredito DECIMAL(12,2),
  Validade DATE,
  INDEX idx_codigo (Codigo),
  INDEX idx_nome (Nome),
  INDEX idx_cidade (Cidade),
  INDEX idx_cep (CEP),
  CONSTRAINT fk_clientes_users FOREIGN KEY (idUsuario) REFERENCES users(id)
);

-- Usuário padrão: admin / 123456
INSERT IGNORE INTO users (username, password_hash) VALUES 
('admin', '$2a$10$H6u3e9Xgo7sRz1d9us4JxOZg0J8v7VvQmJcLQZCYNuBq0Uq1p8J6G');