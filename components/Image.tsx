'use client';
import { imageCdnUrl } from '@/constants';
import { FC, useEffect, useState } from 'react';

type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  onError?: () => any;
};

export const Image: FC<ImageProps> = (props) => {
  const {
    src,
    alt = '',
    className = '',
    height = 450,
    width = 300,
    onError,
  } = props;

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={`bg-stone-900 overflow-hidden ${className}`}>
      <img
        src={imageCdnUrl + imgSrc}
        alt={alt}
        className={`duration-300 object-cover h-full w-full ${
          isComplete ? 'opacity-100' : 'opacity-0'
        } `}
        width={width}
        height={height}
        onLoad={() => setIsComplete(true)}
        onError={onError}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};
