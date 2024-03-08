import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LazyImage = ({ src, alt, style,className }) => {
  return <LazyLoadImage src={src} alt={alt} style={style} className={className}/>;
};

export default LazyImage;
  