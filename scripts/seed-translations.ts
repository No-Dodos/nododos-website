import { buildClient } from '@datocms/cma-client-node';
import dotenv from 'dotenv-safe';
import { addTranslation } from '../config/datocms/migrations/lib/add-translation';
import { datocmsEnvironment } from '../datocms-environment';

dotenv.config({
  allowEmptyValues: Boolean(process.env.CI),
});

const messagesI18n = {
  'en': {
    'breadcrumbs_title': 'Breadcrumbs',
    'download_video_title': 'download video: {{title}}',
    'search_error': 'Error performing search. Please try again.',
    'go_to_home_page': 'Go to {{ siteName }} home page',
    'breadcrumbs_home': 'Home',
    'image_unavailable': 'image unavailable',
    'search_label': 'Keyword(s)',
    'search_no_results_for_query': 'No search results for \'{{ query }}\'',
    'play_video_title': 'play video: {{title}}',
    'search': 'search',
    'search_on_site': 'Search on {{ siteName }}',
    'search_query_invalid': 'Search query \'{{ query }}\' is invalid. Query needs to be at least {{ minQueryLength }} characters.',
    'search_results_for_query': 'Search results for \'{{ query }}\'',
    'select_language': 'Select language',
    'share_on_social': 'Share on social media',
    'skip_to_content': 'Skip to content',
    'not_found': 'The page you requested could not be found.',
    'watch_video_on_provider': 'watch on {{provider}}'
  },
  'nl': {
    'breadcrumbs_title': 'Kruimelpad',
    'download_video_title': 'download video: {{title}}',
    'search_error': 'Er is een fout opgetreden tijdens het zoeken. Probeer het opnieuw.',
    'go_to_home_page': 'Ga naar {{ siteName }} homepagina',
    'breadcrumbs_home': 'Home',
    'image_unavailable': 'afbeelding niet beschikbaar',
    'search_label': 'Trefwoord(en)',
    'search_no_results_for_query': 'Geen zoekresultaten voor \'{{ query }}\'',
    'play_video_title': 'video afspelen: {{title}}',
    'search': 'zoeken',
    'search_on_site': 'Zoeken op {{ siteName }}',
    'search_query_invalid': 'Ongeldige zoekterm \'{{ query }}\'. Zoekterm moet minimaal {{ minQueryLength }} letters zijn.',
    'search_results_for_query': 'Zoekresultaten voor \'{{ query }}\'',
    'select_language': 'Taal selecteren',
    'share_on_social': 'Deel op social media',
    'skip_to_content': 'Ga naar de inhoud',
    'not_found': 'Deze pagina lijkt niet te bestaan.',
    'watch_video_on_provider': 'bekijk op {{provider}}'
  }
};

async function seedTranslations() {
  const client = buildClient({
    apiToken: process.env.DATOCMS_API_TOKEN!,
    environment: datocmsEnvironment,
  });
  const locales = Object.keys(messagesI18n);
  const defaultLocale = 'en';
  const messageKeys = Object.keys(messagesI18n[defaultLocale]);
  await messageKeys.map(async (key) => {
    /* @ts-expect-error next-line just a seed script */
    const value = Object.fromEntries(locales.map(locale => [locale, messagesI18n[locale][key]]));
    await addTranslation({ client, key, value });
  });
}

seedTranslations()
  .then(() => console.log('Translations seeded'));
