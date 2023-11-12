'use client';
import { domain, socialsShare } from '@/constants';
import { ModalContext } from '@/context/modal.context';
import { Icon } from '@iconify/react';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';

export const Modal = () => {
  const { state, dispatch } = useContext(ModalContext);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const { searchValue, videoTrailerId, modalType } = state;
  const inputRef = useRef<any>();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (modalType === 'search') inputRef.current?.focus();
    document.body.style.overflow = modalType ? 'hidden' : 'initial';
  }, [modalType]);

  useEffect(() => {
    if (!isCopy) return;
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  }, [isCopy]);

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchValue.replace(/\s+/g, '+')}`);
    dispatch({
      type: 'CLOSE',
    });
  };

  return (
    <div
      className={`fixed z-50 inset-0 bg-black/95 duration-200 flex items-center justify-center ${
        modalType !== null
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget && state.modalType !== 'warning') {
          dispatch({ type: 'CLOSE' });
        }
      }}
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
        <form className="w-[80vw] max-w-md" onSubmit={handleSearch}>
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
          className="aspect-video w-full max-w-4xl"
          allowFullScreen
        />
      )}
      {modalType === 'share' && (
        <div className="bg-zinc-900 rounded-lg p-6 w-[90vw] max-w-max">
          <h3 className="text-center text-2xl font-bold sm:text-3xl">
            Chia sẻ
          </h3>
          <ul className="flex items-center gap-3 my-6 overflow-auto pb-2">
            {socialsShare.map((social) => (
              <button
                key={social.platform}
                onClick={() =>
                  window.open(
                    social.baseHref + encodeURIComponent(domain + pathname)
                  )
                }
                rel="noopener noreferrer"
              >
                <Icon
                  icon={social.icon}
                  height={56}
                  color={social.platform === 'KakaoTalk' ? '#000' : '#fff'}
                  style={{ backgroundColor: social.color }}
                  className="p-3 rounded-full"
                />
              </button>
            ))}
          </ul>
          <div className="bg-black p-4 rounded-lg border border-white/20 flex items-center gap-1">
            <input
              type="text"
              value={domain + pathname}
              className="bg-transparent outline-none w-full"
              readOnly={true}
            />
            <button
              className={`rounded-full min-w-max px-2.5 py-1.5 text-black text-sm font-bold flex items-center gap-1.5 ${
                isCopy ? 'bg-green-500' : 'bg-primary'
              }`}
              onClick={() => {
                navigator.clipboard.writeText(domain + pathname);
                setIsCopy(true);
              }}
            >
              {isCopy && <Icon icon="ep:success-filled" height={18} />}
              {isCopy ? 'Đã sao chép' : 'Sao chép'}
            </button>
          </div>
        </div>
      )}
      {modalType === 'warning' && (
        <div className="max-w-xl w-[90vw] bg-white text-black p-5 rounded-lg">
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
