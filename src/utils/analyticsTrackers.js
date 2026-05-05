import { analytics } from './analyticsService';

// ─── Navigation ───────────────────────────────────────────────────────────────
export const navigation = {
  pageView: (pathname) =>
    analytics.trackStructured({ category: 'navigation', action: 'page_view', label: pathname }),
};

// ─── Portfolio ────────────────────────────────────────────────────────────────
export const portfolio = {
  cardClick: (slug, title, projectCategory) =>
    analytics.trackStructured({
      category: 'portfolio',
      action: 'card_click',
      label: slug,
      params: { title, projectCategory },
    }),

  projectView: (slug, title) =>
    analytics.trackStructured({
      category: 'portfolio',
      action: 'project_view',
      label: slug,
      params: { title },
    }),

  galleryOpen: (slug) =>
    analytics.trackStructured({ category: 'portfolio', action: 'gallery_open', label: slug }),

  liveLinkClick: (slug, href) =>
    analytics.trackStructured({
      category: 'portfolio',
      action: 'live_link_click',
      label: slug,
      params: { href },
    }),
};

// ─── Contact ──────────────────────────────────────────────────────────────────
export const contact = {
  // status: 'success' | 'error'
  formSubmit: (status, method) =>
    analytics.trackStructured({
      category: 'contact',
      action: 'form_submit',
      label: status,
      params: { method },
    }),

  linkClick: (channel) =>
    analytics.trackStructured({ category: 'contact', action: 'link_click', label: channel }),
};

// ─── Game ─────────────────────────────────────────────────────────────────────
export const game = {
  playClick: () =>
    analytics.trackStructured({ category: 'game', action: 'play_click', label: 'flame_jumper' }),

  githubClick: () =>
    analytics.trackStructured({ category: 'game', action: 'github_click', label: 'flame_jumper' }),
};

// ─── Hobby ────────────────────────────────────────────────────────────────────
export const hobby = {
  videoOpen: (title) =>
    analytics.trackStructured({ category: 'hobby', action: 'video_open', label: title }),

  bookFlightClick: () =>
    analytics.trackStructured({ category: 'hobby', action: 'book_flight_click', label: '' }),
};

// ─── Legacy helpers (kept for backward compat, avoid in new code) ─────────────
export const trackPageView = (pageName, metadata = {}) =>
  analytics.track('page_view', { page: pageName, ...metadata });

export const trackClick = (elementName, metadata = {}) =>
  analytics.track('click', { element: elementName, ...metadata });
