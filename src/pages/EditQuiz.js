import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useGlobalContext } from '../context';
import QuestionForm from '../components/QuestionForm';

export const EditQuiz = () => {
  const { quizId } = useParams();
  const { quizes, updateQuiz } = useGlobalContext();
  let quiz = quizes.find((quiz) => {
    return quiz.quizId === quizId;
  });
  let initialData = { ...quiz };

  const [data, setData] = useState({
    quizId: quizId,
    title: quiz.title,
    questions: quiz.data,
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
    let otherQuestions = data.questions.filter((question) => {
      return question.id !== id;
    });
    setData({ ...data, questions: [...otherQuestions, newData] });
  };

  const deleteQuestion = (id) => {
    let newQuestions = data.questions.filter((question) => {
      return question.id !== id;
    });
    setData({ ...data, questions: newQuestions });
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
    setData({ ...data, questions: [...data.questions, newQuestion] });
  };

  console.log(initialData, data.questions);

  return (
    <section className='quiz-edit-pg'>
      <article className='title-input'>
        <h3>Quiz ID: {quizId}</h3>
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
      <article className='question-add'>
        <h3>Add new question to quiz:</h3>
        <textarea
          className='question-add-input'
          type='text'
          value={newQuestion.question}
          onChange={(e) => {
            setNewQuestionContent(e.target.value);
          }}
        />
        <button className='question-add-input-btn' onClick={addNewQuestion}>
          + Question
        </button>
        <div className='question-add-type-sel'>
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
        </div>
      </article>

      <article className='question-list'>
        <h3>Edit Questions:</h3>
        {data.questions ? (
          data.questions.map((question) => {
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
          <button
            className='submit-changes-btn'
            onClick={() => {
              updateQuiz(quizId, data);
            }}
          >
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
