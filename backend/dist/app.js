"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const eventoController_1 = require("./controllers/eventoController");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Para fazer parsing do corpo da requisição
app.use((0, cors_1.default)()); // Para permitir requisições de outros domínios (como seu frontend)
app.get("/eventos", eventoController_1.getEventos);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
