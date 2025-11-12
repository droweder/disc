import { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Score } from '../types';

interface UseGeminiAnalysisProps {
  scores: Score[];
  participantName: string;
  savedAnalysis?: string;
}

const useGeminiAnalysis = ({ scores, participantName, savedAnalysis }: UseGeminiAnalysisProps) => {
  const [analysis, setAnalysis] = useState<string>(savedAnalysis || '');
  const [loading, setLoading] = useState<boolean>(!savedAnalysis);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);

    const scoreString = scores.map(s => `${s.profile}: ${s.value}`).join(', ');
    
    const prompt = `
      Você é um especialista em análise de perfil comportamental DISC.
      Sua tarefa é criar um relatório detalhado, humano e encorajador para ${participantName}, com base nas seguintes pontuações do teste DISC: ${scoreString}.

      O relatório deve ser escrito em português do Brasil e ter a seguinte estrutura:

      ### Síntese do Perfil de ${participantName}
      - Um parágrafo conciso que destaca o perfil predominante e o secundário, descrevendo a principal dinâmica comportamental.

      ### Perfil Predominante: [Nome do Perfil Dominante]
      - **Características Principais:** Descreva em 3-4 frases as qualidades e o estilo de comportamento associados ao perfil mais alto. Use os adjetivos do teste como base, mas elabore.
      - **Motivadores:** O que impulsiona uma pessoa com este perfil? O que ela busca em seu ambiente de trabalho e vida pessoal?
      - **Comunicação:** Como essa pessoa prefere se comunicar e receber informações?

      ### Influência do Perfil Secundário: [Nome do Perfil Secundário]
      - Descreva como o segundo perfil mais alto complementa ou modula o perfil principal. Por exemplo, como um 'D' com um secundário 'C' difere de um 'D' puro.

      ### Pontos de Desenvolvimento
      - De forma construtiva e amigável, aponte 2-3 possíveis pontos de atenção ou áreas para desenvolvimento. Ofereça sugestões práticas para cada ponto.

      Use um tom profissional, mas acolhedor. Formate a resposta usando markdown, com títulos (###) e listas de marcadores (-). Não inclua nenhuma introdução ou conclusão além do que foi pedido. Comece diretamente com o primeiro título.
    `;


    try {
      if (!process.env.API_KEY) {
        throw new Error('A chave de API não foi configurada.');
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAnalysis(response.text);
    } catch (e: any) {
      console.error(e);
      setError('Não foi possível gerar a análise. Verifique a conexão ou a configuração da API.');
    } finally {
      setLoading(false);
    }
  }, [scores, participantName]);
  
  useEffect(() => {
    if (!savedAnalysis) {
      generateAnalysis();
    }
  }, [savedAnalysis, generateAnalysis]);

  return { analysis, loading, error, generateAnalysis };
};

export default useGeminiAnalysis;
