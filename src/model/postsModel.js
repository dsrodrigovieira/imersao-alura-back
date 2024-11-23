import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão fornecida.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

/**
 * Função para obter todos os posts do banco de dados.
 *
 * @returns {Promise<Array>} - Um array de objetos representando os posts.
 */
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabites".
  const db = conexao.db("imersao-instabites");

  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");

  // Busca todos os documentos da coleção e retorna um array de objetos.
  return colecao.find().toArray();
}

/**
 * Função para criar um novo post no banco de dados.
 *
 * @param {Object} novoPost - O objeto contendo as informações do novo post.
 * @returns {Promise<InsertOneResult>} - O resultado da operação de inserção.
 */
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabites".
  const db = conexao.db("imersao-instabites");

  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");

  // Insere o novo post na coleção e retorna o resultado da operação.
  return colecao.insertOne(novoPost);
}

/**
 * Função para atualizar um post existente no banco de dados.
 *
 * @param {string} id - O ID do post a ser atualizado.
 * @param {Object} novoPost - O objeto contendo as informações atualizadas do post.
 * @returns {Promise<UpdateResult>} - O resultado da operação de atualização.
 */
export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados "imersao-instabites".
  const db = conexao.db("imersao-instabites");

  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");

  // Converte o ID do post em um objeto ObjectId do MongoDB.
  const objectID = ObjectId.createFromHexString(id);

  // Atualiza o post com o ID especificado, substituindo os campos com as novas informações.
  return colecao.updateOne({ _id: new ObjectId(objectID) }, { $set: novoPost });
}