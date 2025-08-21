# Backend - Clientes API (Node.js + Express + MySQL)

## Requisitos
- Node.js 18+
- MySQL 8+

## Configuração
1. Crie o banco e tabelas executando o SQL em `../database/clientes.sql`.
2. Copie `.env.example` para `.env` e ajuste as variáveis.
3. Instale dependências:
   ```bash
   npm install
   ```
4. Rode em dev:
   ```bash
   npm run dev
   ```
   ou em produção:
   ```bash
   npm start
   ```

## Rotas
- `POST /auth/login` body: `{ "username": "admin", "password": "123456" }`
- `GET /clientes` (com Bearer token) — filtros: `?codigo=...&nome=...&cidade=...&cep=...`
- `POST /clientes` (com Bearer token)
- `GET /clientes/:id` (com Bearer token)
- `PUT /clientes/:id` (com Bearer token)
- `DELETE /clientes/:id` (com Bearer token)
