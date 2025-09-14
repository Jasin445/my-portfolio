import React, { useEffect } from "react";

interface AppImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
  onError?: () => void;
  fallbackSrc?: string;
}

const AppImage: React.FC<AppImageProps> = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  width,
  height,
  onError,
  fallbackSrc = "/public/assets/images/no_image.png"
}) => {
  const [imageSrc, setImageSrc] = React.useState<string>(src);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = (): void => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
      onError?.();
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};

export default AppImage;