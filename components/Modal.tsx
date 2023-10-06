'use client';
import { ModalContext } from '@/context/modal.context';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';

export const Modal = () => {
  const { state, dispatch } = useContext(ModalContext);
  const { searchValue, videoTrailerId, modalType } = state;
  const inputRef = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    if (modalType === 'search') inputRef.current?.focus();
    document.body.style.overflow = modalType ? 'hidden' : 'initial';
  }, [modalType]);

  return (
    <div
      className={`fixed z-50 inset-0 bg-black/95 duration-200 flex items-center justify-center ${
        modalType !== null
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {modalType !== 'warning' && (
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
      )}
      {modalType === 'search' && (
        <form
          className="w-[80vw] max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?q=${searchValue.replace(/\s+/g, '+')}`);
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
      )}
      {modalType === 'trailer' && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoTrailerId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="aspect-video w-[80vw] max-w-4xl"
          allowFullScreen
        />
      )}
      {modalType === 'warning' && (
        <div className="max-w-xl bg-white text-black p-5 rounded-lg">
          <h2 className="text-center">
            Nội dung có thể không phù hợp với lứa tuổi của bạn. Nếu bỏ qua cảnh
            báo này, chúng tôi sẽ <strong>không chịu trách nhiệm</strong> với
            bất kỳ hành động nào.
          </h2>
          <div className="flex items gap-3 justify-center text-sm mt-6">
            <button
              onClick={() => {
                router.back();
                dispatch({ type: 'CLOSE' });
              }}
              className="px-5 rounded-full border-primary py-2 border-2"
            >
              Quay lại
            </button>
            <button
              onClick={() => {
                dispatch({ type: 'CLOSE', payload: { hasShown: true } });
                sessionStorage.setItem('display-warning', 'true');
              }}
              className="px-5 rounded-full bg-primary py-2.5"
            >
              Đồng ý
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
