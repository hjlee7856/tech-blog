import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { NotionPage } from '@/lib/notion-page';

import { getNotionCategories } from '../server/get-notion-categories';
import { handleNotionPagesByCategory } from '../server/get-notion-pages-by-category';
import { getSearchedNotionPages } from '../server/get-notion-pages-by-search';

const ALL_CATEGORY = '전체';

interface UseNotionDataProps {
  initialPages: NotionPage[];
  initialTotal: number;
  initialCategories: { category: string; order: number; count: number }[];
  pageSize: number;
}

export function useNotionData({
  initialPages,
  initialTotal,
  initialCategories,
  pageSize,
}: UseNotionDataProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const categoryFromUrl = useMemo(
    () => (categoryParam ? decodeURIComponent(categoryParam) : ALL_CATEGORY),
    [categoryParam],
  );

  const [items, setItems] = useState<NotionPage[]>(initialPages || []);
  const [total, setTotal] = useState(initialTotal || 0);
  const [categories, setCategories] = useState(
    initialCategories.toSorted((a, b) => a.order - b.order),
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let result;

        if (searchTerm.trim() !== '') {
          result = await getSearchedNotionPages(searchTerm, currentPage, pageSize);
        } else if (activeCategory === ALL_CATEGORY) {
          const params = new URLSearchParams({
            page: currentPage.toString(),
            pageSize: pageSize.toString(),
          });
          const res = await fetch(`/api/get-notion-pages?${params.toString()}`);
          if (!res.ok) throw new Error('Failed to fetch pages');
          result = (await res.json()) as { data: NotionPage[]; total: number };
        } else {
          result = await handleNotionPagesByCategory(activeCategory, currentPage, pageSize);
        }

        setItems(result.data);
        setTotal(result.total);
      } catch (err) {
        console.error('Failed to fetch notion data', err);
        setItems([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    if (currentPage > 1 || activeCategory !== ALL_CATEGORY || searchTerm !== '') {
      void fetchData();
      return;
    }

    setItems(initialPages);
    setTotal(initialTotal);
  }, [activeCategory, currentPage, initialPages, initialTotal, pageSize, searchTerm]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (categories.length === 0) {
          const cats = await getNotionCategories();
          setCategories(cats.toSorted((a, b) => a.order - b.order));
        }
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    };

    if (categories.length === 0) {
      void fetchInitialData();
    }
  }, [categories.length]);

  const syncCategoryUrl = useCallback(
    (nextCategory: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextCategory === ALL_CATEGORY) {
        params.delete('category');
      } else {
        params.set('category', nextCategory);
      }

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSearchTerm('');
      setActiveCategory(category);
      setCurrentPage(1);
      syncCategoryUrl(category);
    },
    [syncCategoryUrl],
  );

  const handleSearch = useCallback(
    (newSearchTerm: string) => {
      setActiveCategory(ALL_CATEGORY);
      setSearchTerm(newSearchTerm);
      setCurrentPage(1);
      syncCategoryUrl(ALL_CATEGORY);
    },
    [syncCategoryUrl],
  );

  return {
    items,
    total,
    categories,
    loading,
    currentPage,
    totalPages: Math.ceil(total / pageSize),
    activeCategory,
    searchTerm,
    setCurrentPage,
    handleCategoryChange,
    handleSearch,
  };
}
