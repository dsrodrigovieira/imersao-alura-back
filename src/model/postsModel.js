// Importa a função para conectar ao banco de dados (provavelmente localizada em src/config/dbConfig.js)
import conectarAoBanco from "../config/dbConfig.js";
// Estabelece a conexão com o banco de dados de forma assíncrona utilizando a string de conexão da variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Função assíncrona que busca todos os posts do banco de dados
export async function getTodosPosts() {
    // Acessa o banco de dados através da conexão e seleciona a coleção "posts"
    const db = conexao.db("imersao-instabites");
    const colecao = db.collection("posts");    
    // Utiliza o método find para buscar todos os documentos da coleção e converte o resultado para um array
    return colecao.find().toArray();
}

export function buscaPostPorID(id) {
    // compara o conteúdo do parametro :id com os valores do atributo id de cada objeto da lista e retorna o index
    //return posts.findIndex( (post) => {
        // console.log(post.id===Number(id))
        //return post.id===Number(id)
    //})
    console.log("buscaPostPorID")
}