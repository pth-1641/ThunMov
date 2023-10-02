'use client';
import React, { Dispatch, createContext, useReducer } from 'react';
import { Category, ContextAction } from '@/types';

type StateType = {
  genres: Category[];
  countries: Category[];
};

const initialState: StateType = {
  genres: [],
  countries: [],
};

const reducer = (state: StateType, action: ContextAction) => {
  switch (action.type) {
    case 'COUNTRIES':
      return { ...state, countries: action.payload };
    case 'GENRES':
      return { ...state, genres: action.payload };
    default:
      return state;
  }
};

export const CategoryContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ContextAction>;
}>({ state: initialState, dispatch: () => null });

export const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};
