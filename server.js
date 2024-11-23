import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do aplicativo Express.
const app = express();

// Carrega as rotas definidas no arquivo postsRoutes.js.
routes(app);

// Configura o diretório "uploads" para servir arquivos estáticos (imagens).
app.use(express.static("uploads"));

// Inicia o servidor na porta 3000 e exibe uma mensagem no console.
app.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000...");
});