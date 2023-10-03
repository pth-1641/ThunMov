'use client';
import { ModalContext } from '@/context/modal.context';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';

export const Modal = () => {
  const { state, dispatch } = useContext(ModalContext);
  const { searchValue, trailerUrl, type } = state;
  const inputRef = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    if (type === 'search') inputRef.current?.focus();
    document.body.style.overflow = type ? 'hidden' : 'initial';
  }, [type]);

  return (
    <div
      className={`fixed z-50 inset-0 bg-black/95 duration-200 flex items-center justify-center ${
        type !== null
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {type === 'search' && (
        <>
          <Icon
            icon="ic:round-close"
            height={36}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() =>
              dispatch({
                type: 'CLOSE',
              })
            }
          />
          <form
            className="w-[80vw] max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search?q=${searchValue}`);
              dispatch({
                type: 'CLOSE',
              });
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm phim, TV Shows,..."
              className="border-b-2 border-white/10 bg-transparent outline-none w-full px-0.5 py-1"
              value={searchValue}
              onChange={(e) =>
                dispatch({
                  type: 'SEARCH',
                  payload: { searchValue: e.target.value },
                })
              }
            />
          </form>
        </>
      )}
    </div>
  );
};
