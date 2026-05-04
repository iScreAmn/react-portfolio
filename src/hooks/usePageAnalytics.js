import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../utils/analyticsService';
import { trackPageView } from '../utils/analyticsTrackers';

export function usePageAnalytics() {
  const location = useLocation();

  useEffect(() => {
    analytics.init();
  }, []);

  useEffect(() => {
    analytics.init();
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
}
