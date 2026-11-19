'use client';

import { useState } from 'react';
import d from './ProductDetail.module.scss';

export default function ProductGallery({ images, alt, label, pictureOf }: { images: string[]; alt: string; label: string; pictureOf: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={d.gallery}>
      <div className={d.mainImg}>
        <img key={images[active]} src={images[active]} alt={alt} />
      </div>
      {images.length > 1 && (
        <div className={d.thumbs} role="group" aria-label={label}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={d.thumb}
              data-active={i === active}
              aria-label={pictureOf.replace('{i}', String(i + 1)).replace('{n}', String(images.length))}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
