import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const apiKey = process.env.API_KEY;

// Initialize Gemini client safely
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const chatWithAssistant = async (
  userMessage: string, 
  history: { role: 'user' | 'model', text: string }[],
  currentProducts: Product[]
): Promise<string> => {
  if (!ai) {
    return "O assistente virtual está indisponível no momento (Chave de API não configurada).";
  }

  try {
    // Construct system instruction with product context form DB
    const productContext = currentProducts.map(p => 
      `- ${p.name} (Ref: ${p.reference}): ${p.description}. Preço: R$${p.price.toFixed(2)}. Cores: ${p.availableColors.join(', ')}. Tamanhos: ${p.availableSizes.join(', ')}.`
    ).join('\n');

    const systemInstruction = `
      Você é a "Estilista Virtual" da Sea Surf, uma marca de representação de roupas elegante e sofisticada.
      
      Seu objetivo é ajudar os clientes a escolherem peças do catálogo.
      Seja educada, use um tom profissional mas acolhedor.
      
      Aqui está o catálogo de produtos disponíveis atualizado:
      ${productContext}
      
      Responda dúvidas sobre tecidos, caimentos, preços e sugestões de combinações.
      Se o cliente perguntar sobre algo que não está na lista, informe gentilmente que não temos no momento.
      Mantenha as respostas concisas (máximo 3 parágrafos curtos).
    `;

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({
        message: userMessage
    });

    return result.text || "Desculpe, não consegui entender. Poderia reformular?";

  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return "Tive um pequeno problema técnico. Tente novamente em instantes.";
  }
};
