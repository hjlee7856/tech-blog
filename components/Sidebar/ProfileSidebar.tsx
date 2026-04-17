'use client';

import {
  Button,
  Card,
  Divider,
  Drawer,
  Grid,
  Space,
  Typography,
} from 'antd';
import { FaGithub } from 'react-icons/fa';

import { NotionCategoryFilter } from 'app/(blog)/components/Category/NotionCategoryFilter';

interface ProfileSidebarProps {
  profileImage?: string;
  name: string;
  email: string;
  bio: string;
  githubUrl?: string;
  categories?: { category: string; order: number; count: number }[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({
  name,
  email,
  bio,
  githubUrl,
  categories,
  activeCategory,
  onCategoryChange,
}: Omit<ProfileSidebarProps, 'isOpen' | 'onClose' | 'profileImage'>) {
  const totalPosts = categories?.reduce((sum, item) => sum + item.count, 0) ?? 0;

  return (
    <Card
      variant="borderless"
      style={{
        width: '100%',
        borderRadius: 24,
        background: 'rgba(255,252,247,0.82)',
        border: '1px solid rgba(125, 105, 74, 0.12)',
        boxShadow: 'none',
      }}
      styles={{ body: { padding: 22 } }}
    >
      <Space direction="vertical" size={18} style={{ width: '100%' }}>
        <div>
          <Typography.Text
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#8a7661',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Editor&apos;s Note
          </Typography.Text>
          <Typography.Title
            level={4}
            className="editorial-serif"
            style={{ margin: 0, color: '#1d2736' }}
          >
            {name}
          </Typography.Title>
        </div>

        <Typography.Paragraph
          style={{
            margin: 0,
            color: '#5c6573',
            lineHeight: 1.8,
            fontSize: 15,
          }}
        >
          {bio}
        </Typography.Paragraph>

        <Space direction="vertical" size={2}>
          <Typography.Text style={{ color: '#1d2736', fontWeight: 600 }}>
            {totalPosts}개의 글
          </Typography.Text>
          <Typography.Text style={{ color: '#5c6573' }}>
            {categories?.length ?? 0}개의 주제로 정리된 아카이브
          </Typography.Text>
          <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
        </Space>

        {githubUrl && (
          <Button
            href={githubUrl}
            icon={<FaGithub />}
            target="_blank"
            rel="noopener noreferrer"
            block
            style={{
              borderRadius: 999,
              height: 42,
              borderColor: 'rgba(125, 105, 74, 0.16)',
              color: '#344256',
            }}
          >
            GitHub 보기
          </Button>
        )}

        <Divider style={{ margin: 0, borderColor: 'rgba(125, 105, 74, 0.12)' }} />

        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <div>
            <Typography.Text
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#8a7661',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Topics
            </Typography.Text>
            <Typography.Title
              level={5}
              className="editorial-serif"
              style={{ margin: 0, color: '#1d2736' }}
            >
              주제별로 읽기
            </Typography.Title>
          </div>
          <NotionCategoryFilter
            activeCategory={activeCategory || ''}
            categories={categories || []}
            onCategoryChange={onCategoryChange || (() => {})}
          />
        </Space>
      </Space>
    </Card>
  );
}

export function ProfileSidebar({
  name,
  email,
  bio,
  githubUrl,
  categories = [],
  activeCategory = '',
  onCategoryChange,
  isOpen = false,
  onClose,
}: ProfileSidebarProps) {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;

  if (isMobile) {
    return (
      <Drawer
        title="아카이브 탐색"
        placement="left"
        onClose={onClose}
        open={isOpen}
        width={320}
        styles={{ body: { padding: 16, background: '#f7f3ec' } }}
      >
        <SidebarContent
          name={name}
          email={email}
          bio={bio}
          githubUrl={githubUrl}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </Drawer>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: 284 }}>
      <div style={{ position: 'sticky', top: 96 }}>
        <SidebarContent
          name={name}
          email={email}
          bio={bio}
          githubUrl={githubUrl}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
}
