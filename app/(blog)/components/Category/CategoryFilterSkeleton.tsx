const SKELETON_COUNT = 8;
const SKELETON_GRADIENT =
  'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
const SKELETON_STYLE = {
  background: SKELETON_GRADIENT,
  backgroundSize: '200% 100%',
  animation: 'skeleton-loading 1.5s infinite linear',
};

export function CategoryFilterSkeleton() {
  return (
    <>
      <div
        aria-busy="true"
        aria-label="Category filter loading"
        role="status"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          width: '100%',
        }}
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <button
            key={i}
            disabled
            style={{
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderRadius: 0,
              border: 'none',
              borderBottom: '1px solid #e5e7eb',
              padding: '12px 0',
              width: '100%',
              cursor: 'not-allowed',
              pointerEvents: 'none',
              ...SKELETON_STYLE,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
