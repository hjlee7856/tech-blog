const SKELETON_COUNT = 1;
const SKELETON_GRADIENT =
  'linear-gradient(90deg, #e3e3e3 25%, #f5f5f5 50%, #e3e3e3 75%)';
const SKELETON_STYLE = {
  background: SKELETON_GRADIENT,
  backgroundSize: '200% 100%',
  animation: 'skeleton-loading 1.2s infinite linear',
};

function SkeletonPlaceholder({
  width,
  height,
  borderRadius = '8px',
}: {
  width: string | number;
  height: string | number;
  borderRadius?: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        color: 'transparent',
        ...SKELETON_STYLE,
      }}
    >
      &nbsp;
    </div>
  );
}

export function NotionGalleryCarouselSkeleton() {
  return (
    <>
      <section
        aria-busy="true"
        aria-label="Carousel loading"
        role="status"
        style={{
          position: 'relative',
          width: '100%',
          height: 'min(75vh, 450px)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 24,
            overflowX: 'auto',
            background: '#e0e0e0',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minWidth: 260,
            }}
            aria-hidden="true"
          >
            <div
              style={{
                width: '100%',
                height: '65%',
                ...SKELETON_STYLE,
              }}
            />
            <div
              style={{
                width: '100%',
                minHeight: 120,
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 18,
              }}
            >
              <SkeletonPlaceholder
                width="100px"
                height="26px"
                borderRadius="22px"
              />
              <SkeletonPlaceholder width="65%" height="36px" />
              <SkeletonPlaceholder width="85%" height="24px" />
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
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
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <div
              key={idx}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#e0e0e0',
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </section>
      <style>{`
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
