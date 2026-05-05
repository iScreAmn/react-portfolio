import { useState, useEffect } from 'react';
import './Analytics.css';
import HourlyActivityChart from './HourlyActivityChart';

const AnalyticsDashboard = ({ apiUrl, token, filters }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // client-side event filters (applied on top of server data)
  const [evtCategory, setEvtCategory] = useState('');
  const [evtAction, setEvtAction] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, [filters, apiUrl, token]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ range: filters.range });
      if (filters.country) params.set('country', filters.country);
      if (filters.device) params.set('device', filters.device);
      if (filters.browser) params.set('browser', filters.browser);
      if (filters.source) params.set('source', filters.source);

      const response = await fetch(`${apiUrl}/api/analytics/stats?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      setStats(result.data || result);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="analytics-loading">Загрузка аналитики...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="analytics-error">
          <p>Error: {error}</p>
          <button onClick={fetchAnalytics} className="analytics-retry">
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ── topEvents: use stats.topEvents if present, fall back to topActions ──────
  const rawTopEvents = stats?.topEvents?.length
    ? stats.topEvents
    : (stats?.topActions || []).map((a) => ({
        category: 'legacy',
        action: a.name || 'unknown',
        label: '',
        count: a.count,
      }));

  const evtCategories = [...new Set(rawTopEvents.map((e) => e.category).filter(Boolean))];
  const evtActionsForCategory = evtCategory
    ? [...new Set(rawTopEvents.filter((e) => e.category === evtCategory).map((e) => e.action).filter(Boolean))]
    : [...new Set(rawTopEvents.map((e) => e.action).filter(Boolean))];

  const filteredTopEvents = rawTopEvents.filter((e) => {
    if (evtCategory && e.category !== evtCategory) return false;
    if (evtAction && e.action !== evtAction) return false;
    return true;
  });

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 className="analytics-title">Аналитика использования</h2>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Просмотры страниц</h3>
          </div>
          <div className="analytics-card__value">{stats?.pageViews?.toLocaleString() || 0}</div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Уникальные сессии</h3>
          </div>
          <div className="analytics-card__value">{stats?.uniqueUsers?.toLocaleString() || 0}</div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Среднее время сессии</h3>
          </div>
          <div className="analytics-card__value">{stats?.avgSessionDuration || '0m'}</div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Всего событий</h3>
          </div>
          <div className="analytics-card__value">{stats?.totalEvents?.toLocaleString() || 0}</div>
        </div>

        <div className="analytics-card analytics-card--wide">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Популярные страницы</h3>
          </div>
          <div className="analytics-card__content">
            {stats?.topPages && stats.topPages.length > 0 ? (
              <ul className="analytics-list">
                {stats.topPages.map((page, i) => (
                  <li key={i} className="analytics-list__item">
                    <span className="analytics-list__name">{page.name || 'Unknown'}</span>
                    <span className="analytics-list__value">{page.views} просмотров</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="analytics-empty">Нет данных</p>
            )}
          </div>
        </div>

        {/* ── Events card with category/action filters ─────────────────────── */}
        <div className="analytics-card analytics-card--wide">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">События</h3>
          </div>

          <div className="analytics-events-filters">
            <select
              className="analytics-events-select"
              value={evtCategory}
              onChange={(e) => {
                setEvtCategory(e.target.value);
                setEvtAction('');
              }}
            >
              <option value="">All categories</option>
              {evtCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              className="analytics-events-select"
              value={evtAction}
              onChange={(e) => setEvtAction(e.target.value)}
            >
              <option value="">All actions</option>
              {evtActionsForCategory.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>

            {(evtCategory || evtAction) && (
              <button
                className="analytics-events-clear"
                onClick={() => { setEvtCategory(''); setEvtAction(''); }}
              >
                Clear
              </button>
            )}
          </div>

          <div className="analytics-card__content">
            {filteredTopEvents.length > 0 ? (
              <ul className="analytics-list">
                {filteredTopEvents.map((event, i) => (
                  <li key={i} className="analytics-list__item">
                    <span className="analytics-list__name">
                      <span className="analytics-event-badge">{event.category}</span>
                      <span className="analytics-event-action">{event.action}</span>
                      {event.label && (
                        <span className="analytics-event-label">· {event.label}</span>
                      )}
                    </span>
                    <span className="analytics-list__value">{event.count} раз</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="analytics-empty">Нет данных</p>
            )}
          </div>
        </div>

        <div className="analytics-card analytics-card--full">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Активность по часам</h3>
          </div>
          <div className="analytics-card__content analytics-card__content--chart">
            {stats?.hourlyActivity && stats.hourlyActivity.length > 0 ? (
              <HourlyActivityChart hourlyActivity={stats.hourlyActivity} />
            ) : (
              <p className="analytics-empty">Нет данных</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
