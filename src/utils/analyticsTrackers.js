import { analytics } from './analyticsService';

export const trackPageView = (pageName, metadata = {}) => {
  analytics.track('page_view', {
    page: pageName,
    ...metadata,
  });
};

export const trackClick = (elementName, metadata = {}) => {
  analytics.track('click', {
    element: elementName,
    ...metadata,
  });
};
