'use client';

import Link from 'next/link';

import { GithubOutlined } from '@ant-design/icons';
import { Button, Layout, Space, Typography } from 'antd';

interface HeaderProps {
  links?: HeaderLinkItem[];
}

export function Header({ links = headerLinkItems }: HeaderProps) {
  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 'auto',
        lineHeight: 'normal',
        padding: '0 16px',
        background: 'rgba(247, 243, 236, 0.94)',
        borderBottom: '1px solid rgba(125, 105, 74, 0.12)',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          minHeight: 64,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <Link href="/" style={{ display: 'block' }}>
          <Typography.Title
            level={4}
            className="editorial-serif"
            style={{ margin: 0, color: '#1d2736' }}
          >
            HJ&apos;s Tech Blog
          </Typography.Title>
        </Link>

        <Space size={6} wrap>
          {links.map((linkItem) =>
            linkItem.isExternal ? (
              <Button
                key={`${linkItem.href}:${linkItem.label}`}
                href={linkItem.href}
                target="_blank"
                rel="noopener noreferrer"
                type="text"
                icon={linkItem.icon}
                style={{ color: '#41506a', fontWeight: 600 }}
              >
                {linkItem.label}
              </Button>
            ) : (
              <Link
                key={`${linkItem.href}:${linkItem.label}`}
                href={linkItem.href}
                style={{
                  padding: '8px 10px',
                  color: '#41506a',
                  fontWeight: 600,
                }}
              >
                {linkItem.label}
              </Link>
            ),
          )}
        </Space>
      </div>
    </Layout.Header>
  );
}

interface HeaderLinkItem {
  href: string;
  label: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
}

const headerLinkItems: HeaderLinkItem[] = [
  { href: '/', label: '목록' },
  {
    href: 'https://github.com/hjlee7856',
    label: 'GitHub',
    isExternal: true,
    icon: <GithubOutlined />,
  },
];
