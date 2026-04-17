import * as React from 'react';

import { Layout, Typography } from 'antd';

function FooterImpl() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout.Footer
      style={{
        textAlign: 'center',
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
        padding: '20px 12px',
      }}
    >
      <Typography.Text type="secondary">
        © {currentYear} HJ All rights reserved.
      </Typography.Text>
    </Layout.Footer>
  );
}

export const Footer = React.memo(FooterImpl);
