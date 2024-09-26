const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Função para carregar feedbacks de um arquivo JSON
function loadFeedbacks() {
    try {
        const data = fs.readFileSync('feedbacks.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Caso o arquivo não exista ou esteja vazio, retorna um array vazio
        return [];
    }
}

// Função para salvar feedbacks no arquivo JSON
function saveFeedbacks(feedbacks) {
    fs.writeFileSync('feedbacks.json', JSON.stringify(feedbacks, null, 2));
}

// Inicializa feedbacks com os dados carregados do arquivo
let feedbacks = loadFeedbacks();

// Endpoint para obter todos os feedbacks
app.get('/feedbacks', (req, res) => {
    res.json(feedbacks);
});

// Endpoint para adicionar um novo feedback
app.post('/feedbacks', (req, res) => {
    const newFeedback = {
        id: feedbacks.length + 1,
        userName: req.body.userName,
        comment: req.body.comment,
        rating: req.body.rating
    };
    feedbacks.push(newFeedback);
    saveFeedbacks(feedbacks); // Salva o feedback no arquivo
    res.status(201).json(newFeedback);
});

// Endpoint para deletar um feedback por ID
app.delete('/feedbacks/:id', (req, res) => {
    const feedbackId = parseInt(req.params.id, 10);
    feedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
    saveFeedbacks(feedbacks); // Atualiza o arquivo após a exclusão
    res.status(204).send();
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


