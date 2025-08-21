module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Quality Dev Test API",
    version: "1.0.0",
    description: "API de Clientes com CRUD"
  },
  paths: {
    "/api/clientes": {
      get: { summary: "Listar clientes" },
      post: { summary: "Criar cliente" }
    },
    "/api/clientes/{id}": {
      get: { summary: "Obter cliente" },
      put: { summary: "Atualizar cliente" },
      delete: { summary: "Excluir cliente" }
    }
  }
};
