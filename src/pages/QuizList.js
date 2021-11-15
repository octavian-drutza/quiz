import React from 'react';
import QuizPreview from '../components/QuizPreview';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

export const QuizList = () => {
  const { quizes } = useGlobalContext();
  let navigate = useNavigate();

  const goTake = (id) => {
    navigate(`/take-quiz/${id}`);
  };

  return (
    <>
      {quizes.map((quiz) => {
        return (
          <div key={quiz.quizId}>
            <QuizPreview {...quiz} goTake={goTake} />
          </div>
        );
      })}
    </>
  );
};

export default QuizList;
