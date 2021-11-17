import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useGlobalContext } from '../context';
import QuestionForm from '../components/QuestionForm';
import { useNavigate } from 'react-router-dom';

export const EditQuiz = () => {
  const { quizId } = useParams();
  const { quizes, updateQuiz } = useGlobalContext();
  let navigate = useNavigate();
  let quiz = quizes.find((quiz) => {
    return quiz.quizId === quizId;
  });

  const [data, setData] = useState({
    quizId: quizId,
    title: quiz.title,
    data: quiz.data,
  });

  const [newQuestion, setNewQuestion] = useState({
    id: '',
    question: '',
    type: 'multiple',
    answers: [],
  });

  const setTitle = (value) => {
    setData({ ...data, title: value });
  };

  const setQuestion = (id, newData) => {
    let otherQuestions = data.data.filter((question) => {
      return question.id !== id;
    });
    setData({ ...data, data: [...otherQuestions, newData] });
  };

  const deleteQuestion = (id) => {
    let newQuestions = data.data.filter((question) => {
      return question.id !== id;
    });
    setData({ ...data, data: newQuestions });
  };

  const setNewQuestionContent = (value) => {
    setNewQuestion({
      ...newQuestion,
      question: value,
      id: new Date().getTime().toString(),
    });
  };

  const setNewQuestionType = (value) => {
    setNewQuestion({
      ...newQuestion,
      type: value,
    });
  };

  const addNewQuestion = () => {
    setData({ ...data, data: [...data.data, newQuestion] });
  };

  const submitAndGo = () => {
    updateQuiz(quizId, data);
    navigate('/edit-list');
  };

  // console.log(initialData, data.data);

  return (
    <section className='quiz-edit-pg'>
      <article className='question-list'>
        <h3>Quiz ID: {quizId}</h3>
        <article className='title-add'>
          <article className='change-title-input'>
            <label htmlFor='titleInput'>Title:</label>
            <input
              type='text'
              name='titleInput'
              value={data.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </article>
        </article>
        <h3>Add new question to quiz:</h3>
        <section className='question-add'>
          <article className='add-question-input'>
            <label htmlFor='questionAddTitle'>Question Title:</label>
            <div className='add-question-input-group '>
              <input
                name='questionAddTitle'
                type='text'
                value={newQuestion.question}
                onChange={(e) => {
                  setNewQuestionContent(e.target.value);
                }}
              />
              <button className='add-question-btn' onClick={addNewQuestion}>
                +
              </button>
            </div>
          </article>

          <article className='add-question-type'>
            <label htmlFor='typeSelect'>Question Type:</label>
            <select
              name='typeSelect'
              value={newQuestion.type}
              onChange={(e) => {
                setNewQuestionType(e.target.value);
              }}
            >
              <option value='multiple'>Multiple Answers</option>
              <option value='single'>Single Answer</option>
              <option value='input'>Input</option>
            </select>
          </article>
        </section>
        <h3>Edit Questions:</h3>
        {data.data ? (
          data.data.map((question) => {
            return (
              <QuestionForm
                key={question.id}
                content={question}
                deleteQuestion={deleteQuestion}
                setQuestion={setQuestion}
              />
            );
          })
        ) : (
          <h4>no questions yet</h4>
        )}
        <div>
          <button className='submit-changes-btn' onClick={submitAndGo}>
            Submit All Changes
          </button>
          {/* <button
          onClick={() => {
            setData({
              quizId: initialData.quizId,
              title: initialData.title,
              questions: initialData.data,
            });
          }}
        >
          Back to Edit List
        </button> */}
        </div>
      </article>
    </section>
  );
};

export default EditQuiz;
