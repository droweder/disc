import { PROFILE_DETAILS } from './constants';
import { Answers, ProfileType, Question, Score } from './types';

const getTraitsForScore = (
  profileType: ProfileType,
  score: number,
  questions: Question[],
  answers: Answers
) => {
  return questions
    .filter(q => q.profile === profileType && answers[q.id] === score)
    .map(q => q.characteristics);
};

const getAnswerText = (value: number) => {
  switch (value) {
    case 4: return 'Muito a ver comigo';
    case 3: return 'Tem a ver comigo';
    case 2: return 'Pouco a ver comigo';
    case 1: return 'Nada a ver comigo';
    default: return '';
  }
};

export const generateReportText = (
  participantName: string,
  scores: Score[],
  questions: Question[],
  answers: Answers
): string => {
  if (scores.length < 4) return 'Relatório indisponível.';

  const dominantProfile = scores[0];
  const secondaryProfile = scores[1];
  const lowProfiles = [scores[2], scores[3]];

  const dominantDetails = PROFILE_DETAILS[dominantProfile.profile];
  const secondaryDetails = PROFILE_DETAILS[secondaryProfile.profile];

  const dominantHighTraits = getTraitsForScore(dominantProfile.profile, 4, questions, answers);
  const secondaryMediumTraits = getTraitsForScore(secondaryProfile.profile, 3, questions, answers);
  const lowScoreTraits = lowProfiles.flatMap(p => getTraitsForScore(p.profile, 1, questions, answers));

  let report = `Resultado de ${participantName}\n\n`;
  report += `Seu perfil predominante é ${dominantDetails.alternativeName} (${dominantProfile.profile.toUpperCase()}), com traços secundários do tipo ${secondaryDetails.alternativeName} (${secondaryProfile.profile.toUpperCase()}).\n\n`;

  const analysisParts: Record<ProfileType, () => string> = {
    [ProfileType.C]: () => `
*1. Traços principais (alta Conformidade):*
Você marcou “muito a ver comigo” em adjetivos como: ${dominantHighTraits.join(', ')}.
Esses termos indicam foco em qualidade, lógica, método e precisão.

*2. Traços secundários (moderada ${secondaryDetails.alternativeName}):*
Você também se identifica moderadamente com: ${secondaryMediumTraits.join(', ')}.
Isso indica que, embora analítico, você também busca resultados concretos.

*3. Traços baixos (baixa Influência e Estabilidade):*
Adjetivos como ${lowScoreTraits.join(', ')} foram marcados como "nada a ver comigo", mostrando que você prefere interações racionais e um ambiente controlado.

*Síntese:*
Perfil: C – ${dominantDetails.name}
Secundário: ${secondaryProfile.profile.toUpperCase()} – ${secondaryDetails.name}
Descrição: Pessoa analítica, disciplinada e exigente. Busca excelência e precisão.
Pontos de atenção: Pode demorar a decidir, soar excessivamente crítico ou se sobrecarregar com perfeccionismo.
`,
    [ProfileType.D]: () => `
*1. Traços principais (alta Dominância):*
Você marcou “muito a ver comigo” em adjetivos como: ${dominantHighTraits.join(', ')}.
Esses termos indicam foco em resultados, ação e competição.

*2. Traços secundários (moderada ${secondaryDetails.alternativeName}):*
Você também se identifica moderadamente com: ${secondaryMediumTraits.join(', ')}.
Isso equilibra sua assertividade com planejamento ou colaboração.

*3. Traços baixos (baixa Influência e Estabilidade):*
Adjetivos como ${lowScoreTraits.join(', ')} foram marcados como "nada a ver comigo", sugerindo que você prioriza o resultado acima do processo.

*Síntese:*
Perfil: D – ${dominantDetails.name}
Secundário: ${secondaryProfile.profile.toUpperCase()} – ${secondaryDetails.name}
Descrição: Pessoa assertiva, competitiva e focada em resultados. Gosta de desafios e age com rapidez.
Pontos de atenção: Pode ser percebido como autoritário, impaciente ou ter dificuldade em ouvir outros pontos de vista.
`,
    [ProfileType.I]: () => `
*1. Traços principais (alta Influência):*
Você marcou “muito a ver comigo” em adjetivos como: ${dominantHighTraits.join(', ')}.
Esses termos indicam foco em comunicação, interação social e otimismo.

*2. Traços secundários (moderada ${secondaryDetails.alternativeName}):*
Você também se identifica moderadamente com: ${secondaryMediumTraits.join(', ')}.
Isso pode trazer mais foco em resultados ou planejamento para sua comunicação.

*3. Traços baixos (baixa Conformidade e Estabilidade):*
Adjetivos como ${lowScoreTraits.join(', ')} foram marcados como "nada a ver comigo", sugerindo que você prefere ambientes dinâmicos e flexíveis.

*Síntese:*
Perfil: I – ${dominantDetails.name}
Secundário: ${secondaryProfile.profile.toUpperCase()} – ${secondaryDetails.name}
Descrição: Pessoa comunicativa, entusiasmada e sociável. Constrói relacionamentos com facilidade.
Pontos de atenção: Pode ser impulsivo, pouco atento a detalhes ou ter dificuldade em seguir rotinas.
`,
    [ProfileType.S]: () => `
*1. Traços principais (alta Estabilidade):*
Você marcou “muito a ver comigo” em adjetivos como: ${dominantHighTraits.join(', ')}.
Esses termos indicam foco em harmonia, segurança e lealdade.

*2. Traços secundários (moderada ${secondaryDetails.alternativeName}):*
Você também se identifica moderadamente com: ${secondaryMediumTraits.join(', ')}.
Isso pode adicionar um foco maior em qualidade ou resultados ao seu perfil colaborativo.

*3. Traços baixos (baixa Dominância e Influência):*
Adjetivos como ${lowScoreTraits.join(', ')} foram marcados como "nada a ver comigo", sugerindo que você prefere agir nos bastidores e não gosta de mudanças bruscas.

*Síntese:*
Perfil: S – ${dominantDetails.name}
Secundário: ${secondaryProfile.profile.toUpperCase()} – ${secondaryDetails.name}
Descrição: Pessoa calma, paciente e leal. Excelente ouvinte e trabalha bem em equipe.
Pontos de atenção: Pode ter dificuldade em lidar com mudanças, evitar conflitos necessários ou demorar para tomar decisões.
`,
  };

  report += analysisParts[dominantProfile.profile]();

  report += '\n\n--- MINHAS RESPOSTAS ---\n';
  questions.forEach(q => {
    const answerValue = answers[q.id];
    if (answerValue) {
      report += `- ${q.characteristics}: ${getAnswerText(answerValue)}\n`;
    }
  });

  return report.trim();
};