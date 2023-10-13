'use client';
import { FC, useState } from 'react';

type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  onError?: () => any;
};

export const Image: FC<ImageProps> = (props) => {
  const { src, alt = '', className = '', height, width, onError } = props;

  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <div className="bg-stone-900 rounded overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`duration-300 ${
          isComplete ? 'opacity-100' : 'opacity-0'
        } ${className}`}
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
