import Image, { ImageProps } from 'next/image';
import { CSSProperties, useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete' | 'onError'> {
  fallbackSrc?: string;
  objectFit?: CSSProperties['objectFit'];
  natural?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQviwAAAABJRU5ErkJggg==",
  objectFit = 'cover',
  natural = false,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  if (natural) {
    return (
      <div className="relative w-full" style={{ position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={typeof imgSrc === 'string' ? imgSrc : ''}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true);
            setHasError(false);
          }}
          onError={() => {
            setHasError(true);
            setImgSrc(fallbackSrc);
            setTimeout(() => {
              if (typeof src === 'string' && src !== fallbackSrc) {
                setImgSrc(src);
              }
            }, 2000);
          }}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    );
  }

  const isFill = props.fill;
  const hasExplicitSize = !isFill && props.width != null;

  return (
    <div
      className={`relative ${hasExplicitSize ? 'w-fit' : 'w-full'}`}
      style={{ height: isFill ? '100%' : 'auto', position: 'relative' }}
    >
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyxtOpPeWOjNzWMeNvjuNeMx7MTYBhJRNNDK5pVkBxkYAE6EyHNmGCVzGCPZS8c4/PPHnLRxO/dLYUXVXaDRKJ+vIGqBNeCTXPVUEJRJR"
        className={`transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoadingComplete={() => {
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={() => {
          setHasError(true);
          setImgSrc(fallbackSrc);
          // Retry loading after a short delay
          setTimeout(() => {
            if (typeof src === 'string' && src !== fallbackSrc) {
              setImgSrc(src);
            }
          }, 2000);
        }}
        style={{ objectFit }}
        sizes={props.sizes || "(max-width: 768px) 100vw, 50vw"}
        priority
        quality={85}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {hasError && !isLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-xs">Loading image...</div>
          </div>
        </div>
      )}
    </div>
  );
}; 
