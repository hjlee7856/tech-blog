import 'antd/dist/reset.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-coy.css';
import 'react-notion-x/src/styles.css';

import { Noto_Serif_KR } from 'next/font/google';
import { ConfigProvider } from 'antd';

import { QueryProvider } from '@/components/query-provider';
import '../styles/global.css';
import '../styles/notion.css';
import '../styles/prism-theme.css';

const editorialSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-editorial-serif',
  display: 'swap',
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" style={{ height: '100%' }} className={editorialSerif.variable}>
      <head />
      <body style={{ height: '100%' }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1f3f8f',
              colorInfo: '#1f3f8f',
              colorSuccess: '#2d6a4f',
              colorWarning: '#9a6700',
              colorBgBase: '#f7f3ec',
              colorTextBase: '#1f2937',
              colorBorderSecondary: '#ded7cb',
              borderRadius: 16,
              fontSize: 16,
              fontFamily:
                "'Pretendard', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              boxShadowSecondary: '0 18px 40px rgba(25, 34, 54, 0.06)',
            },
            components: {
              Layout: {
                headerBg: 'rgba(247, 243, 236, 0.88)',
                bodyBg: '#f7f3ec',
                siderBg: 'transparent',
                footerBg: 'transparent',
              },
              Card: {
                borderRadiusLG: 22,
              },
              Drawer: {
                colorBgElevated: '#f7f3ec',
              },
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
