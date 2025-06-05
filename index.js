const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/validar-cpf', async (req, res) => {
    const { cpf } = req.query;

    if (!cpf) {
        return res.status(400).json({ error: 'CPF é obrigatório' });
    }

    const url = `https://apela-api.tech/?user=f56ef2c4-c145-4a59-b31b-afe081a88c27&cpf={{cpf}`;

    try {
        const response = await axios.get(url);
        const dados = response.data.data;

        // Tratando pra garantir que se vier vazio, avisa
        if (!dados) {
            return res.status(404).json({ 
                status: 'erro', 
                mensagem: 'CPF não encontrado ou inválido' 
            });
        }

        setTimeout(() => {
            res.json({
                status: 'sucesso',
                nome: dados.nome,
                mae: dados.mae,
                nascimento: dados.nascimento,
                sexo: dados.sexo
            });
        }, 2000); // Delay fake pra parecer processamento
    } catch (error) {
        console.error('DEU RUIM:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Erro na consulta', 
            detalhe: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
