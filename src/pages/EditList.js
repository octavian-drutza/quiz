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

  const setNewQuizTitle = (value) => {
    setNewQuiz({
      ...newQuiz,
      quizId: new Date().getTime().toString(),
      title: value,
    });
  };

  console.log(quizes);

  return (
    <section className='edit-quizes-list'>
      <article className='add-new-quiz'>
        <h3>Add New Quiz:</h3>
        <input
          type='text'
          value={newQuiz.title}
          onChange={(e) => setNewQuizTitle(e.target.value)}
        />
        <button
          className='add-quiz-btn'
          onClick={() => {
            addQuiz(newQuiz);
          }}
        >
          + Add
        </button>
      </article>
      <article className='quiz'>
        <h3>Edit Quizes:</h3>
        {quizes.map((quiz) => {
          return (
            <div key={quiz.quizId}>
              <QuizPreview {...quiz} isEdit={true} goEdit={goEdit} />
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default EditList;
