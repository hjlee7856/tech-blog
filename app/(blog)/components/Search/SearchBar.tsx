import React from 'react';

import { Input } from 'antd';

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
  placeholder = '제목 / 소개글 검색',
}: SearchBarProps) {
  return (
    <div style={{ width: '100%', marginBottom: 16 }}>
      <Input.Search
        allowClear
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        loading={loading}
        enterButton="검색"
        size="large"
      />
    </div>
  );
}
