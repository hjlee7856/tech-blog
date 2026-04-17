import * as React from 'react';

import { Layout, Space, Typography } from 'antd';

function FooterImpl() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout.Footer
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '48px 24px 56px',
        background: 'transparent',
      }}
    >
      <div
        style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(125, 105, 74, 0.16)',
        }}
      >
        <Space
          direction="vertical"
          size={6}
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography.Text
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#8a7661',
              textTransform: 'uppercase',
            }}
          >
            HJ Tech Blog
          </Typography.Text>
          <Typography.Title
            level={5}
            className="editorial-serif"
            style={{ margin: 0, color: '#1d2736' }}
          >
            기록은 더 나은 판단을 위한 아카이브입니다.
          </Typography.Title>
          <Typography.Text type="secondary">
            © {currentYear} HJ. Engineering notes, experiments, and postmortems.
          </Typography.Text>
        </Space>
      </div>
    </Layout.Footer>
  );
}

export const Footer = React.memo(FooterImpl);
