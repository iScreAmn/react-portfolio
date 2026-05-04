import { useState, useEffect } from 'react';
import './Analytics.css';

const AnalyticsDashboard = ({ apiUrl, token }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, apiUrl, token]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/api/analytics/stats?range=${dateRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Ошибка ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
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
          <p>Ошибка: {error}</p>
          <button onClick={fetchAnalytics} className="analytics-retry">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 className="analytics-title">Аналитика использования</h2>
        <div className="analytics-filters">
          <button
            onClick={() => setDateRange('7d')}
            className={`analytics-filter-btn ${dateRange === '7d' ? 'active' : ''}`}
          >
            7 дней
          </button>
          <button
            onClick={() => setDateRange('30d')}
            className={`analytics-filter-btn ${dateRange === '30d' ? 'active' : ''}`}
          >
            30 дней
          </button>
          <button
            onClick={() => setDateRange('90d')}
            className={`analytics-filter-btn ${dateRange === '90d' ? 'active' : ''}`}
          >
            90 дней
          </button>
        </div>
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

        <div className="analytics-card analytics-card--wide">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Действия пользователей</h3>
          </div>
          <div className="analytics-card__content">
            {stats?.topActions && stats.topActions.length > 0 ? (
              <ul className="analytics-list">
                {stats.topActions.map((action, i) => (
                  <li key={i} className="analytics-list__item">
                    <span className="analytics-list__name">{action.name || 'Unknown'}</span>
                    <span className="analytics-list__value">{action.count} раз</span>
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
          <div className="analytics-card__content">
            {stats?.hourlyActivity && stats.hourlyActivity.length > 0 ? (
              <div className="analytics-chart">
                {stats.hourlyActivity.map((hour, i) => (
                  <div key={i} className="analytics-chart__bar-wrapper">
                    <div
                      className="analytics-chart__bar"
                      style={{ height: `${hour.percentage}%` }}
                      title={`${hour.hour}:00 - ${hour.count} событий`}
                    />
                    <span className="analytics-chart__label">{hour.hour}</span>
                  </div>
                ))}
              </div>
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
