'use client';
import { ContextAction } from '@/types';
import { Dispatch, createContext, useEffect, useReducer } from 'react';

export type StateType = {
  favMovies: {
    slug: string;
    thumb_url: string;
  }[];
};

const initialState: StateType = {
  favMovies: [],
};

const reducer = (state: StateType, action: ContextAction) => {
  switch (action.type) {
    case 'INIT':
      console.log({ ...state, favMovies: action.payload });
      return { ...state, favMovies: action.payload };
    case 'ADD':
      const favMovies = [...state.favMovies, action.payload];
      localStorage.setItem('fav-movies', JSON.stringify(favMovies));
      return { ...state, favMovies };
    case 'REMOVE':
      const filterMovies = state.favMovies.filter(
        (m) => m.slug !== action.payload.slug
      );
      localStorage.setItem('fav-movies', JSON.stringify(filterMovies));
      return {
        ...state,
        favMovies: filterMovies,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ContextAction>;
}>({ state: initialState, dispatch: () => null });

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const favMovies = JSON.parse(localStorage.getItem('fav-movies') || '[]');
    dispatch({
      type: 'INIT',
      payload: favMovies,
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
