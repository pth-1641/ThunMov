"use client";
import { Modal } from "@/components/Modal";
import { ContextAction } from "@/types";
import { Dispatch, createContext, useEffect, useReducer } from "react";
import { usePathname } from "next/navigation";

export type StateType = {
  hasShown: boolean;
  modalType: null | "trailer" | "search" | "warning" | "share";
  videoTrailerId: string;
  searchValue: string;
};

const initialState: StateType = {
  hasShown: false,
  modalType: null,
  videoTrailerId: "",
  searchValue: "",
};

const reducer = (state: StateType, action: ContextAction) => {
  switch (action.type) {
    case "TRAILER":
    case "SEARCH":
    case "SHARE":
    case "WARNING":
      return { ...state, ...action.payload };
    case "UPDATE_SESSION":
      return { ...initialState, hasShown: true };
    case "CLOSE":
      return { ...initialState, ...action.payload };
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
  const pathname = usePathname();

  useEffect(() => {
    if (!state.hasShown && pathname === "/the-loai/phim-18") {
      dispatch({
        type: "WARNING",
        payload: {
          modalType: "warning",
        },
      });
    }
  }, [pathname]);

  useEffect(() => {
    const isDisplay = sessionStorage.getItem("display-warning") === "true";
    if (isDisplay) {
      dispatch({
        type: "UPDATE_SESSION",
      });
    }
  }, []);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
