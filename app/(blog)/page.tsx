import { type Metadata } from 'next';
import { Suspense } from 'react';

import { getNotionCategories } from '../../server/get-notion-categories';
import { getNotionPages } from '../../server/get-notion-pages';
import { NotionDomainPageClient } from './page-client';

export const metadata: Metadata = {
  title: 'HJ 기술 블로그',
  description: '프론트엔드 엔지니어 HJ의 실전 기록과 기술 메모',
  openGraph: {
    title: 'HJ 기술 블로그',
    description: '프론트엔드 엔지니어 HJ의 실전 기록과 기술 메모',
    type: 'website',
    url: 'https://hj1997-tech-blog.vercel.app',
    images: [
      {
        url: 'https://hj1997-tech-blog.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HJ 기술 블로그',
    description: '프론트엔드 엔지니어 HJ의 실전 기록과 기술 메모',
    images: [
      {
        url: 'https://hj1997-tech-blog.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function NotionDomainPage() {
  const { data, total } = await getNotionPages(false, 1, 10);
  const categoriesData = await getNotionCategories();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotionDomainPageClient
        pages={data}
        total={total}
        categories={categoriesData}
      />
    </Suspense>
  );
}
