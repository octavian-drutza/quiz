import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AnswerForm from './AnswerForm';

const QuestionForm = ({ content, deleteQuestion, setQuestion }) => {
  const { id, type, question, answers } = content;

  const [questionData, setQuestionData] = useState({
    id: id,
    type: type,
    question: question,
    answers: answers,
  });

  const [answerData, setAnswerData] = useState({
    name: '',
    correct: false,
  });

  useEffect(() => {
    setQuestion(id, questionData);
  }, [questionData]);

  const setType = (value) => {
    setQuestionData({ ...questionData, type: value });
  };

  const setQuestionContent = (value) => {
    setQuestionData({ ...questionData, question: value });
  };

  const setAnswer = () => {
    setQuestionData({ ...questionData, answers: [...answers, answerData] });
  };

  const deleteAnswer = (name) => {
    let newAnswers = questionData.answers.filter((answer) => {
      return answer.name !== name;
    });
    setQuestionData({ ...questionData, answers: newAnswers });
  };

  const getAnswerValue = (value) => {
    setAnswerData({ ...answerData, name: value });
  };

  const getAnswerStatus = (input) => {
    if (input.checked) {
      setAnswerData({ ...answerData, correct: true });
    } else {
      setAnswerData({ ...answerData, correct: false });
    }
  };

  // console.log(questionData);

  return (
    <section className='question-edit'>
      <div>
        <article className='edit-input'>
          <label htmlFor='titleInput'>Question Title:</label>
          <input
            type='text'
            name='titleInput'
            value={questionData.question}
            onChange={(e) => {
              setQuestionContent(e.target.value);
            }}
          />
        </article>
        <article className='edit-type'>
          <label htmlFor='typeSelect'>Question Type:</label>
          <select
            name='typeSelect'
            value={questionData.type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value='multiple'>Multiple Answers</option>
            <option value='single'>Single Answer</option>
            <option value='input'>Input</option>
          </select>
        </article>

        <article className='add-answer'>
          <h5>Add new answer:</h5>
          <input
            type='text'
            value={answerData.name}
            onChange={(e) => {
              getAnswerValue(e.target.value);
            }}
          />
          <input
            type='checkbox'
            checked={answerData.correct}
            onChange={(e) => {
              getAnswerStatus(e.target);
            }}
          />
          <button className='add-answer-btn' onClick={setAnswer}>
            + Answer
          </button>
        </article>

        <article className='answers-list'>
          <h5>Edit answers:</h5>
          {questionData.answers ? (
            questionData.answers.map((answer, index) => {
              return (
                <AnswerForm
                  key={index}
                  {...answer}
                  deleteAnswer={deleteAnswer}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </article>

        <button
          className='del-question-btn'
          onClick={() => {
            deleteQuestion(id);
          }}
        >
          Delete Question
        </button>

        {/* <button
          onClick={() => {
            setQuestionData({
              ...questionData,
              type: content.type,
              question: content.question,
              answers: content.answers,
            });
          }}
        >
          Discard Question Changes
        </button> */}
      </div>
    </section>
  );
};

export default QuestionForm;
