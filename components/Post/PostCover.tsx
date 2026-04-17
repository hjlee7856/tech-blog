'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import { Typography } from 'antd';

interface PostCoverProps {
  src?: string | null;
  alt: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  aspectRatio?: string;
  borderRadius?: number;
  minHeight?: number;
  overlay?: string;
}

export function PostCover({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  fill = false,
  aspectRatio = '16 / 10',
  borderRadius = 0,
  minHeight,
  overlay,
}: PostCoverProps) {
  const [hasError, setHasError] = useState(false);
  const fallbackTitle = useMemo(() => alt.slice(0, 28), [alt]);
  const showImage = Boolean(src) && !hasError;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: fill ? undefined : aspectRatio,
        minHeight,
        height: fill ? '100%' : undefined,
        overflow: 'hidden',
        borderRadius,
        background:
          'linear-gradient(135deg, rgba(36, 51, 78, 0.95), rgba(88, 110, 146, 0.92))',
      }}
    >
      {showImage && (
        <Image
          src={src!}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes={sizes}
          onError={() => setHasError(true)}
          style={{ objectFit: 'cover' }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            overlay ??
            'linear-gradient(180deg, rgba(24, 31, 46, 0.08), rgba(24, 31, 46, 0.36))',
        }}
      />

      {!showImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            padding: 22,
          }}
        >
          <Typography.Text
            className="editorial-serif"
            style={{
              color: 'rgba(255,255,255,0.94)',
              fontSize: 24,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {fallbackTitle}
          </Typography.Text>
        </div>
      )}
    </div>
  );
}
