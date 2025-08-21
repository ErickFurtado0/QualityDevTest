import pool from '../db.js';

// Helper para construir filtros dinamicamente
function buildFilters(query) {
  const where = [];
  const params = [];
  if (query.codigo) {
    where.push('Codigo = ?');
    params.push(query.codigo);
  }
  if (query.nome) {
    where.push('Nome LIKE ?');
    params.push('%' + query.nome + '%');
  }
  if (query.cidade) {
    where.push('Cidade LIKE ?');
    params.push('%' + query.cidade + '%');
  }
  if (query.cep) {
    where.push('CEP = ?');
    params.push(query.cep);
  }
  const clause = where.length ? ('WHERE ' + where.join(' AND ')) : '';
  return { clause, params };
}

export async function listClientes(req, res) {
  try {
    const { clause, params } = buildFilters(req.query);
    const sql = `SELECT * FROM clientes ${clause} ORDER BY DataHoraCadastro DESC`;
    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar clientes' });
  }
}

export async function getCliente(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM clientes WHERE ID = ?', [id]);
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao obter cliente' });
  }
}

export async function createCliente(req, res) {
  try {
    const body = req.body || {};
    const sql = `INSERT INTO clientes
      (idUsuario, DataHoraCadastro, Codigo, Nome, CPF_CNPJ, CEP, Logradouro, Endereco, Numero, Bairro, Cidade, UF, Complemento, Fone, LimiteCredito, Validade)
      VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      req.user?.sub || 1,
      body.Codigo || null,
      body.Nome || null,
      body.CPF_CNPJ || null,
      body.CEP || null,
      body.Logradouro || null,
      body.Endereco || null,
      body.Numero || null,
      body.Bairro || null,
      body.Cidade || null,
      body.UF || null,
      body.Complemento || null,
      body.Fone || null,
      body.LimiteCredito != null ? body.LimiteCredito : null,
      body.Validade || null
    ];
    const [result] = await pool.query(sql, params);
    const insertedId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM clientes WHERE ID = ?', [insertedId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar cliente' });
  }
}

export async function updateCliente(req, res) {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const fields = [
      'Codigo','Nome','CPF_CNPJ','CEP','Logradouro','Endereco','Numero','Bairro',
      'Cidade','UF','Complemento','Fone','LimiteCredito','Validade'
    ];
    const sets = [];
    const params = [];
    for (const f of fields) {
      if (body[f] !== undefined) {
        sets.push(`${f} = ?`);
        params.push(body[f]);
      }
    }
    if (sets.length === 0) return res.status(400).json({ error: 'Nada para atualizar' });
    params.push(id);
    const sql = `UPDATE clientes SET ${sets.join(', ')} WHERE ID = ?`;
    const [result] = await pool.query(sql, params);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    const [rows] = await pool.query('SELECT * FROM clientes WHERE ID = ?', [id]);
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
}

export async function deleteCliente(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM clientes WHERE ID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
}
