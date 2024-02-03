import type { InternalLinkBlockFragment, InternalLinkFragment, PageRecord, PersonRecord, SiteLocale } from '@lib/types/datocms';
/**
 * Determine pathname based on locale and page record type
 */
export const getHref = (
  { locale, page }: 
    { locale: SiteLocale, page: InternalLinkFragment['page'] | InternalLinkBlockFragment['page'] 
  }) => {
  const homeUrl = `/${locale}/`;
  if (!page) {
    return homeUrl;
  }
  if (page.__typename === 'HomePageRecord') {
    return homeUrl;
  }
  if (page.__typename === 'PageRecord') {
    return `/${locale}/${getPagePath({ page: page as PageRecord, locale })}/`;
  }
  if (page.__typename === 'PersonRecord') {
    return `/${locale}/meet/${(page as PersonRecord).slug}/`;
  }
  return homeUrl;
};

type AnyPage = PageRecord;
type MaybeSlug = string | undefined;

const missingSlug = '-';

export const getParentPages = (page: AnyPage): AnyPage[] => {
  if (page.parentPage) {
    return [
      ...getParentPages(page.parentPage),
      page.parentPage
    ];
  }
  return [];
};

/**
 * Returns a list of slugs for the parent pages of a page.
 * A (parent) page may not be available in all locales, so the list may contain undefined values.
 * 
 * Example return values:
 * - []                               (no parent pages)
 * - ['parent-slug']                  (parent page available in given locale)
 * - [undefined]                      (parent page not available in given locale)
 * - ['grand-parent', 'parent-slug']  (grand parent and parent page available in given locale)
 * - ['grand-parent', undefined]      (grand parent page available, parent page not available in given locale)
 */
export const getParentSlugs = ({ page, locale }: { page: AnyPage, locale: SiteLocale }): MaybeSlug[] => {
  if (page.parentPage) {
    const slug = page.parentPage._allSlugLocales?.find(slug => slug.locale === locale)?.value;
    return [
      ...getParentSlugs({ page: page.parentPage, locale }), 
      slug
    ];
  }
  return [];
};

/**
 * Returns the URL path for a page based on its slug and the slugs of its parent pages.
 * A (parent) page may not be available in all locales, 
 * in which case its slug is replaced with a dash.
 * 
 * Example return values:
 * - page-slug
 * - parent-slug/page-slug
 * - grand-parent/parent-slug/page-slug
 * - grand-parent/-/page-slug             (missing parent in given locale)
 * - -/-/page-slug                        (missing parent and grand parent in given locale)
 * - -                                    (missing page in given locale)
 */
export const getPagePath = ({ page, locale }: { page: AnyPage, locale: SiteLocale }) => {
  const slug = page._allSlugLocales?.find(slug => slug.locale === locale)?.value || missingSlug;
  const parentSlugs = getParentSlugs({ page, locale }).map(slug => slug || missingSlug);
  return [...parentSlugs, slug].join('/');
};

/**
 * Returns the page slug from a URL path.
 * 
 * Returns page-1 in the following examples:
 * - /page-1
 * - /page-1/
 * - /page-1/?foo=bar
 * - /grand-parent/parent-slug/page-1
 */
export const getPageSlugFromPath = (path: URL['pathname']) => {
  const url = new URL(path, 'https://www.example.com');
  const slug = url.pathname.split('/').filter(Boolean).pop() as string;
  return slug;
};
