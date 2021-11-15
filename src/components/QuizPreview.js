import React from 'react';
import { useGlobalContext } from '../context';

const QuizPreview = ({ quizId, title, isEdit, goEdit, goTake }) => {
  const { deleteQuiz } = useGlobalContext();

  return (
    <>
      <div>
        <h3>Quiz ID: {quizId}</h3>
        <h3>Quiz Title: {title}</h3>
      </div>
      {isEdit ? (
        <div>
          <button
            onClick={() => {
              goEdit(quizId);
            }}
          >
            Edit Quiz
          </button>
          <button
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
            onClick={() => {
              goTake(quizId);
            }}
          >
            Take Quiz
          </button>
        </div>
      )}
    </>
  );
};

export default QuizPreview;
