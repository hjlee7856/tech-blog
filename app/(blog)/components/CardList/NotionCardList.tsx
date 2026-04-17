import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Card, Col, Row, Space, Tag, Typography } from 'antd';

import type { NotionPage } from '@/lib/notion-page';

interface NotionCardListProps {
  pages: NotionPage[];
  searchTerm: string;
}

function highlight(
  text: string | null | undefined = '',
  keyword: string | null | undefined = '',
) {
  const safeText = text ?? '';
  const safeKeyword = keyword ?? '';

  if (safeKeyword.trim() === '') return safeText;
  // eslint-disable-next-line security/detect-non-literal-regexp
  const regex = new RegExp(
    `(${safeKeyword.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = safeText.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        style={{ background: '#ffe066', color: 'inherit', padding: 0 }}
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

export function NotionCardList({ pages, searchTerm }: NotionCardListProps) {
  return (
    <Row gutter={[16, 16]}>
      {pages.map((page) => (
        <Col key={page.id} xs={24} sm={12} lg={8}>
          <Link
            href={`/post/${page.id}`}
            style={{ display: 'block', height: '100%' }}
          >
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                page.cover ? (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                    }}
                  >
                    <Image
                      src={`${page.cover}`}
                      alt={page.title}
                      loading="lazy"
                      fill
                      sizes="(max-width: 600px) 100vw, 300px"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16/10',
                      background: '#f5f5f5',
                    }}
                  />
                )
              }
            >
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                {page.category && page.created_date && (
                  <Space size={6} wrap>
                    <Tag>{page.category}</Tag>
                    <Typography.Text type="secondary">
                      {page.created_date}
                    </Typography.Text>
                  </Space>
                )}

                <Typography.Title
                  level={5}
                  style={{ margin: 0 }}
                  ellipsis={{ rows: 2 }}
                >
                  {highlight(page.title, searchTerm)}
                </Typography.Title>

                {page.description && (
                  <Typography.Paragraph
                    type="secondary"
                    style={{ marginBottom: 0 }}
                    ellipsis={{ rows: 3 }}
                  >
                    {highlight(page.description, searchTerm)}
                  </Typography.Paragraph>
                )}
              </Space>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
