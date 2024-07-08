"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 5004;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const calculateScore = (responses) => {
    return responses.reduce((acc, current) => acc + current, 0);
};
const generateReport = (responses) => {
    const score = calculateScore(responses);
    const totalQuestions = responses.length;
    let riskLevel = "Baixo";
    if (score > totalQuestions * 0.7) {
        riskLevel = "Alto";
    }
    else if (score > totalQuestions * 0.4) {
        riskLevel = "Moderado";
    }
    let report = `Relatório de Triagem de Autismo\n`;
    report += `--------------------------------\n`;
    report += `Total de Respostas Positivas: ${score} de ${totalQuestions}\n`;
    report += `Nível de Risco: ${riskLevel}\n\n`;
    report += `Recomendações:\n`;
    switch (riskLevel) {
        case "Alto":
            report += "Recomenda-se uma avaliação detalhada com um especialista em desenvolvimento infantil.";
            break;
        case "Moderado":
            report += "Monitoramento contínuo e reavaliação após 6 meses são recomendados.";
            break;
        default:
            report += "Nenhum sinal imediato de preocupação. Continue observando o desenvolvimento da criança.";
            break;
    }
    return report;
};
// Rota para registrar um novo usuário
app.post('/api/signup', (req, res) => {
    const { userName, userAge } = req.body;
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
// Rota para login de usuário
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
// Rota para receber respostas do questionário e gerar relatório
app.post('/api/responses', (req, res) => {
    const { userName, userAge, responses } = req.body;
    if (!responses || !Array.isArray(responses)) {
        return res.status(400).send("Respostas do questionário não fornecidas ou em formato incorreto.");
    }
    const userId = (0, uuid_1.v4)();
    const reportId = (0, uuid_1.v4)();
    const report = generateReport(responses);
    const user = { id: userId, userName, userAge, reports: [] };
    (0, database_1.addUser)(user);
    (0, database_1.addReportToUser)(userId, { id: reportId, report });
    res.status(200).send(report);
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
