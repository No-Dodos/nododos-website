import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import graphql from '@rollup/plugin-graphql';
import sitemap from '@astrojs/sitemap';
import type { PluginOption } from 'vite';
import { isPreview } from './config/preview';

process.env.HEAD_START_PREVIEW = isPreview ? 'true' : 'false';

const productionUrl = 'https://www.nododos.nl';
const localhostPort = 3636; // 3636 is "dodo" in T9
export const siteUrl = process.env.CF_PAGES
  ? (process.env.CF_PAGES_BRANCH === 'main')
    ? productionUrl
    : process.env.CF_PAGES_URL
  : `http://localhost:${localhostPort}`;

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    mode: 'directory',
    functionPerRoute: true,
    runtime: {
      mode: 'local',
      type: 'pages',
    },
  }),
  devToolbar: {
    enabled: false,
  },
  image: {
    // cloudflare is not supported by the Astro image service
    // @see https://docs.astro.build/en/guides/images/#configure-no-op-passthrough-service
    service: passthroughImageService()
  },
  integrations: [sitemap()],
  output: isPreview ? 'server' : 'hybrid',
  server: { port: localhostPort },
  site: siteUrl,
  trailingSlash: 'always',
  vite: {
    plugins: [
      graphql() as PluginOption,
    ],
  },
});
