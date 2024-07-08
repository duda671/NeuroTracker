import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { addUser, addReportToUser, getUserById, getReportsByUserId, getUserByName, readDatabase } from '../database';

const router = Router();

const mockHistory = [
  { date: '2023-06-01', report: 'Report 1' },
  { date: '2023-06-15', report: 'Report 2' },
];

const mockReport = {
  summary: 'This is a mock summary of the report.',
  recommendations: ['Recommendation 1', 'Recommendation 2'],
};

router.get('/history', (req, res) => {
  res.json(mockHistory);
});

router.get('/report', (req, res) => {
  res.json(mockReport);
});

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
router.post('/signup', (req, res) => {
  const { userName, userAge }: { userName: string; userAge: string } = req.body;

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
router.post('/login', (req, res) => {
  const { userName }: { userName: string } = req.body;

  const user = getUserByName(userName);

  if (user) {
    res.status(200).json({ message: "Login bem-sucedido", userId: user.id });
  } else {
    res.status(401).json({ message: "Usuário não encontrado" });
  }
});

// Rota para receber respostas do questionário e gerar relatório
router.post('/responses', (req, res) => {
  const { userName, userAge, responses }: QuestionnaireResponse = req.body;

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).send("Respostas do questionário não fornecidas ou em formato incorreto.");
  }

  const userId = uuidv4();
  const reportId = uuidv4();
  const report = generateReport(responses);

  const user = { id: userId, userName, userAge, reports: [] };
  addUser(user);
  addReportToUser(userId, { id: reportId, report });

  res.status(200).send(report);
});

// Rota para obter relatórios de um usuário
router.get('/reports/:userId', (req, res) => {
  const { userId } = req.params;
  const reports = getReportsByUserId(userId);

  if (!reports) {
    return res.status(404).send("Relatórios não encontrados para o usuário especificado.");
  }

  res.status(200).json(reports);
});


export default router;
