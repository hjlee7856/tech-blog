import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  loading?: boolean;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  onKeyDown,
  loading = false,
  placeholder = '검색',
}: SearchBarProps) {
  return (
    <Card
      variant="borderless"
      style={{
        width: '100%',
        marginBottom: 24,
        borderRadius: 20,
        background: 'rgba(255,252,247,0.78)',
        border: '1px solid rgba(125, 105, 74, 0.12)',
        boxShadow: 'none',
      }}
      styles={{ body: { padding: 14 } }}
    >
      <Input.Search
        allowClear
        id="blog-search"
        name="blog-search"
        aria-label="블로그 글 검색"
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        loading={loading}
        enterButton="검색"
        prefix={<SearchOutlined style={{ color: '#6b7280' }} />}
        size="large"
      />
    </Card>
  );
}
