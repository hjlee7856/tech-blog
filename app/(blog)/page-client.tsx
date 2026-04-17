'use client';

import { useState } from 'react';

import { Layout, Space, Typography } from 'antd';

import { FloatingScrollTopButton } from '@/components/Button/Floating/FloatingScrollTopButton';
import { Header } from '@/components/Header/Header';
import { useNotionData } from '@/hooks/useNotionData';
import type { NotionPage } from '@/lib/notion-page';
import { NotionCardList } from 'app/(blog)/components/CardList/NotionCardList';
import { NotionCardSkeleton } from 'app/(blog)/components/CardList/NotionCardSkeleton';
import { Pagination } from 'app/(blog)/components/Pagenation/Pagination';
import { PaginationSkeleton } from 'app/(blog)/components/Pagenation/PaginationSkeleton';
import { SearchBar } from 'app/(blog)/components/Search/SearchBar';

interface NotionDomainPageClientProps {
  pages: NotionPage[];
  total: number;
  categories: { category: string; order: number; count: number }[];
}

export function NotionDomainPageClient({
  pages: initialPages,
  total: initialTotal,
  categories: initialCategories,
}: NotionDomainPageClientProps) {
  const [inputValue, setInputValue] = useState('');
  const pageSize = 10;

  const {
    items,
    loading,
    currentPage,
    totalPages,
    searchTerm,
    setCurrentPage,
    handleSearch,
  } = useNotionData({
    initialPages,
    initialTotal,
    initialCategories,
    pageSize,
  });

  return (
    <Layout>
      <Header />

      <main
        style={{
          maxWidth: 960,
          width: '100%',
          margin: '0 auto',
          padding: '24px 16px 56px',
        }}
      >
        <SearchBar
          value={inputValue}
          onChange={(e) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            if (newValue === '') {
              handleSearch('');
            }
          }}
          onSearch={() => handleSearch(inputValue.trim())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(inputValue.trim());
            }
          }}
          loading={loading}
        />

        <Space direction="vertical" size={22} style={{ width: '100%' }}>
          {(() => {
            if (initialPages.length === 0 && loading) {
              return (
                <>
                  <NotionCardSkeleton />
                  <PaginationSkeleton />
                </>
              );
            }

            if (searchTerm.length > 0 && items.length === 0) {
              return (
                <div
                  style={{
                    width: '100%',
                    padding: '56px 24px',
                    borderRadius: 20,
                    border: '1px solid rgba(125, 105, 74, 0.12)',
                    background: 'rgba(255,252,247,0.74)',
                    textAlign: 'center',
                  }}
                >
                  <Typography.Text style={{ color: '#66758f' }}>
                    검색 결과가 없습니다.
                  </Typography.Text>
                </div>
              );
            }

            return (
              <>
                <NotionCardList pages={items} searchTerm={searchTerm} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            );
          })()}
        </Space>
      </main>

      <FloatingScrollTopButton />
    </Layout>
  );
}

export default NotionDomainPageClient;
