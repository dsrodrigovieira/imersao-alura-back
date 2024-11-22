import express from "express";
import multer from "multer";
import { index, listarTodosPosts, novoPost, uploadFile } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita o middleware express.json para interpretar o corpo da requisição em formato JSON
    app.use(express.json());
    // Rota principal que retorna "Hello world" com status 200 (OK)
    app.get("/", index);
    // Rota que recupera todos os posts através da função getTodosPosts e retorna os resultados em formato JSON com status 200
    app.get("/post", listarTodosPosts);
    app.post("/post", novoPost);  
    app.post("/upload", upload.single("imagem"), uploadFile)
}

export default routes;

