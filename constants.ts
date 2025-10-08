import { ProfileType, QuestionBlock } from './types';

export const ANSWER_OPTIONS = [
  { text: 'Muito a ver comigo', score: 4 },
  { text: 'Mais ou menos a ver comigo', score: 3 },
  { text: 'Um pouco a ver comigo', score: 2 },
  { text: 'Nada a ver comigo', score: 1 },
];

export const QUESTION_BLOCKS: QuestionBlock[] = [
  {
    id: 1,
    questions: [
      { id: 1, characteristics: 'Entusiasmado | Impulsivo | Otimista', profile: ProfileType.I },
      { id: 2, characteristics: 'Autoconfiante | Independente | Dominante', profile: ProfileType.D },
      { id: 3, characteristics: 'Comedido | Amável | Mediador', profile: ProfileType.S },
      { id: 4, characteristics: 'Criterioso | Cuidadoso | Especialista', profile: ProfileType.C },
    ],
  },
  {
    id: 2,
    questions: [
      { id: 5, characteristics: 'Competitivo | Arrojado | Desbravador', profile: ProfileType.D },
      { id: 6, characteristics: 'Moderado | Equilibrado | Estável', profile: ProfileType.S },
      { id: 7, characteristics: 'Preciso | Lógico | Racional', profile: ProfileType.C },
      { id: 8, characteristics: 'Articulador | Empolgante | Motivador', profile: ProfileType.I },
    ],
  },
  {
    id: 3,
    questions: [
      { id: 9, characteristics: 'Participativo | Relacional | Flexível', profile: ProfileType.I },
      { id: 10, characteristics: 'Acolhedor | Amigável | Paciente', profile: ProfileType.S },
      { id: 11, characteristics: 'Determinado | Firme | Enérgico', profile: ProfileType.D },
      { id: 12, characteristics: 'Ponderado | Orientador | Analisador', profile: ProfileType.C },
    ],
  },
  {
    id: 4,
    questions: [
      { id: 13, characteristics: 'Persuasivo | Contagiante | Estimulador', profile: ProfileType.I },
      { id: 14, characteristics: 'Conservador | Equilibrado | Responsável', profile: ProfileType.S },
      { id: 15, characteristics: 'Exato | Exigente | Estruturado', profile: ProfileType.C },
      { id: 16, characteristics: 'Resolvedor | Destemido | Desafiador', profile: ProfileType.D },
    ],
  },
  {
    id: 5,
    questions: [
      { id: 17, characteristics: 'Automotivado | Pioneiro | Impulsionador', profile: ProfileType.D },
      { id: 18, characteristics: 'Conforme | Sistemático | Sensato', profile: ProfileType.C },
      { id: 19, characteristics: 'Aconselhador | Harmônico | Apoiador', profile: ProfileType.S },
      { id: 20, characteristics: 'Curte a vida | Emotivo | Divertido', profile: ProfileType.I },
    ],
  },
  {
    id: 6,
    questions: [
      { id: 21, characteristics: 'Autodisciplinado | Detalhista | Diligente', profile: ProfileType.C },
      { id: 22, characteristics: 'Objetivo | Assertivo | Foca resultado', profile: ProfileType.D },
      { id: 23, characteristics: 'Criativo | Falante | Distraído', profile: ProfileType.I },
      { id: 24, characteristics: 'Persistente | Prevenido | Tolerante', profile: ProfileType.S },
    ],
  },
  {
    id: 7,
    questions: [
      { id: 25, characteristics: 'Comunicativo | Alegre | Extrovertido', profile: ProfileType.I },
      { id: 26, characteristics: 'Prático | Rápido | Eficiente', profile: ProfileType.D },
      { id: 27, characteristics: 'Calmo | Rotineiro | Constante', profile: ProfileType.S },
      { id: 28, characteristics: 'Teórico | Conservador | Estudioso', profile: ProfileType.C },
    ],
  },
  {
    id: 8,
    questions: [
      { id: 29, characteristics: 'Agradável | Tranquilo | Organizado', profile: ProfileType.S },
      { id: 30, characteristics: 'Pró Ativo | Empreendedor | Corajoso', profile: ProfileType.D },
      { id: 31, characteristics: 'Profundo | Perceptivo | Estratégico', profile: ProfileType.C },
      { id: 32, characteristics: 'Participativo | Facilitador | Influenciador', profile: ProfileType.I },
    ],
  },
  {
    id: 9,
    questions: [
      { id: 33, characteristics: 'Vaidoso | Simpático | Reconhecido', profile: ProfileType.I },
      { id: 34, characteristics: 'Lutador | Combativo | Agressivo', profile: ProfileType.D },
      { id: 35, characteristics: 'Conciliador | Conselheiro | Bom ouvinte', profile: ProfileType.S },
      { id: 36, characteristics: 'Idealizador | Perfeccionista | Uniforme', profile: ProfileType.C },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTION_BLOCKS.reduce((sum, block) => sum + block.questions.length, 0);

export const PROFILE_DETAILS = {
  [ProfileType.D]: {
    name: 'Dominância (D)',
    alternativeName: 'Dominância',
    color: 'dominant',
    description: 'Pessoas com perfil Dominante são focadas em resultados, competitivas e assertivas. Gostam de desafios, tomam decisões rápidas e buscam controle. São diretas, firmes e independentes.',
    keywords: ['Direto', 'Decidido', 'Ousado', 'Competitivo', 'Exigente'],
  },
  [ProfileType.I]: {
    name: 'Influência (I)',
    alternativeName: 'Influência',
    color: 'influent',
    description: 'Pessoas com perfil Influente são comunicativas, otimistas e sociáveis. Gostam de interagir, persuadir e trabalhar em equipe. São entusiasmadas, carismáticas e abertas a novas ideias.',
    keywords: ['Comunicativo', 'Entusiasmado', 'Otimista', 'Sociável', 'Persuasivo'],
  },
  [ProfileType.S]: {
    name: 'Estabilidade (S - Steadiness)',
    alternativeName: 'Estabilidade',
    color: 'stable',
    description: 'Pessoas com perfil de Estabilidade são pacientes, leais e colaboradoras. Buscam segurança, harmonia e um ambiente previsível. São calmas, consistentes e bons ouvintes.',
    keywords: ['Calmo', 'Paciente', 'Consistente', 'Leal', 'Mediador'],
  },
  [ProfileType.C]: {
    name: 'Conformidade (C - Conscientiousness)',
    alternativeName: 'Cautela',
    color: 'compliant',
    description: 'Pessoas com perfil de Conformidade são precisas, analíticas e organizadas. Valorizam a qualidade, as regras e a lógica. São cuidadosas, sistemáticas e focadas em detalhes.',
    keywords: ['Preciso', 'Analítico', 'Criterioso', 'Organizado', 'Cuidadoso'],
  },
};