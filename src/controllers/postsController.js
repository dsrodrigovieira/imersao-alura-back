import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../model/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

/**
 * Rota raiz da aplicação.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export function index(req, res) {
  res.status(200).send("Hello world");
};

/**
 * Rota para listar todos os posts.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function listarTodosPosts(req, res) {
  const resultados = await getTodosPosts();
  res.status(200).json(resultados);
};

/**
 * Rota para criar novos posts.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function novoPost(req, res) {
    // Extrai o conteúdo do corpo da requisição, que deve conter as informações do novo post.
    const conteudo = req.body;
  
    try {
      // Chama a função `criarPost` do modelo para inserir o novo post no banco de dados.
      const conteudoPost = await criarPost(conteudo);
  
      // Retorna uma resposta HTTP 200 com o post criado como JSON.
      res.status(200).json(conteudoPost);
    } catch (e) {
      // Caso ocorra algum erro durante a criação do post, loga o erro no console e retorna
      // uma resposta HTTP 500 com uma mensagem genérica de erro.
      console.error(e.message);
      res.status(500).json({"Erro":"Falha na requisição."});
    }
  };

/**
 * Rota para atualizar nome das imagens dos posts.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function uploadFile(req, res) {
    // Cria um objeto com as informações básicas do novo post, incluindo a URL da imagem.
    const novoPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
    };
  
    try {
      // Insere o novo post no banco de dados, obtendo o ID do post inserido.
      const postCriado = await criarPost(novoPost);
  
      // Constrói o caminho completo para a imagem, utilizando o ID do post.
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
  
      // Renomeia o arquivo de imagem para o novo caminho.
      fs.renameSync(req.file.path, imagemAtualizada);
  
      // Retorna uma resposta HTTP 200 com o post criado como JSON.
      res.status(200).json(postCriado);
    } catch(erro) {
      // Caso ocorra algum erro durante o processo de upload, loga o erro no console e retorna
      // uma resposta HTTP 500 com uma mensagem genérica de erro.
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
    }
};

/**
 * Rota para atualizar a descrição dos posts.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function atualizarNovoPost(req, res) {
    // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
    const id = req.params.id;
  
    // Constrói a URL completa da imagem com base no ID do post.
    const urlImagem = `http://localhost:3000/${id}.png`;
  
    try {
      // Lê o conteúdo da imagem do sistema de arquivos e o armazena em um buffer.
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
  
      // Chama o serviço Gemini para gerar uma descrição para a imagem com base no buffer.
      const descricao = await gerarDescricaoComGemini(imgBuffer);
  
      // Cria um objeto com as informações atualizadas do post, incluindo a URL da imagem, a descrição gerada e a tag alt.
      const post = {
        imgUrl: urlImagem,
        descricao: descricao,
        alt: req.body.alt
      };
  
      // Chama a função `atualizarPost` do modelo para atualizar o post no banco de dados.
      const conteudoPost = await atualizarPost(id, post);
  
      // Retorna uma resposta HTTP 200 com o post atualizado como JSON.
      res.status(200).json(conteudoPost);
    } catch (e) {
      // Caso ocorra algum erro durante o processo de atualização, loga o erro no console e retorna
      // uma resposta HTTP 500 com uma mensagem genérica de erro.
      console.error(e.message);
      res.status(500).json({"Erro":"Falha na requisição."});
    }
  };