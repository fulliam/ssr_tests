import 'uno.css';
import { renderToString } from 'vue/server-renderer';
import { renderSSRHead } from '@unhead/ssr';
import { createApp } from './main';

function renderPreloadLinks(modules, manifest) {
  let links = '';
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return '';
  }
}

function renderTeleports(teleports) {
  if (!teleports) return '';
  return Object.entries(teleports).reduce((all, [key, value]) => {
    if (key.startsWith('#el-popper-container-')) {
      return `${all}<div id="${key.slice(1)}">${value}</div>`;
    }
    return all;
  }, teleports.body || '');
}

function renderMeta(meta) {
  if (!meta) return '';
  return Object.entries(meta)
    .map(([key, value]) => {
      if (key === 'content') {
        // Parse the content string back into an object
        value = JSON.parse(value.replace(/"/g, '"'));
        // Then, convert the object back into a series of meta tags
        return Object.entries(value)
          .map(([name, value]) => `<meta name="${name}" content="${value}">`)
          .join('\n');
      } else {
        if (key === 'headTags' || key === 'bodyTags' || key === 'htmlAttrs' || key === 'bodyAttrs' || key === 'bodyTagsOpen') {
          return `${value}`;
        }
        return `<meta ${key}="${value}">`;
      }
    })
    .join('\n');
}

export async function render(url, manifest) {
  const { app, head, router, store } = createApp();
  try {
    await router.push(url);
    await router.isReady();
    await head.resolveTags();

    const ctx = {};
    const html = await renderToString(app, ctx);
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
    const teleports = renderTeleports(ctx.teleports);
    const state = JSON.stringify(store.state.value);
    const payload = await renderSSRHead(head);
    const metaTags = renderMeta(payload);
    return [html, state, preloadLinks, teleports, metaTags];
  } catch (error) {
    console.log(error);
  }
}
