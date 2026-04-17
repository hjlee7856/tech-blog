import { type MapImageUrlFn } from 'react-notion-x';
import { defaultMapImageUrl } from 'notion-utils';

import { defaultPageCover, defaultPageIcon } from './config';

export const mapImageUrl: MapImageUrlFn = (url, block) => {
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url;
  }

  return defaultMapImageUrl(url, block as Parameters<typeof defaultMapImageUrl>[1]);
};
