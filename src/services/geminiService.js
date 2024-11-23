import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa a API do Google Generative AI usando a chave de API fornecida no ambiente.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo Gemini 1.5 Flash para geração de texto.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Gera uma descrição para uma imagem utilizando o modelo Gemini.
 *
 * @param {Buffer} imageBuffer - O buffer da imagem a ser descrita.
 * @returns {Promise<string>} - A descrição gerada pela IA ou uma mensagem de erro.
 */
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define o prompt para a IA, solicitando uma descrição concisa da imagem em português.
  const prompt =
    "Gere uma descrição em português do brasil com até 3 frases para a seguinte imagem. Retorne somente a descrição, sem comentários adicionais ou quebras de linhas.";

  try {
    // Cria um objeto representando a imagem, convertendo o buffer para base64.
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Envia a solicitação para o modelo Gemini com o prompt e a imagem.
    const res = await model.generateContent([prompt, image]);

    // Extrai a descrição gerada da resposta e a retorna.
    return res.response.text() || "Descrição não disponível.";
  } catch (erro) {
    // Caso ocorra algum erro, loga a mensagem de erro no console e lança uma nova exceção.
    console.error("Erro ao obter descrição:", erro.message, erro);
    throw new Error("Erro ao obter o descrição do Gemini.");
  }
};