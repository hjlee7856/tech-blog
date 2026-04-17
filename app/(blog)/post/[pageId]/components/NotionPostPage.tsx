import Image from 'next/legacy/image';
import Link from 'next/link';
import * as React from 'react';
import { type NotionComponents, NotionRenderer } from 'react-notion-x';
import { useSearchParam } from 'react-use';

import * as config from '@/lib/config';
import { mapImageUrl } from '@/lib/map-image-url';
import { mapPageUrl } from '@/lib/map-page-url';
import type * as types from '@/lib/types';

import { FloatingScrollTopButton } from '../../../../../components/Button/Floating/FloatingScrollTopButton';
import { Code, Collection, Equation, Modal } from '../../../../../components/dynamicImport';

const propertyTextValue = (
  { schema, pageHeader }: any,
  defaultFn: () => React.ReactNode,
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'author') {
    return <b>{defaultFn()}</b>;
  }

  return defaultFn();
};

interface NotionPostPageProps extends types.PageProps {
  isDarkMode: boolean;
}

export function NotionPostPage({
  site,
  recordMap,
  error,
}: NotionPostPageProps) {
  const lite = useSearchParam('lite');
  const components = React.useMemo<Partial<NotionComponents>>(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Header: false,
      Code,
      Collection,
      Equation,
      Modal,
      propertyTextValue,
    }),
    [],
  );

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {};
    if (lite) params.lite = lite;

    const searchParams = new URLSearchParams(params);
    return site ? mapPageUrl(site, recordMap!, searchParams) : undefined;
  }, [site, recordMap, lite]);

  if (error || !site || !recordMap) {
    return <div>error</div>;
  }

  return (
    <>
      <div
        className="notion light-mode"
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '24px 16px 56px',
        }}
      >
        <NotionRenderer
          bodyClassName="notion"
          darkMode={false}
          components={components}
          recordMap={recordMap}
          rootPageId={site.rootNotionPageId}
          rootDomain={site.domain}
          fullPage={false}
          previewImages={!!recordMap.preview_images}
          showCollectionViewDropdown={false}
          showTableOfContents={false}
          minTableOfContentsItems={3}
          defaultPageIcon={config.defaultPageIcon}
          defaultPageCover={config.defaultPageCover}
          defaultPageCoverPosition={config.defaultPageCoverPosition}
          mapPageUrl={siteMapPageUrl}
          mapImageUrl={mapImageUrl}
          disableHeader
        />
      </div>
      <FloatingScrollTopButton />
    </>
  );
}
