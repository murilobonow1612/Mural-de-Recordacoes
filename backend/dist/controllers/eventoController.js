"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvento = exports.getEventos = void 0;
const database_1 = __importDefault(require("../database"));
// Rota para buscar todos os eventos
const getEventos = (req, res) => {
    database_1.default.query('SELECT * FROM eventos ORDER BY data_evento DESC', (err, results) => {
        if (err) {
            console.error('Erro ao buscar eventos:', err);
            return res.status(500).json({ message: 'Erro ao buscar eventos' });
        }
        res.json(results);
    });
};
exports.getEventos = getEventos;
// Rota para criar um novo evento
const createEvento = (req, res) => {
    const { nome_evento, data_evento } = req.body;
    database_1.default.query('INSERT INTO eventos (nome_evento, data_evento) VALUES (?, ?)', [nome_evento, data_evento], (err) => {
        if (err) {
            console.error('Erro ao criar evento:', err);
            return res.status(500).json({ message: 'Erro ao criar evento' });
        }
        res.status(201).json({ message: 'Evento criado com sucesso' });
    });
};
exports.createEvento = createEvento;
