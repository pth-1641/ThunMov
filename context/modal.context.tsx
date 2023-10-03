'use client';
import { Modal } from '@/components/Modal';
import { ContextAction } from '@/types';
import React, { Dispatch, createContext, useReducer } from 'react';

export type StateType = {
  type: null | 'trailer' | 'search';
  trailerUrl: string;
  searchValue: string;
};

const initialState: StateType = {
  type: null,
  trailerUrl: '',
  searchValue: '',
};

const reducer = (state: StateType, action: ContextAction) => {
  switch (action.type) {
    case 'TRAILER':
      return { ...state, ...action.payload };
    case 'SEARCH':
      return { ...state, ...action.payload };
    case 'CLOSE':
      return initialState;
    default:
      return state;
  }
};

export const ModalContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ContextAction>;
}>({ state: initialState, dispatch: () => null });

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
