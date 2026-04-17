'use client';

import Link from 'next/link';

import { Button, Layout, Space, Typography } from 'antd';

interface HeaderProps {
  onToggleSidebar?: () => void;
  showToggle?: boolean;
  links?: HeaderLinkItem[];
}

export function Header({
  onToggleSidebar,
  showToggle = false,
  links = headerLinkItems,
}: HeaderProps) {
  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 120,
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 16px',
        height: 'auto',
        lineHeight: 'normal',
      }}
    >
      <div
        style={{
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ width: 52 }}>
          {showToggle && (
            <Button
              type="text"
              onClick={onToggleSidebar}
              aria-label="사이드바 열기"
            >
              ☰
            </Button>
          )}
        </div>

        <Typography.Title level={4} style={{ margin: 0, whiteSpace: 'nowrap' }}>
          HJ&apos;s Blog
        </Typography.Title>

        <Space size={8} wrap style={{ justifyContent: 'flex-end' }}>
          {links.map((linkItem) => {
            if (linkItem.isExternal) {
              return (
                <Button
                  key={`${linkItem.href}:${linkItem.label}`}
                  type="link"
                  href={linkItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ paddingInline: 6 }}
                >
                  {linkItem.label}
                </Button>
              );
            }

            return (
              <Link
                key={`${linkItem.href}:${linkItem.label}`}
                href={linkItem.href}
                style={{ paddingInline: 6, color: '#1677ff' }}
              >
                {linkItem.label}
              </Link>
            );
          })}
        </Space>
      </div>
    </Layout.Header>
  );
}

interface HeaderLinkItem {
  href: string;
  label: string;
  isExternal?: boolean;
}

const headerLinkItems: HeaderLinkItem[] = [
  { href: '/', label: '홈' },
  { href: 'https://github.com/hjlee7856', label: 'GitHub', isExternal: true },
];
