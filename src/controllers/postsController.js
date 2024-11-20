import { getTodosPosts, buscaPostPorID } from "../model/postsModel.js";

export function index(req, res) {
    res.status(200).send("Hello world");
};

export async function listarTodosPosts(req, res) {
    const resultados = await getTodosPosts();
    res.status(200).json(resultados);
};

export async function buscarPost(req,res) {
    const index = buscaPostPorID(req.params.id)
    res.status(200).json(posts[index]);
}