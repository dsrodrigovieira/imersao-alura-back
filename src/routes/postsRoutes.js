import express from "express";
import multer from "multer";
import cors from "cors";
import { index, listarTodosPosts, novoPost, uploadFile, atualizarNovoPost } from "../controllers/postsController.js";

// Configurações para o CORS (Cross-Origin Resource Sharing) - Habilita requisições de outras origens.
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Configurações para o armazenamento de arquivos via Multer - Define o diretório de destino e o nome do arquivo.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads", storage }); // Inicializa o middleware Multer com as configurações de storage.

// Função para definir as rotas da aplicação.
const routes = (app) => {
  // Habilita o middleware express.json para interpretar o corpo das requisições como JSON.
  app.use(express.json());

  // Habilita o CORS com as configurações definidas em corsOptions.
  app.use(cors(corsOptions));

  // Rota raiz ("/") - Chama a função `index` do controlador de posts.
  app.get("/", index);

  // Rota para listar todos os posts ("/post") - Chama a função `listarTodosPosts` do controlador de posts.
  app.get("/post", listarTodosPosts);

  // Rota para criar um novo post ("/post") - Chama a função `novoPost` do controlador de posts.
  app.post("/post", novoPost);

  // Rota para upload de imagem e criação de post ("/upload") - 
  // - Utiliza o middleware `upload.single("imagem")` para processar o upload do arquivo.
  // - Chama a função `uploadFile` do controlador de posts.
  app.post("/upload", upload.single("imagem"), uploadFile);

  // Rota para atualizar um post existente ("/upload/:id") - 
  // - O ":id" define um parâmetro dinâmico na URL.
  // - Chama a função `atualizarNovoPost` do controlador de posts.
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;