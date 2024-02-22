import type { InternalLinkBlockFragment, InternalLinkFragment, PageRecord, PersonRecord, SiteLocale } from '@lib/types/datocms';
import { getLocale } from '@lib/i18n';
import { getPagePath } from './page';

export const getHomeHref = ({ locale = getLocale() } = {}) => {
  return `/${locale}/`;
};

/**
 * Determine pathname based on locale and record type
 */
export const getHref = (
  { locale, record }: 
    { locale: SiteLocale, record: InternalLinkFragment['page'] | InternalLinkBlockFragment['page'] 
  }) => {
  const homeUrl = getHomeHref({ locale });
  if (!record) {
    return homeUrl;
  }
  if (record.__typename === 'HomePageRecord') {
    return homeUrl;
  }
  if (record.__typename === 'PageRecord') {
    return `/${locale}/${getPagePath({ page: record as PageRecord, locale })}/`;
  }
  if (record.__typename === 'PersonRecord') {
    return `/${locale}/meet/${(record as unknown as PersonRecord).slug}/`;
  }
  return homeUrl;
};
