import React from 'react';
import Question from '../components/Question';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

export const TakeQuiz = () => {
  const { quizId } = useParams();
  const { quizes } = useGlobalContext();
  const [current, setCurrent] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  let navigate = useNavigate();
  let quiz = quizes.find((quiz) => {
    return quiz.quizId === quizId;
  });
  let questionData = quiz.data[current];

  const nextQuestion = () => {
    if (current < quiz.data.length - 1) {
      setCurrent(current + 1);
    } else if (current >= quiz.data.length - 1) {
      setQuizFinished(true);
    }
  };

  const getAnswer = (input, answer) => {
    if (questionData.type !== 'input') {
      if (input.checked) {
        let newAnswer = answer;
        setAnswers([...answers, newAnswer]);
      } else {
        let newAnswers = answers.filter((ans) => {
          return ans !== answer;
        });
        setAnswers(newAnswers);
      }
    } else {
      if (input.value.length > 0) {
        setAnswers([{ name: input.value }]);
      }
    }
  };

  const submitResult = (e) => {
    e.preventDefault();
    nextQuestion();
    if (answers.length > 0) {
      console.log(answers);
      let resultPossitive;
      if (questionData.type === 'multiple') {
        let res = answers.every((answer) => {
          return answer.correct === true;
        });
        if (res && answers.length > 1) {
          resultPossitive = true;
        }
      } else if (questionData.type === 'single') {
        resultPossitive = answers.every((answer) => {
          return answer.correct === true;
        });
      } else {
        resultPossitive =
          answers[0].name === questionData.answers[0].name.toLowerCase();
      }
      if (resultPossitive) {
        setScore(score + 1);
      } else {
        setWrongAnswers([
          ...wrongAnswers,
          { question: questionData, wrongs: [...answers] },
        ]);
      }
    } else {
      setWrongAnswers([
        ...wrongAnswers,
        { question: questionData, wrongs: [{ name: 'You skipped answer' }] },
      ]);
    }
    setAnswers([]);
  };

  const restart = () => {
    navigate('/quiz-list');
  };

  if (quizFinished) {
    console.log(quiz.data.length);
    return (
      <section className='take-quiz-pg'>
        <article className='take-quiz-results'>
          <h3>
            Quiz finished, your total score is {score} out of {quiz.data.length}
          </h3>
          {wrongAnswers.map((wrongAnswer, index) => {
            const { question, wrongs } = wrongAnswer;
            return (
              <article key={index} className='take-quiz-res-ans'>
                In question "{question.question}", you answered:
                {wrongs.map((wrong, index) => {
                  return <li key={index}>{wrong.name}</li>;
                })}
                Correct answers were:
                {question.answers.map((answer, index) => {
                  return answer.correct && <li key={index}>{answer.name}</li>;
                })}
              </article>
            );
          })}
          <button className='back-to-quizes-btn' onClick={restart}>
            Back to Quizes
          </button>
        </article>
      </section>
    );
  }

  return (
    <Question
      current={current}
      {...questionData}
      submitResult={submitResult}
      getAnswer={getAnswer}
    />
  );
};

export default TakeQuiz;
