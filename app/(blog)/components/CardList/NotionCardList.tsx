'use client';

import Link from 'next/link';
import React from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Col, Row, Space, Typography } from 'antd';

import { PostCover } from '@/components/Post/PostCover';
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
  const lowerText = safeText.toLowerCase();
  const lowerKeyword = safeKeyword.toLowerCase();
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let matchIndex = lowerText.indexOf(lowerKeyword, cursor);

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      nodes.push(
        <React.Fragment key={`text-${cursor}`}>
          {safeText.slice(cursor, matchIndex)}
        </React.Fragment>,
      );
    }

    nodes.push(
      <mark
        key={`mark-${matchIndex}`}
        style={{
          background: 'rgba(31, 63, 143, 0.12)',
          color: 'inherit',
          padding: '0 2px',
          borderRadius: 4,
        }}
      >
        {safeText.slice(matchIndex, matchIndex + safeKeyword.length)}
      </mark>,
    );

    cursor = matchIndex + safeKeyword.length;
    matchIndex = lowerText.indexOf(lowerKeyword, cursor);
  }

  if (cursor < safeText.length) {
    nodes.push(
      <React.Fragment key={`text-${cursor}`}>
        {safeText.slice(cursor)}
      </React.Fragment>,
    );
  }

  return nodes;
}

export function NotionCardList({ pages, searchTerm }: NotionCardListProps) {
  return (
    <Row gutter={[20, 20]} style={{ width: '100%' }}>
      {pages.map((page) => (
        <Col key={page.id} xs={24} md={12}>
          <Link
            href={`/post/${page.id}`}
            style={{ display: 'block', height: '100%' }}
          >
            <Card
              hoverable
              variant="borderless"
              style={{
                height: '100%',
                borderRadius: 20,
                background: 'rgba(255,252,247,0.72)',
                border: '1px solid rgba(125, 105, 74, 0.12)',
                boxShadow: 'none',
              }}
              styles={{ body: { padding: 0 } }}
            >
              <div style={{ padding: 12 }}>
                <PostCover
                  src={page.cover}
                  alt={page.title}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  borderRadius={14}

                />
              </div>
              <div style={{ padding: '4px 18px 18px' }}>
                <Space direction="vertical" size={10} style={{ width: '100%' }}>
                  <Space size={10} wrap>
                    {page.category && (
                      <Typography.Text
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          color: '#8a7661',
                          textTransform: 'uppercase',
                        }}
                      >
                        {page.category}
                      </Typography.Text>
                    )}
                    {page.created_date && (
                      <Typography.Text style={{ color: '#8b93a1' }}>
                        {page.created_date}
                      </Typography.Text>
                    )}
                  </Space>

                  <Typography.Title
                    level={4}
                    className="editorial-serif"
                    style={{
                      margin: 0,
                      fontSize: 30,
                      lineHeight: 1.24,
                      color: '#1d2736',
                    }}
                    ellipsis={{ rows: 2 }}
                  >
                    {highlight(page.title, searchTerm)}
                  </Typography.Title>

                  <Typography.Paragraph
                    style={{
                      marginBottom: 0,
                      color: '#5f6775',
                      fontSize: 15,
                      lineHeight: 1.8,
                      minHeight: 56,
                    }}
                    ellipsis={{ rows: 2 }}
                  >
                    {highlight(page.description || page.subtitle, searchTerm)}
                  </Typography.Paragraph>

                  <Space
                    align="center"
                    style={{
                      color: '#1f3f8f',
                      fontWeight: 700,
                      marginTop: 'auto',
                    }}
                  >
                    <span>읽기</span>
                    <ArrowRightOutlined />
                  </Space>
                </Space>
              </div>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
