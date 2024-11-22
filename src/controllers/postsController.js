import { getTodosPosts, criarPost } from "../model/postsModel.js";
import fs from "fs";

export function index(req, res) {
    res.status(200).send("Hello world");
};

export async function listarTodosPosts(req, res) {
    const resultados = await getTodosPosts();
    res.status(200).json(resultados);
};

export async function novoPost(req,res) {
    const conteudo = req.body;
    try {
        const conteudoPost = await criarPost(conteudo);
        res.status(200).json(conteudoPost);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    };    
};

export async function uploadFile(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}