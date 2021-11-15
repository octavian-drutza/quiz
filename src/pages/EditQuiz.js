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

  console.log(quizes);

  return (
    <>
      <h2>Quiz ID: {quizId}</h2>
      <label htmlFor='titleInput'>Title:</label>
      <input
        type='text'
        name='titleInput'
        value={data.title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <h3>Add new question to quiz:</h3>
      <input
        type='text'
        value={newQuestion.question}
        onChange={(e) => {
          setNewQuestionContent(e.target.value);
        }}
      />
      <button onClick={addNewQuestion}>Add Question</button>

      <div>
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

      <h3>Edit Questions:</h3>

      {data.questions ? (
        data.questions.map((question) => {
          return (
            <QuestionForm
              key={question.id}
              {...question}
              deleteQuestion={deleteQuestion}
              setQuestion={setQuestion}
            />
          );
        })
      ) : (
        <div>no questions yet</div>
      )}

      <div>
        <button
          onClick={() => {
            updateQuiz(quizId, data);
          }}
        >
          Save Changes
        </button>
        <button>Discard Changes</button>
      </div>
    </>
  );
};

export default EditQuiz;
