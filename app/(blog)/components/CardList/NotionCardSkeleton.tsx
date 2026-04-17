import { Card, Col, Row } from 'antd';

const SKELETON_COUNT = 10;
const SKELETON_GRADIENT =
  'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
const SKELETON_STYLE = {
  background: SKELETON_GRADIENT,
  backgroundSize: '200% 100%',
  animation: 'skeleton-loading 1.5s infinite linear',
};

function SkeletonPlaceholder({
  width,
  height,
  borderRadius = '4px',
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
        ...SKELETON_STYLE,
      }}
    />
  );
}

export function NotionCardSkeleton() {
  return (
    <>
      <Row
        gutter={[16, 16]}
        aria-busy="true"
        aria-label="Card list loading"
        role="status"
        style={{ width: '100%' }}
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <Col key={i} xs={24} sm={12} lg={8}>
            <Card style={{ pointerEvents: 'none' }} aria-hidden="true">
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  marginBottom: 16,
                  ...SKELETON_STYLE,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SkeletonPlaceholder
                    width="80px"
                    height="24px"
                    borderRadius="16px"
                  />
                  <SkeletonPlaceholder width="70px" height="20px" />
                </div>
                <SkeletonPlaceholder width="80%" height="24px" />
                <SkeletonPlaceholder width="95%" height="18px" />
                <SkeletonPlaceholder width="60%" height="18px" />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <style>{`
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
