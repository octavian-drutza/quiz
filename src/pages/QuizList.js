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
    <section className='view-quizes-page'>
      <h3>Choose a quiz:</h3>
      <section className='view-quizes-list'>
        {quizes.map((quiz) => {
          return <QuizPreview key={quiz.quizId} {...quiz} goTake={goTake} />;
        })}
      </section>
    </section>
  );
};

export default QuizList;
