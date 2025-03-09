import { Request, Response } from 'express';
import connection from '../database';

// Rota para buscar todos os eventos
export const getEventos = (req: Request, res: Response) => {
  connection.query('SELECT * FROM eventos ORDER BY data_evento DESC', (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      return res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
    res.json(results);
  });
};

// Rota para criar um novo evento
export const createEvento = (req: Request, res: Response) => {
  const { nome_evento, data_evento } = req.body;
  
  connection.query(
    'INSERT INTO eventos (nome_evento, data_evento) VALUES (?, ?)',
    [nome_evento, data_evento],
    (err) => {
      if (err) {
        console.error('Erro ao criar evento:', err);
        return res.status(500).json({ message: 'Erro ao criar evento' });
      }
      res.status(201).json({ message: 'Evento criado com sucesso' });
    }
  );
};