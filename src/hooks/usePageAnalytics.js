import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../utils/analyticsService';
import { trackPageView } from '../utils/analyticsTrackers';

const isTrackablePath = (pathname) => !String(pathname || '').startsWith('/admin');

export function usePageAnalytics() {
  const location = useLocation();

  useEffect(() => {
    analytics.init();
  }, []);

  useEffect(() => {
    if (!isTrackablePath(location.pathname)) return;
    analytics.init();
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
}
