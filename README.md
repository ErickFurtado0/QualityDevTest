# Projeto Completo — Angular + Node.js + MySQL (CRUD Clientes + Login + ViaCEP)

Estrutura:
- backend/ (API Node.js + Express + MySQL + JWT)
- frontend/ (Angular 17 — Login + Grid + CRUD com modal + ViaCEP)
- database/clientes.sql (script do schema + seed)

Passos rápidos:

1) Banco
   - Inicie MySQL e execute `database/clientes.sql`
   - Usuário padrão para login: admin / 123456

2) Backend
   - cd backend
   - copie `.env.example` para `.env` e ajuste DB se necessário
   - npm install
   - npm run dev

3) Frontend
   - cd frontend
   - npm install
   - npm start
   - abra http://localhost:4200

4) Login
   - Usuário: admin
   - Senha: 123456
