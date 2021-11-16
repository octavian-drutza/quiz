import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const AnswerForm = ({ name, correct, deleteAnswer }) => {
  return (
    <section className='answer'>
      <span>{`${name} : `}</span>
      {correct ? <small>Correct Answer</small> : <small>Wrong Answer</small>}
      <button
        className='del-answer-btn'
        onClick={() => {
          deleteAnswer(name);
        }}
      >
        x
      </button>
    </section>
  );
};

export default AnswerForm;
