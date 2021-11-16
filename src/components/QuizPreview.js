import React from 'react';
import { useGlobalContext } from '../context';

const QuizPreview = ({ quizId, title, isEdit, goEdit, goTake }) => {
  const { deleteQuiz } = useGlobalContext();

  return (
    <section className='quiz-preview'>
      <h3>Quiz ID: {quizId}</h3>
      <h3>Quiz Title: {title}</h3>

      {isEdit ? (
        <div>
          <button
            className='edit-quiz-btn'
            onClick={() => {
              goEdit(quizId);
            }}
          >
            Edit Quiz
          </button>
          <button
            className='del-quiz-btn'
            onClick={() => {
              deleteQuiz(quizId);
            }}
          >
            Delete Quiz
          </button>
        </div>
      ) : (
        <div>
          <button
            className='take-quiz-btn'
            onClick={() => {
              goTake(quizId);
            }}
          >
            Take Quiz
          </button>
        </div>
      )}
    </section>
  );
};

export default QuizPreview;
