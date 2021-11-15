import React from 'react';
import { useEffect } from 'react/cjs/react.development';

const Question = ({
  current,
  type,
  question,
  answers,
  submitResult,
  getAnswer,
}) => {
  useEffect(() => {
    const inputField = document.getElementById('input-field');
    if (inputField) {
      inputField.value = '';
    }
  }, [current]);

  useEffect(() => {
    const checkedList = document.querySelectorAll('#check-input');
    checkedList.forEach((input) => {
      input.checked = false;
    });
  }, [current]);

  return (
    <div>
      <h3>{question}</h3>
      <h4>This is a {type} answer question!</h4>

      <div>
        <form onSubmit={(e) => submitResult(e)}>
          {answers.map((answer, index) => {
            return type !== 'input' ? (
              <div key={index}>
                <input
                  type='checkbox'
                  id='check-input'
                  value={answer.name}
                  onChange={(e) => getAnswer(e.target, answer)}
                />
                <label htmlFor={answer.name}>{answer.name}</label>
              </div>
            ) : (
              <div key={index}>
                <input
                  type='text'
                  defaultValue=''
                  id='input-field'
                  placeholder='write answer'
                  onChange={(e) => getAnswer(e.target, answer)}
                />
              </div>
            );
          })}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Question;
