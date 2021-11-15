import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AnswerForm from './AnswerForm';

const QuestionForm = ({
  id,
  type,
  question,
  answers,
  deleteQuestion,
  setQuestion,
}) => {
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

  // console.log(answerData);

  return (
    <>
      <div>
        <label htmlFor='titleInput'>Question Title:</label>
        <input
          type='text'
          name='titleInput'
          value={questionData.question}
          onChange={(e) => {
            setQuestionContent(e.target.value);
          }}
        />
        <button
          onClick={() => {
            deleteQuestion(id);
          }}
        >
          Delete Question
        </button>

        <div>
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
        </div>
        <div>
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
          <button onClick={setAnswer}>+ Answer</button>
        </div>
        <h5>Edit answers:</h5>
        {questionData.answers ? (
          questionData.answers.map((answer, index) => {
            return (
              <AnswerForm key={index} {...answer} deleteAnswer={deleteAnswer} />
            );
          })
        ) : (
          <div></div>
        )}

        <br />
      </div>
    </>
  );
};

export default QuestionForm;
