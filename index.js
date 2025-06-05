app.get('/validar-cpf', async (req, res) => {
  const { cpf } = req.query;

  if (!cpf) {
    return res.status(400).json({ error: 'CPF é obrigatório' });
  }

  const url = `https://apela-api.tech/?user=f56ef2c4-c145-4a59-b31b-afe081a88c27&cpf={{cpf}}`;

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      }
    });

    const dados = response.data.data;

    if (!dados) {
      return res.status(404).json({
        status: 'erro',
        mensagem: 'CPF não encontrado ou inválido'
      });
    }

    res.json({
      status: 'sucesso',
      nome: dados.nome,
      mae: dados.mae,
      nascimento: dados.nascimento,
      sexo: dados.sexo
    });

  } catch (error) {
    console.error('DEU RUIM:', error.response ? error.response.data : error.message);
    res.status(500).json({
      error: 'Erro na consulta',
      detalhe: error.response ? error.response.data : error.message
    });
  }
});
