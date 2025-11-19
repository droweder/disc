import React, { useState } from 'react';
import { Answers, QuestionBlock } from '../types';
import { QUESTION_BLOCKS, ANSWER_OPTIONS, TOTAL_QUESTIONS } from '../constants';
import ProgressBar from './ProgressBar';

interface QuestionnaireScreenProps {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onFinish: (answers: Answers) => void;
}

const QuestionBlockComponent: React.FC<{
    block: QuestionBlock;
    answers: Answers;
    onAnswer: (questionId: number, score: number) => void;
}> = ({ block, answers, onAnswer }) => {
    // Determine which scores have been used in this block
    const usedScores = new Set<number>();
    block.questions.forEach(q => {
        if (answers[q.id] !== undefined) {
            usedScores.add(answers[q.id]);
        }
    });

    return (
        <div className="space-y-6">
            {block.questions.map((question) => {
                const currentAnswerForThisQuestion = answers[question.id];

                return (
                    <div key={question.id} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-slate-700 dark:text-slate-200 mb-4 text-center">{question.characteristics}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {ANSWER_OPTIONS.map((option) => {
                                const isSelected = currentAnswerForThisQuestion === option.score;
                                const isUsedByAnotherQuestion = usedScores.has(option.score) && !isSelected;
                                
                                return (
                                    <button
                                        key={option.score}
                                        onClick={() => onAnswer(question.id, option.score)}
                                        disabled={isUsedByAnotherQuestion}
                                        title={isUsedByAnotherQuestion ? 'Esta resposta já foi utilizada neste bloco.' : ''}
                                        className={`px-2 py-3 text-sm rounded-lg transition-all duration-200 ${
                                            isSelected
                                                ? 'bg-blue-600 text-white shadow-md scale-105'
                                                : isUsedByAnotherQuestion
                                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 opacity-60 cursor-not-allowed'
                                                : 'bg-white dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600'
                                        }`}
                                    >
                                        {option.text}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ answers, setAnswers, onFinish }) => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      // If the user clicks the same answer again, deselect it.
      if (newAnswers[questionId] === score) {
        delete newAnswers[questionId];
      } else {
        // Otherwise, set the new answer.
        newAnswers[questionId] = score;
      }
      return newAnswers;
    });
  };

  const isCurrentBlockAnswered = () => {
    return QUESTION_BLOCKS[currentBlockIndex].questions.every(q => answers[q.id] !== undefined);
  };
  
  const answeredCount = Object.keys(answers).length;

  const handleNext = () => {
    if (isCurrentBlockAnswered()) {
      if (currentBlockIndex < QUESTION_BLOCKS.length - 1) {
        setCurrentBlockIndex(currentBlockIndex + 1);
        window.scrollTo(0, 0);
      } else {
        onFinish(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg animate-fade-in w-full">
      <ProgressBar current={answeredCount} total={TOTAL_QUESTIONS} />
      <h3 className="text-xl font-bold text-center text-slate-700 dark:text-slate-200 my-4">
        Bloco {currentBlockIndex + 1} de {QUESTION_BLOCKS.length}
      </h3>
      
      <QuestionBlockComponent
        block={QUESTION_BLOCKS[currentBlockIndex]}
        answers={answers}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentBlockIndex === 0}
          className="bg-slate-300 text-slate-700 dark:bg-slate-600 dark:text-slate-200 font-bold py-2 px-6 rounded-lg hover:bg-slate-400 dark:hover:bg-slate-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={!isCurrentBlockAnswered()}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentBlockIndex === QUESTION_BLOCKS.length - 1 ? 'Finalizar' : 'Próximo'}
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;