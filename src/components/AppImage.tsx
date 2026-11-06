
import type { ImgHTMLAttributes, SyntheticEvent } from "react";

type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
};

function Image({
  src,
  alt = "",
  className = "",
  ...props
}: AppImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={(event: SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = "/assets/images/no_image.png";
      }}
      {...props}
    />
  );
}

export default Image;
