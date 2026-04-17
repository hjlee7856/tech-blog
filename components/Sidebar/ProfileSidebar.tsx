'use client';

import { Avatar, Button, Drawer, Grid, Layout, Space, Typography } from 'antd';
import { NotionCategoryFilter } from 'app/(blog)/components/Category/NotionCategoryFilter';
import { FaGithub, FaUser } from 'react-icons/fa';

const { Sider } = Layout;

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
  profileImage,
  name,
  email,
  bio,
  githubUrl,
  categories,
  activeCategory,
  onCategoryChange,
}: Omit<ProfileSidebarProps, 'isOpen'>) {
  return (
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          size={96}
          src={profileImage}
          icon={!profileImage ? <FaUser /> : undefined}
        />
      </div>
      <Typography.Title level={5} style={{ margin: 0, textAlign: 'center' }}>
        {name}
      </Typography.Title>
      <Typography.Link href={`mailto:${email}`} style={{ textAlign: 'center' }}>
        {email}
      </Typography.Link>
      <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
        {bio}
      </Typography.Text>

      {githubUrl && (
        <Button
          href={githubUrl}
          icon={<FaGithub />}
          target="_blank"
          rel="noopener noreferrer"
          block
        >
          GitHub
        </Button>
      )}

      {categories && categories.length > 0 && (
        <>
          <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 0 }}>
            카테고리
          </Typography.Title>
          <NotionCategoryFilter
            activeCategory={activeCategory || ''}
            categories={categories}
            onCategoryChange={onCategoryChange || (() => {})}
          />
        </>
      )}
    </Space>
  );
}

export function ProfileSidebar({
  profileImage,
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
        title="프로필"
        placement="left"
        onClose={onClose}
        open={isOpen}
        width={300}
        styles={{ body: { paddingTop: 8 } }}
      >
        <SidebarContent
          profileImage={profileImage}
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
    <Sider
      width={280}
      theme="light"
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        padding: 20,
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <SidebarContent
        profileImage={profileImage}
        name={name}
        email={email}
        bio={bio}
        githubUrl={githubUrl}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
    </Sider>
  );
}
