import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getEventos } from './controllers/eventoController';

dotenv.config();

const app = express();

app.use(express.json()); // Para fazer parsing do corpo da requisição
app.use(cors()); // Para permitir requisições de outros domínios (como seu frontend)

app.get('/eventos', getEventos);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
