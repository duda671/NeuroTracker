import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = 5004;

app.use(cors()); 
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
