import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import quizes from './quizes';

const AppContext = React.createContext();

const initialState = {
  quizes: quizes,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteQuiz = (id) => {
    dispatch({ type: 'DELETE_QUIZ', payload: id });
  };

  const updateQuiz = (id, quiz) => {
    dispatch({ type: 'UPDATE_QUIZ', payload: { id, quiz } });
  };

  const addQuiz = (quiz) => {
    dispatch({ type: 'ADD_QUIZ', payload: quiz });
  };

  return (
    <AppContext.Provider value={{ ...state, deleteQuiz, updateQuiz, addQuiz }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
