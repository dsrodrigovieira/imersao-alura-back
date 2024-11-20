// Importa o express para criar a aplicação web
import express from "express";
import routes from "./src/routes/postsRoutes.js";
// Cria a aplicação express
const app = express();
// Passa a aplicação para o arquivo de rotas
routes(app)
// Inicia o servidor na porta 3000 e imprime uma mensagem no console
app.listen(3000, () => {
  console.log("Servidor ouvindo na porta 3000...");
});