const reducer = (state, action) => {
  if (action.type === 'DELETE_QUIZ') {
    let newQuizes = state.quizes.filter((quiz) => {
      return quiz.quizId !== action.payload;
    });
    return { ...state, quizes: [...newQuizes] };
  }

  if (action.type === 'UPDATE_QUIZ') {
    let newQuizes = state.quizes.filter((quiz) => {
      return quiz.quizId !== action.payload.id;
    });
    return { ...state, quizes: [...newQuizes, action.payload.quiz] };
  }

  if (action.type === 'ADD_QUIZ') {
    return { ...state, quizes: [...state.quizes, action.payload] };
  }

  throw new Error('not found action type');
};

export default reducer;
