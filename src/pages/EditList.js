import React from 'react';
import QuizPreview from '../components/QuizPreview';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const EditList = () => {
  const { quizes, addQuiz } = useGlobalContext();
  let navigate = useNavigate();
  const [newQuiz, setNewQuiz] = useState({
    quizId: '',
    title: '',
    data: [],
  });

  const goEdit = (id) => {
    navigate(`/edit-quiz/${id}`);
  };

  // const addNewQuiz = () => {
  //   addQuiz(newQuiz);
  // };

  const setNewQuizTitle = (value) => {
    setNewQuiz({
      ...newQuiz,
      quizId: new Date().getTime().toString(),
      title: value,
    });
  };

  console.log(quizes);

  return (
    <>
      <div>
        <h2>Add New Quiz:</h2>
        <input
          type='text'
          value={newQuiz.title}
          onChange={(e) => setNewQuizTitle(e.target.value)}
        />
        <button
          onClick={() => {
            addQuiz(newQuiz);
          }}
        >
          + Add
        </button>
      </div>
      <h2>Edit Quizes:</h2>
      {quizes.map((quiz) => {
        return (
          <div key={quiz.quizId}>
            <QuizPreview {...quiz} isEdit={true} goEdit={goEdit} />
          </div>
        );
      })}
    </>
  );
};

export default EditList;
