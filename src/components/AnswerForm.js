import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const AnswerForm = ({ name, correct, deleteAnswer }) => {
  return (
    <div>
      <span>{`${name} : `}</span>
      {correct ? <small>Correct Answer</small> : <small>Wrong Answer</small>}
      <button
        onClick={() => {
          deleteAnswer(name);
        }}
      >
        x
      </button>
    </div>
  );
};

export default AnswerForm;
