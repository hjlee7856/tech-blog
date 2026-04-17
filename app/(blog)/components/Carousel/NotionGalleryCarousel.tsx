import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { NotionPage } from '@/lib/notion-page';

import { NotionGalleryCarouselSkeleton } from './NotionGalleryCarouselSkeleton';

export function NotionGalleryCarousel({
  pages,
  skeleton = false,
}: {
  pages?: NotionPage[];
  skeleton?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const items = useMemo(() => (Array.isArray(pages) ? pages : []), [pages]);
  const filteredItems = useMemo(() => items.filter((item) => item.cover), [items]);

  if (skeleton || !pages || pages.length === 0) {
    return <NotionGalleryCarouselSkeleton />;
  }

  if (!filteredItems.length) {
    return (
      <div style={{ padding: 16, textAlign: 'center', color: '#666' }}>
        No featured posts available.
      </div>
    );
  }

  return (
    <section
      aria-label="Featured posts carousel"
      style={{
        position: 'relative',
        width: '100%',
        height: 'min(75vh, 450px)',
      }}
    >
      <Swiper
        autoplay={{ delay: 5000 }}
        modules={[Navigation, Keyboard, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        onSlideChange={(swiper) =>
          setCurrentIndex(swiper.realIndex % filteredItems.length)
        }
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        navigation={false}
        keyboard={{ enabled: true }}
        style={{ width: '100%', height: '100%' }}
        loop={true}
      >
        {filteredItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src={`${item.cover}`}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: '#222',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                fill
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
              <a
                href={`/post/${item.id}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 26px',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                }}
              >
                <div
                  style={{
                    width: 'min(70%, 900px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {item.category && (
                    <div
                      style={{
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        marginBottom: 10,
                        letterSpacing: '0.08em',
                        opacity: 0.85,
                        borderRadius: 22,
                        border: '1px solid white',
                        padding: '4px 14px',
                      }}
                    >
                      {item.category}
                    </div>
                  )}
                  <div
                    style={{
                      color: '#fff',
                      maxWidth: '90%',
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: 700,
                      marginBottom: 10,
                      wordBreak: 'keep-all',
                    }}
                  >
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div
                      style={{
                        color: '#fff',
                        width: '100%',
                        minHeight: 60,
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                        opacity: 0.92,
                      }}
                    >
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        style={arrowButtonStyle('left')}
        type="button"
      >
        <Image src="/carousel-left.png" alt="Previous slide" width={64} height={64} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        style={arrowButtonStyle('right')}
        type="button"
      >
        <Image src="/carousel-right.png" alt="Next slide" width={64} height={64} />
      </button>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 32,
          zIndex: 10,
          display: 'flex',
          gap: 8,
          transform: 'translateX(-50%)',
        }}
      >
        {filteredItems.map((_, idx) => (
          <div
            key={idx}
            aria-label={`Slide ${idx + 1}`}
            role="button"
            tabIndex={-1}
            onClick={() => {
              setCurrentIndex(idx);
              swiperRef.current?.slideToLoop(idx);
            }}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#fff',
              opacity: idx === currentIndex ? 1 : 0.35,
              cursor: idx === currentIndex ? 'default' : 'pointer',
            }}
          />
        ))}
      </div>
    </section>
  );
}

function arrowButtonStyle(side: 'left' | 'right') {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 20,
    width: 64,
    height: 64,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    cursor: 'pointer',
    transform: 'translateY(-50%)',
  } as const;
}
