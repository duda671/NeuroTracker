"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 5004;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
const calculateScore = (responses) => {
    return responses.reduce((acc, current) => acc + current, 0);
};
// Rota para registrar um novo usuário
app.post('/api/signup', (req, res) => {
    const { userName, userAge } = req.body;
    // Verifica se o nome de usuário já está em uso
    const existingUser = (0, database_1.getUserByName)(userName);
    if (existingUser) {
        return res.status(400).json({ message: "Nome de usuário já está em uso" });
    }
    const userId = (0, uuid_1.v4)();
    const newUser = {
        id: userId,
        userName,
        userAge,
        reports: []
    };
    (0, database_1.addUser)(newUser);
    res.status(201).json({ message: "Usuário registrado com sucesso", userId });
});
// Função para adicionar um relatório ao usuário existente
const addReportToUser = (userName, report) => {
    const db = (0, database_1.readDatabase)(); // Lê o banco de dados atual
    const user = db.users.find(user => user.userName === userName); // Encontra o usuário pelo nome
    if (user) {
        user.reports.push(report); // Adiciona o novo relatório à lista existente de relatórios
        (0, database_1.writeDatabase)(db); // Escreve as mudanças de volta ao arquivo JSON
    }
    else {
        throw new Error('User not found'); // Lança um erro se o usuário não for encontrado
    }
};
// Endpoint para receber respostas do questionário e adicionar relatório
app.post('/api/responses', (req, res) => {
    const { userName, responses } = req.body;
    if (!responses || !Array.isArray(responses)) {
        return res.status(400).send("Respostas do questionário não fornecidas ou em formato incorreto.");
    }
    try {
        const reportId = (0, uuid_1.v4)();
        const report = {
            id: reportId,
            report: generateReport(responses)
        };
        addReportToUser(userName, report);
        res.status(200).json(report);
    }
    catch (error) {
        console.error('Erro ao adicionar relatório:', error);
        res.status(404).send(error.message);
    }
});
// Rota para obter relatórios de um usuário
app.get('/api/reports/:userId', (req, res) => {
    const { userId } = req.params;
    const reports = (0, database_1.getReportsByUserId)(userId);
    if (!reports) {
        return res.status(404).send("Relatórios não encontrados para o usuário especificado.");
    }
    res.status(200).json(reports);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.post('/api/signup', (req, res) => {
    const { userName, userAge } = req.body;
    const existingUser = (0, database_1.getUserByName)(userName);
    if (existingUser) {
        return res.status(400).json({ message: "Nome de usuário já está em uso" });
    }
    const userId = (0, uuid_1.v4)();
    const newUser = { id: userId, userName, userAge, reports: [] };
    (0, database_1.addUser)(newUser);
    res.status(201).json({ message: "Usuário registrado com sucesso", userId });
});
app.post('/api/login', (req, res) => {
    const { userName } = req.body;
    const user = (0, database_1.getUserByName)(userName);
    if (user) {
        res.status(200).json({ message: "Login bem-sucedido", userId: user.id });
    }
    else {
        res.status(401).json({ message: "Usuário não encontrado" });
    }
});
app.post('/api/responses', (req, res) => {
    const { userId, responses } = req.body;
    if (!responses || !Array.isArray(responses)) {
        return res.status(400).send("Respostas do questionário não fornecidas ou em formato incorreto.");
    }
    const reportId = (0, uuid_1.v4)();
    const report = generateReport(responses);
    const user = (0, database_1.getUserById)(userId);
    if (user) {
        addReportToUser(userId, { id: reportId, report });
        res.status(200).send(report);
    }
    else {
        res.status(404).send("Usuário não encontrado");
    }
});
app.get('/api/reports/:userId', (req, res) => {
    const { userId } = req.params;
    const reports = (0, database_1.getReportsByUserId)(userId);
    if (!reports) {
        return res.status(404).send("Relatórios não encontrados para o usuário especificado.");
    }
    res.status(200).json(reports);
});
function generateReport(responses) {
    const score = responses.reduce((acc, current) => acc + current, 0);
    const totalQuestions = responses.length;
    let riskLevel = score > totalQuestions * 0.7 ? "Alto" : score > totalQuestions * 0.4 ? "Moderado" : "Baixo";
    return `Relatório de Triagem de Autismo
--------------------------------
Total de Respostas Positivas: ${score} de ${totalQuestions}
Nível de Risco: ${riskLevel}

Recomendações:
${riskLevel === "Alto" ? "Recomenda-se uma avaliação detalhada com um especialista em desenvolvimento infantil." :
        riskLevel === "Moderado" ? "Monitoramento contínuo e reavaliação após 6 meses são recomendados." :
            "Nenhum sinal imediato de preocupação. Continue observando o desenvolvimento da criança."}`;
}
