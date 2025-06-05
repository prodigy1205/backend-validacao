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

    try {
        const response = await axios.get(`https://apela-api.tech/?user=f56ef2c4-c145-4a59-b31b-afe081a88c27&cpf={{cpf}}`);
        
        setTimeout(() => {
            res.json({
                status: 'sucesso',
                dados: response.data
            });
        }, 2000);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro na consulta' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
