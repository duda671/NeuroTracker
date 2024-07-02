import { Router } from 'express';

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

export default router;
