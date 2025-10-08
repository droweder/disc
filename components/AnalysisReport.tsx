import React from 'react';
import { Answers, ProfileType, Question, Score } from '../types';
import { PROFILE_DETAILS } from '../constants';

interface AnalysisReportProps {
  scores: Score[];
  questions: Question[];
  answers: Answers;
}

const TraitList: React.FC<{ traits: string[] }> = ({ traits }) => {
    if (traits.length === 0) {
        return <p><i>Nenhuma característica específica encontrada para este nível.</i></p>;
    }
    return (
        <ul>
            {traits.map(trait => <li key={trait}>{trait}</li>)}
        </ul>
    );
};


const AnalysisReport: React.FC<AnalysisReportProps> = ({ scores, questions, answers }) => {
    const dominantProfile = scores[0];
    const secondaryProfile = scores[1];
    const lowProfiles = [scores[2], scores[3]];

    const dominantDetails = PROFILE_DETAILS[dominantProfile.profile];
    const secondaryDetails = PROFILE_DETAILS[secondaryProfile.profile];

    const getTraitsForScore = (profileType: ProfileType, score: number) => {
        return questions
            .filter(q => q.profile === profileType && answers[q.id] === score)
            .map(q => q.characteristics);
    };

    const dominantHighTraits = getTraitsForScore(dominantProfile.profile, 4);
    const secondaryMediumTraits = getTraitsForScore(secondaryProfile.profile, 3);
    const lowScoreTraits = lowProfiles.flatMap(p => getTraitsForScore(p.profile, 1));
    
    const renderAnalysis = () => {
        switch(dominantProfile.profile) {
            case ProfileType.C:
                return (
                    <>
                        <h3>1. Traços principais (alta Conformidade):</h3>
                        <p>Você marcou “<strong>muito a ver comigo</strong>” em adjetivos como:</p>
                        <TraitList traits={dominantHighTraits} />
                        <p>Esses termos indicam foco em <strong>qualidade, lógica, método e precisão</strong>. Você valoriza coerência, padrões altos, planejamento e consistência. Pensa antes de agir, prefere dados a suposições e evita decisões impulsivas.</p>

                        <h3>2. Traços secundários (moderada {secondaryDetails.alternativeName}):</h3>
                        <p>Você também se identifica <strong>moderadamente</strong> com características como:</p>
                        <TraitList traits={secondaryMediumTraits} />
                        <p>Isso indica que, embora analítico, <strong>você também busca resultados concretos</strong> e não gosta de desperdício de tempo. Tende a agir com autonomia e clareza, mas sem a impulsividade de outros perfis.</p>

                        <h3>3. Traços baixos (baixa Influência e Estabilidade):</h3>
                        <p>Adjetivos ligados a <strong>emoção, sociabilidade e espontaneidade</strong> foram marcados como <strong>nada a ver comigo</strong>:</p>
                        <TraitList traits={lowScoreTraits} />
                        <p>Isso mostra que você <strong>não busca ser o centro das atenções</strong>, prefere interações racionais e um ambiente de trabalho mais controlado e focado.</p>

                        <hr />

                        <h3>Síntese do seu estilo comportamental</h3>
                        <ul>
                            <li><strong>Perfil predominante:</strong> C – {dominantDetails.name}</li>
                            <li><strong>Secundário:</strong> {secondaryProfile.profile.toUpperCase()} – {secondaryDetails.name}</li>
                            <li><strong>Baixos:</strong> {lowProfiles[0].profile.toUpperCase()} e {lowProfiles[1].profile.toUpperCase()}</li>
                        </ul>
                        <p><strong>Descrição resumida:</strong><br />Pessoa analítica, disciplinada e exigente. Busca excelência e precisão em tudo que faz. Decide com base em dados e lógica, minimizando riscos. Tem um padrão de qualidade elevado e aversão a erros ou improvisos. Prefere autonomia e clareza de papéis em ambientes organizados.</p>

                        <h4>Possíveis pontos de atenção:</h4>
                        <ul>
                            <li>Pode demorar a decidir por querer analisar todas as variáveis (“paralisia por análise”).</li>
                            <li>Pode soar excessivamente crítico ou frio ao apontar falhas ou cobrar padrões.</li>
                            <li>Tende a sobrecarregar-se tentando atingir um nível de perfeição irrealista.</li>
                        </ul>
                    </>
                );
            case ProfileType.D:
                 return (
                    <>
                        <h3>1. Traços principais (alta Dominância):</h3>
                        <p>Você marcou “<strong>muito a ver comigo</strong>” em adjetivos como:</p>
                        <TraitList traits={dominantHighTraits} />
                        <p>Esses termos indicam foco em <strong>resultados, ação, competição e controle</strong>. Você é motivado por desafios, toma a iniciativa e busca posições de liderança e autonomia para atingir seus objetivos rapidamente.</p>

                        <h3>2. Traços secundários (moderada {secondaryDetails.alternativeName}):</h3>
                        <p>Você também se identifica <strong>moderadamente</strong> com características como:</p>
                        <TraitList traits={secondaryMediumTraits} />
                        <p>Isso mostra que, apesar do seu foco em ação, você também considera aspectos de <strong>{secondaryDetails.alternativeName.toLowerCase()}</strong>, equilibrando sua assertividade com planejamento, colaboração ou comunicação, dependendo do perfil secundário.</p>

                        <h3>3. Traços baixos (baixa Influência e Estabilidade):</h3>
                        <p>Adjetivos ligados a <strong>paciência, harmonia e diplomacia</strong> foram marcados como <strong>nada a ver comigo</strong>:</p>
                        <TraitList traits={lowScoreTraits} />
                        <p>Isso sugere que você prioriza o resultado acima do processo ou da harmonia do grupo, podendo parecer impaciente com rotinas, indecisão ou conversas sem foco claro.</p>
                        
                        <hr />

                        <h3>Síntese do seu estilo comportamental</h3>
                         <ul>
                            <li><strong>Perfil predominante:</strong> D – {dominantDetails.name}</li>
                            <li><strong>Secundário:</strong> {secondaryProfile.profile.toUpperCase()} – {secondaryDetails.name}</li>
                            <li><strong>Baixos:</strong> {lowProfiles[0].profile.toUpperCase()} e {lowProfiles[1].profile.toUpperCase()}</li>
                        </ul>
                        <p><strong>Descrição resumida:</strong><br />Pessoa assertiva, competitiva e focada em resultados. Gosta de desafios, age com rapidez e assume o controle das situações. É direto, independente e determinado a alcançar seus objetivos sem rodeios.</p>

                        <h4>Possíveis pontos de atenção:</h4>
                        <ul>
                            <li>Pode ser percebido como autoritário, impaciente ou até intimidador.</li>
                            <li>Pode ter dificuldade em ouvir outros pontos de vista, especialmente se discordarem dos seus.</li>
                            <li>Tende a assumir riscos elevados e a focar demais nas tarefas, por vezes negligenciando o lado humano.</li>
                        </ul>
                    </>
                );
            case ProfileType.I:
                return (
                    <>
                        <h3>1. Traços principais (alta Influência):</h3>
                        <p>Você marcou “<strong>muito a ver comigo</strong>” em adjetivos como:</p>
                        <TraitList traits={dominantHighTraits} />
                        <p>Esses termos indicam foco em <strong>comunicação, interação social e otimismo</strong>. Você é motivado por reconhecimento, gosta de trabalhar em equipe e tem facilidade em persuadir e motivar os outros com seu entusiasmo.</p>

                        <h3>2. Traços secundários (moderada {secondaryDetails.alternativeName}):</h3>
                        <p>Você também se identifica <strong>moderadamente</strong> com características como:</p>
                        <TraitList traits={secondaryMediumTraits} />
                        <p>Isso mostra que, apesar de sua natureza extrovertida, você também possui traços de <strong>{secondaryDetails.alternativeName.toLowerCase()}</strong>, o que pode trazer mais foco em resultados, planejamento ou harmonia para sua comunicação.</p>

                        <h3>3. Traços baixos (baixa Conformidade e Estabilidade):</h3>
                        <p>Adjetivos ligados a <strong>detalhes, rotina, e análise crítica</strong> foram marcados como <strong>nada a ver comigo</strong>:</p>
                        <TraitList traits={lowScoreTraits} />
                        <p>Isso sugere que você prefere ambientes dinâmicos e flexíveis, evitando tarefas repetitivas, detalhadas ou que exijam muita introspecção e análise solitária.</p>

                        <hr />

                        <h3>Síntese do seu estilo comportamental</h3>
                         <ul>
                            <li><strong>Perfil predominante:</strong> I – {dominantDetails.name}</li>
                            <li><strong>Secundário:</strong> {secondaryProfile.profile.toUpperCase()} – {secondaryDetails.name}</li>
                            <li><strong>Baixos:</strong> {lowProfiles[0].profile.toUpperCase()} e {lowProfiles[1].profile.toUpperCase()}</li>
                        </ul>
                        <p><strong>Descrição resumida:</strong><br />Pessoa comunicativa, entusiasmada e sociável. Constrói relacionamentos com facilidade, é otimista e persuasiva. Prefere trabalhar em equipe e se destaca em ambientes que permitem interação, criatividade e influência social.</p>

                        <h4>Possíveis pontos de atenção:</h4>
                        <ul>
                            <li>Pode ser impulsivo e pouco atento aos detalhes, prometendo mais do que consegue entregar.</li>
                            <li>Tende a evitar conflitos e a ser excessivamente otimista, ignorando potenciais problemas.</li>
                            <li>Pode ter dificuldade em seguir rotinas e focar em uma única tarefa até sua conclusão.</li>
                        </ul>
                    </>
                );
            case ProfileType.S:
                 return (
                    <>
                        <h3>1. Traços principais (alta Estabilidade):</h3>
                        <p>Você marcou “<strong>muito a ver comigo</strong>” em adjetivos como:</p>
                        <TraitList traits={dominantHighTraits} />
                        <p>Esses termos indicam foco em <strong>harmonia, segurança, lealdade e planejamento</strong>. Você é uma pessoa calma, paciente e consistente, que valoriza um ambiente previsível e colaborativo, atuando como um pilar para a equipe.</p>

                        <h3>2. Traços secundários (moderada {secondaryDetails.alternativeName}):</h3>
                        <p>Você também se identifica <strong>moderadamente</strong> com características como:</p>
                        <TraitList traits={secondaryMediumTraits} />
                        <p>Isso mostra que, junto com sua natureza calma, você incorpora elementos de <strong>{secondaryDetails.alternativeName.toLowerCase()}</strong>, o que pode adicionar um foco maior em qualidade, resultados ou comunicação ao seu perfil colaborativo.</p>

                        <h3>3. Traços baixos (baixa Dominância e Influência):</h3>
                        <p>Adjetivos ligados a <strong>competição, assertividade e auto-promoção</strong> foram marcados como <strong>nada a ver comigo</strong>:</p>
                        <TraitList traits={lowScoreTraits} />
                        <p>Isso sugere que você prefere agir nos bastidores, não gosta de mudanças bruscas e evita ser o centro das atenções ou entrar em confronto direto para preservar a harmonia.</p>
                        
                        <hr />

                        <h3>Síntese do seu estilo comportamental</h3>
                         <ul>
                            <li><strong>Perfil predominante:</strong> S – {dominantDetails.name}</li>
                            <li><strong>Secundário:</strong> {secondaryProfile.profile.toUpperCase()} – {secondaryDetails.name}</li>
                            <li><strong>Baixos:</strong> {lowProfiles[0].profile.toUpperCase()} e {lowProfiles[1].profile.toUpperCase()}</li>
                        </ul>
                        <p><strong>Descrição resumida:</strong><br />Pessoa calma, paciente e leal. É um excelente ouvinte e trabalha bem em equipe, buscando sempre a harmonia e a cooperação. Prefere ambientes estáveis e previsíveis e é extremamente confiável, metódico e consistente em suas entregas.</p>

                        <h4>Possíveis pontos de atenção:</h4>
                        <ul>
                            <li>Pode ter dificuldade em lidar com mudanças repentinas ou ambientes caóticos.</li>
                            <li>Tende a evitar conflitos necessários, podendo guardar ressentimentos ou deixar problemas crescerem.</li>
                            <li>Pode demorar para tomar decisões, especialmente sob pressão ou com informações incompletas.</li>
                        </ul>
                    </>
                );
        }
    };
    

    return (
        <div>
            <p className="text-lg text-center mb-6">
                Seu perfil predominante é <strong>{dominantDetails.alternativeName} ({dominantProfile.profile.toUpperCase()})</strong>,
                com traços secundários do tipo <strong>{secondaryDetails.alternativeName} ({secondaryProfile.profile.toUpperCase()})</strong>.
            </p>

            <div className="text-left space-y-4">
                {renderAnalysis()}
            </div>
        </div>
    );
};

export default AnalysisReport;
