import { getApiBase } from './apiBase.js';

class AnalyticsService {
  constructor() {
    this.buffer = [];
    this.maxBufferSize = 50;
    this.flushInterval = 30000;
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.intervalId = null;
    this.isInitialized = false;
    this.apiUrl = '';
  }

  static FIRST_SOURCE_STORAGE_KEY = 'analytics_first_traffic_source';

  setApiUrl(url) {
    this.apiUrl = url;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (!this.apiUrl) {
      this.apiUrl = getApiBase();
    }

    this.intervalId = setInterval(() => this.flush(), this.flushInterval);

    window.addEventListener('beforeunload', () => this.flush(true));
    window.addEventListener('pagehide', () => this.flush(true));

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush(true);
      }
    });
  }

  generateSessionId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  normalizeHost(host = '') {
    return String(host || '').trim().toLowerCase().replace(/^www\./, '');
  }

  getUtmParams() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const utmSource = String(params.get('utm_source') || '').trim();
      const utmMedium = String(params.get('utm_medium') || '').trim();
      const utmCampaign = String(params.get('utm_campaign') || '').trim();

      return {
        utmSource,
        utmMedium,
        utmCampaign,
        hasUtm: Boolean(utmSource || utmMedium || utmCampaign),
      };
    } catch {
      return {
        utmSource: '',
        utmMedium: '',
        utmCampaign: '',
        hasUtm: false,
      };
    }
  }

  getStoredFirstSource() {
    try {
      const raw = sessionStorage.getItem(AnalyticsService.FIRST_SOURCE_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      return parsed;
    } catch {
      return null;
    }
  }

  saveFirstSource(source) {
    try {
      sessionStorage.setItem(AnalyticsService.FIRST_SOURCE_STORAGE_KEY, JSON.stringify(source));
    } catch {
      // ignore storage errors
    }
  }

  resolveSourceTypeByMedium(medium = '') {
    const value = String(medium || '').trim().toLowerCase();
    if (!value) return 'referral';
    if (['search', 'organic', 'seo', 'cpc', 'ppc'].includes(value)) return 'search';
    if (['social', 'social_media', 'smm', 'messenger'].includes(value)) return 'social';
    if (['direct', '(none)', 'none'].includes(value)) return 'direct';
    return 'referral';
  }

  getTrafficSource() {
    const currentHost = this.normalizeHost(window.location.hostname);
    const referrer = String(document.referrer || '').trim();
    const { utmSource, utmMedium, utmCampaign, hasUtm } = this.getUtmParams();

    if (hasUtm) {
      const detectedByUtm = {
        channel: 'external',
        sourceType: this.resolveSourceTypeByMedium(utmMedium),
        sourceHost: this.normalizeHost(utmSource) || utmSource || null,
        sourceUrl: referrer || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      };
      this.saveFirstSource(detectedByUtm);
      return detectedByUtm;
    }

    const storedFirstSource = this.getStoredFirstSource();
    if (storedFirstSource) return storedFirstSource;

    if (!referrer) {
      const directSource = {
        channel: 'direct',
        sourceType: 'direct',
        sourceHost: null,
        sourceUrl: null,
      };
      this.saveFirstSource(directSource);
      return directSource;
    }

    try {
      const referrerUrl = new URL(referrer);
      const sourceHost = this.normalizeHost(referrerUrl.hostname);

      if (!sourceHost || sourceHost === currentHost) {
        const internalSource = {
          channel: 'internal',
          sourceType: 'internal',
          sourceHost,
          sourceUrl: referrer,
        };
        this.saveFirstSource(internalSource);
        return internalSource;
      }

      const searchHosts = ['google.', 'yandex.', 'bing.', 'duckduckgo.', 'search.yahoo.', 'baidu.'];
      const socialHosts = ['t.me', 'telegram.', 'facebook.', 'instagram.', 'x.com', 'twitter.', 'linkedin.', 'vk.com'];
      const isSearch = searchHosts.some((pattern) => sourceHost.includes(pattern));
      const isSocial = socialHosts.some((pattern) => sourceHost.includes(pattern));

      const detectedByReferrer = {
        channel: 'external',
        sourceType: isSearch ? 'search' : (isSocial ? 'social' : 'referral'),
        sourceHost,
        sourceUrl: referrer,
      };
      this.saveFirstSource(detectedByReferrer);
      return detectedByReferrer;
    } catch {
      const invalidReferrerSource = {
        channel: 'external',
        sourceType: 'referral',
        sourceHost: null,
        sourceUrl: referrer,
      };
      this.saveFirstSource(invalidReferrerSource);
      return invalidReferrerSource;
    }
  }

  getDeviceInfo() {
    const ua = navigator.userAgent;
    const platform = navigator.platform || '';
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    const isAppleTouchDesktopUA =
      /Macintosh/i.test(ua) && (/Mobile/i.test(ua) || maxTouchPoints > 1);
    const screenWidth = window.screen.width;

    let deviceType = 'desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      deviceType = 'tablet';
    } else if (isAppleTouchDesktopUA) {
      deviceType = screenWidth >= 768 ? 'tablet' : 'mobile';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      deviceType = 'mobile';
    }

    let os = 'Unknown';
    if (/iPhone/.test(ua) && !window.MSStream) {
      const version = ua.match(/OS (\d+)_/);
      os = version ? `iPhone (iOS ${version[1]})` : 'iPhone';
    } else if (/iPad|iPod/.test(ua) && !window.MSStream) {
      const version = ua.match(/OS (\d+)_/);
      os = version ? `iPad (iOS ${version[1]})` : 'iPad';
    } else if (platform === 'MacIntel' && maxTouchPoints > 1 && !window.MSStream) {
      const version = ua.match(/Version\/(\d+)/i);
      os = version ? `iPad (iPadOS ${version[1]})` : 'iPad';
    } else if (isAppleTouchDesktopUA && !window.MSStream) {
      const version = ua.match(/Version\/(\d+)/i);
      os = screenWidth >= 768
        ? (version ? `iPad (iPadOS ${version[1]})` : 'iPad')
        : (version ? `iPhone (iOS ${version[1]})` : 'iPhone');
    } else if (/Windows NT 10/i.test(ua)) os = 'Windows 10';
    else if (/Windows NT 6.3/i.test(ua)) os = 'Windows 8.1';
    else if (/Windows NT 6.2/i.test(ua)) os = 'Windows 8';
    else if (/Windows NT 6.1/i.test(ua)) os = 'Windows 7';
    else if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac OS X 10[._](\d+)/i.test(ua)) {
      const version = ua.match(/Mac OS X 10[._](\d+)/i);
      os = `macOS 10.${version ? version[1] : 'x'}`;
    } else if (/Mac/i.test(ua)) os = 'macOS';
    else if (/Android (\d+)/i.test(ua)) {
      const version = ua.match(/Android (\d+)/i);
      os = `Android ${version ? version[1] : ''}`;
    } else if (/Linux/i.test(ua)) os = 'Linux';
    else if (/CrOS/.test(ua)) os = 'Chrome OS';

    let browser = 'Unknown';
    if (/Edg\//i.test(ua)) browser = 'Edge';
    else if (/OPR|Opera/i.test(ua)) browser = 'Opera';
    else if (/Chrome/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/MSIE|Trident/i.test(ua)) browser = 'IE';

    return {
      type: deviceType,
      os,
      browser,
      screenWidth,
      screenHeight: window.screen.height,
      platform,
    };
  }

  track(eventType, data = {}) {
    if (!this.isInitialized) {
      this.init();
    }

    const pathname = window.location.pathname || '/';
    if (pathname.startsWith('/admin')) {
      return;
    }

    const trafficSource = this.getTrafficSource();

    const event = {
      type: eventType,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: pathname,
      hostname: window.location.hostname || '',
      origin: window.location.origin || '',
      referrer: trafficSource.sourceUrl,
      trafficSource,
      userAgent: navigator.userAgent,
      device: this.getDeviceInfo(),
      locale: navigator.language || navigator.userLanguage,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    this.buffer.push(event);

    if (this.buffer.length >= this.maxBufferSize) {
      this.flush();
    }
  }

  flush(useBeacon = false) {
    if (this.buffer.length === 0) return;

    const payload = {
      events: [...this.buffer],
      flushedAt: Date.now(),
    };

    this.buffer = [];

    const base = this.apiUrl.replace(/\/$/, '');
    const endpoint = `${base}/api/analytics`;

    if (useBeacon && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((err) => console.error('Analytics error:', err));
    }
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.flush(true);
    this.isInitialized = false;
  }
}

export const analytics = new AnalyticsService();
