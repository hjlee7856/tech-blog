'use client';

import { useRef, useState } from 'react';

import { Grid } from 'antd';

import { FloatingScrollTopButton } from '@/components/Button/Floating/FloatingScrollTopButton';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { ProfileSidebar } from '@/components/Sidebar/ProfileSidebar';
import { useNotionData } from '@/hooks/useNotionData';
import type { NotionPage } from '@/lib/notion-page';
import { NotionCardList } from 'app/(blog)/components/CardList/NotionCardList';
import { NotionCardSkeleton } from 'app/(blog)/components/CardList/NotionCardSkeleton';
import { NotionGalleryCarousel } from 'app/(blog)/components/Carousel/NotionGalleryCarousel';
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
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pageSize = 10;

  const {
    items,
    categories,
    loading,
    currentPage,
    totalPages,
    activeCategory,
    searchTerm,
    setCurrentPage,
    handleCategoryChange,
    handleSearch,
  } = useNotionData({
    initialPages,
    initialTotal,
    initialCategories,
    pageSize,
  });

  const handleSearchInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      handleSearch(inputValue);
    }
  };

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue === '') {
      handleSearch('');
    }
  };

  const handleCategorySelect = (category: string) => {
    handleCategoryChange(category);
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        showToggle={true}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <ProfileSidebar
          name="HJ"
          email="jacker97@naver.com"
          bio="Frontend Developer"
          githubUrl="https://github.com/hjlee7856"
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategorySelect}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          style={{
            flex: 1,
            minWidth: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NotionGalleryCarousel
            pages={
              initialPages.length === 0 ? items.slice(0, 10) : initialPages.slice(0, 10)
            }
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingInline: isMobile ? 0 : 24,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 1200,
                padding: isMobile ? 0 : 24,
              }}
            >
              <SearchBar
                value={inputValue}
                onChange={handleSearchInputChange}
                onSearch={() => {
                  if (debounceTimerRef.current) {
                    clearTimeout(debounceTimerRef.current);
                  }
                  handleSearch(inputValue);
                }}
                onKeyDown={handleSearchInputKeyDown}
                loading={loading}
              />

              <section
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: 8,
                }}
              >
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
                          maxWidth: 700,
                          padding: '48px 0',
                          textAlign: 'center',
                          color: '#6b7280',
                          fontSize: 20,
                          fontWeight: 500,
                        }}
                      >
                        No search results found.
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
              </section>
            </div>
          </div>

          <FloatingScrollTopButton />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default NotionDomainPageClient;
