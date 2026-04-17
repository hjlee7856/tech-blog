'use client';

import Link from 'next/link';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Grid, Row, Space, Typography } from 'antd';

import { PostCover } from '@/components/Post/PostCover';
import type { NotionPage } from '@/lib/notion-page';

interface NotionGalleryCarouselProps {
  pages: NotionPage[];
}

export function NotionGalleryCarousel({ pages }: NotionGalleryCarouselProps) {
  const screens = Grid.useBreakpoint();
  const featured = pages.slice(0, 3);
  const primary = featured[0];
  const secondary = featured.slice(1);

  if (!primary) {
    return null;
  }

  return (
    <section
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: screens.lg ? '32px 24px 0' : '20px 16px 0',
        width: '100%',
      }}
    >
      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} lg={16}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 28,
              background: 'rgba(255,252,247,0.76)',
              border: '1px solid rgba(125, 105, 74, 0.14)',
              boxShadow: 'none',
            }}
            styles={{ body: { padding: screens.lg ? 28 : 18 } }}
          >
            <Row gutter={[20, 20]} align="middle">
              <Col xs={24} md={11}>
                <Link href={`/post/${primary.id}`} style={{ display: 'block' }}>
                  <PostCover
                    src={primary.cover}
                    alt={primary.title}
                    priority
                    minHeight={screens.lg ? 360 : 260}
                    borderRadius={22}
                    overlay="linear-gradient(180deg, rgba(24, 31, 46, 0.06), rgba(24, 31, 46, 0.18))"
                    sizes="(max-width: 992px) 100vw, 40vw"
                  />
                </Link>
              </Col>

              <Col xs={24} md={13}>
                <Space direction="vertical" size={18} style={{ width: '100%' }}>
                  <Space size={12} wrap>
                    <Typography.Text
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        color: '#8a7661',
                        textTransform: 'uppercase',
                      }}
                    >
                      Editor&apos;s Pick
                    </Typography.Text>
                    {primary.category && (
                      <Typography.Text style={{ color: '#5b6472' }}>
                        {primary.category}
                      </Typography.Text>
                    )}
                  </Space>

                  <div>
                    <Typography.Title
                      level={1}
                      className="editorial-serif"
                      style={{
                        color: '#1d2736',
                        margin: 0,
                        fontSize: screens.lg ? 44 : 34,
                        lineHeight: 1.18,
                      }}
                    >
                      {primary.title}
                    </Typography.Title>
                    <Typography.Paragraph
                      style={{
                        color: '#5d6675',
                        fontSize: 17,
                        lineHeight: 1.8,
                        margin: '18px 0 0',
                      }}
                    >
                      {primary.description ||
                        primary.subtitle ||
                        '이번 주에 먼저 읽어둘 만한 글입니다.'}
                    </Typography.Paragraph>
                  </div>

                  <Typography.Text style={{ color: '#7a828f' }}>
                    최신 글 흐름에서 중심이 되는 한 편을 골라 전면에
                    배치했습니다.
                  </Typography.Text>

                  <Link href={`/post/${primary.id}`}>
                    <Button
                      type="text"
                      icon={<ArrowRightOutlined />}
                      iconPosition="end"
                      style={{
                        paddingInline: 0,
                        color: '#1f3f8f',
                        fontWeight: 700,
                      }}
                    >
                      본문 읽기
                    </Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Space direction="vertical" size={18} style={{ width: '100%' }}>
            {secondary.map((page, index) => (
              <Link
                key={page.id}
                href={`/post/${page.id}`}
                style={{ display: 'block' }}
              >
                <Card
                  hoverable
                  variant="borderless"
                  style={{
                    borderRadius: 24,
                    background: 'rgba(255,252,247,0.72)',
                    border: '1px solid rgba(125, 105, 74, 0.12)',
                    boxShadow: 'none',
                  }}
                  styles={{ body: { padding: 22 } }}
                >
                  <Space
                    direction="vertical"
                    size={10}
                    style={{ width: '100%' }}
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
                      0{index + 2}
                    </Typography.Text>
                    <Typography.Title
                      level={4}
                      className="editorial-serif"
                      style={{ margin: 0, color: '#1d2736', lineHeight: 1.3 }}
                      ellipsis={{ rows: 2 }}
                    >
                      {page.title}
                    </Typography.Title>
                    <Typography.Paragraph
                      style={{ margin: 0, color: '#667085', lineHeight: 1.7 }}
                      ellipsis={{ rows: 2 }}
                    >
                      {page.description || page.subtitle}
                    </Typography.Paragraph>
                    <Typography.Text
                      style={{ color: '#1f3f8f', fontWeight: 700 }}
                    >
                      이어서 읽기
                    </Typography.Text>
                  </Space>
                </Card>
              </Link>
            ))}
          </Space>
        </Col>
      </Row>
    </section>
  );
}
