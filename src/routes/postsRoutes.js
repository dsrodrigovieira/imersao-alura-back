// Importa o express para criar a aplicação web
import express from "express";
import { index, listarTodosPosts, buscarPost } from "../controllers/postsController.js";

const routes = (app) => {
    // Habilita o middleware express.json para interpretar o corpo da requisição em formato JSON
    app.use(express.json());
    // Rota principal que retorna "Hello world" com status 200 (OK)
    app.get("/", index);
    // Rota que recupera todos os posts através da função getTodosPosts e retorna os resultados em formato JSON com status 200
    app.get("/post", listarTodosPosts);
    // Rota que recupera um post específico através da função buscarPosts e retorna os resultados em formato JSON com status 200
    app.get("/post/:id", buscarPost);  
}

export default routes;

