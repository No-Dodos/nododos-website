import type { APIRoute } from 'astro';
import { datocmsRequest } from '@lib/datocms';
import type { PageQuery, PageRecord, SiteLocale } from '@lib/types/datocms';
import { getPagePath } from '@lib/routing/page';
import query from './_page.query.graphql';

export const prerender = false;

const jsonResponse = (data: object, status: number = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const GET: APIRoute = async ({ request }) => {
  const locale = new URL(request.url).searchParams.get('locale') as SiteLocale;
  if (!locale) {
    return jsonResponse({ error: 'Missing \'locale\' parameter' }, 400);
  }

  const slug = new URL(request.url).searchParams.get('slug');
  if (!slug) {
    return jsonResponse({ error: 'Missing \'slug\' parameter' }, 400);
  }

  const { page } = (await datocmsRequest<PageQuery>({ query, variables: { slug, locale } })) as {
    page: PageRecord;
  };
  if (!page) {
    return jsonResponse({ error: 'Page not found' }, 404);
  }

  const pageHref = `/${locale}/${getPagePath({ page, locale })}/`;
  return new Response('',{
    status: 307,
    headers: { 'Location': pageHref },
  });
};
