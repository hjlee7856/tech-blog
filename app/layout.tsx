import 'antd/dist/reset.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-coy.css';
import 'react-notion-x/src/styles.css';

import { ConfigProvider } from 'antd';

import { QueryProvider } from '@/components/query-provider';
import '../styles/global.css';
import '../styles/notion.css';
import '../styles/prism-theme.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" style={{ height: '100%' }}>
      <head />
      <body style={{ height: '100%' }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#303030',
              borderRadius: 8,
            },
          }}
        >
          <QueryProvider>{children}</QueryProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}

export default RootLayout;
