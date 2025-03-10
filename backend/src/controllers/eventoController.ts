import { Request, Response } from 'express';
import connection from '../database';

// Rota para buscar todos os eventos
export const getEventos = (req: Request, res: Response) => {

  connection.query('SELECT * FROM eventos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      return res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
    res.json(results);
  });
};