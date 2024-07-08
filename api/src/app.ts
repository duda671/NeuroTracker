import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { addUser, addReportToUser, getUserById, getReportsByUserId, getUserByName, readDatabase } from './database';

const app = express();
const port = 5004;

app.use(cors()); 
app.use(express.json());
app.use('/api', routes);
app.use(express.json());
app.use(bodyParser.json());

interface QuestionnaireResponse {
  userName: string;
  userAge: string;
  responses: number[];
}

const calculateScore = (responses: number[]): number => {
  return responses.reduce((acc, current) => acc + current, 0);
};

const generateReport = (responses: number[]): string => {
  const score = calculateScore(responses);
  const totalQuestions = responses.length;
  let riskLevel = "Baixo";

  if (score > totalQuestions * 0.7) {
    riskLevel = "Alto";
  } else if (score > totalQuestions * 0.4) {
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
  const { userName, userAge }: { userName: string; userAge: string } = req.body;

  // Verifica se o nome de usuário já está em uso
  const existingUser = getUserByName(userName);
  if (existingUser) {
    return res.status(400).json({ message: "Nome de usuário já está em uso" });
  }

  const userId = uuidv4();
  const newUser = {
    id: userId,
    userName,
    userAge,
    reports: []
  };

  addUser(newUser);
  res.status(201).json({ message: "Usuário registrado com sucesso", userId });
});


// Rota para login de usuário
app.post('/api/login', (req, res) => {
  const { userName }: { userName: string } = req.body;

  const user = getUserByName(userName);

  if (user) {
    res.status(200).json({ message: "Login bem-sucedido", userId: user.id });
  } else {
    res.status(401).json({ message: "Usuário não encontrado" });
  }
});

// Rota para receber respostas do questionário e gerar relatório
app.post('/api/responses', (req, res) => {
  const { userId, responses }: { userId: string; responses: number[] } = req.body;

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).send("Respostas do questionário não fornecidas ou em formato incorreto.");
  }

  const reportId = uuidv4();
  const report = generateReport(responses);

  const user = getUserById(userId);
  if (user) {
    addReportToUser(userId, { id: reportId, report });
    res.status(200).send(report);
  } else {
    res.status(404).send("Usuário não encontrado");
  }
});

// Rota para obter relatórios de um usuário
app.get('/api/reports/:userId', (req, res) => {
  const { userId } = req.params;
  const reports = getReportsByUserId(userId);

  if (!reports) {
    return res.status(404).send("Relatórios não encontrados para o usuário especificado.");
  }

  res.status(200).json(reports);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});