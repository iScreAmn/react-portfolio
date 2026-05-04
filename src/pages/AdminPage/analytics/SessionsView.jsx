import { useState, useEffect } from 'react';
import './SessionsView.css';
import { FaTrash } from "react-icons/fa";

const SessionsView = ({ apiUrl, token }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionDetail, setSessionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [dateRange, setDateRange] = useState('7d');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, [dateRange, apiUrl, token]);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/api/analytics/sessions?range=${dateRange}&limit=100`, {
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
      setSessions(result.data || []);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionDetail = async (sessionId) => {
    setDetailLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/analytics/sessions/${sessionId}`, {
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
      setSessionDetail(result.data);
    } catch (err) {
      console.error('Failed to fetch session detail:', err);
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    fetchSessionDetail(session.sessionId);
  };

  const handleDeleteSession = async (sessionId) => {
    if (!confirm('Удалить эту сессию? Это действие нельзя отменить!')) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/analytics/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setSessions(sessions.filter((s) => s.sessionId !== sessionId));
        setSelectedSession(null);
        setSessionDetail(null);
      } else {
        const result = await response.json();
        alert(result.message || 'Ошибка удаления');
      }
    } catch (err) {
      console.error('Failed to delete session:', err);
      alert('Ошибка сети');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDeviceIcon = (deviceType) => {
    if (deviceType === 'mobile') return '📱';
    if (deviceType === 'tablet') return '📱';
    return '💻';
  };

  const getSourceLabel = (session) => {
    if (!session) return 'Прямой заход';

    const sourceHost = session.sourceHost || session.trafficSource?.sourceHost;

    if (session.sourceType === 'direct') return 'Прямой заход';
    if (session.sourceType === 'search') return `Поиск: ${sourceHost || 'unknown'}`;
    if (session.sourceType === 'social') return `Соцсеть: ${sourceHost || 'unknown'}`;
    if (session.sourceType === 'referral') return `Переход: ${sourceHost || 'unknown'}`;
    if (session.sourceType === 'internal') return `Внутренний переход: ${sourceHost || 'same-site'}`;

    if (session.referrer) return `Переход: ${session.referrer}`;
    return 'Прямой заход';
  };

  const getSourceUrl = (session) => session?.trafficSource?.sourceUrl || session?.referrer || null;

  if (loading) {
    return (
      <div className="sessions-view">
        <div className="sessions-loading">Загрузка сессий...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sessions-view">
        <div className="sessions-error">
          <p>Ошибка: {error}</p>
          <button onClick={fetchSessions} className="sessions-retry">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sessions-view">
      <div className="sessions-header">
        <h2 className="sessions-title">Сессии пользователей</h2>
        <div className="sessions-filters">
          <button
            onClick={() => setDateRange('7d')}
            className={`sessions-filter-btn ${dateRange === '7d' ? 'active' : ''}`}
          >
            7 дней
          </button>
          <button
            onClick={() => setDateRange('30d')}
            className={`sessions-filter-btn ${dateRange === '30d' ? 'active' : ''}`}
          >
            30 дней
          </button>
          <button
            onClick={() => setDateRange('90d')}
            className={`sessions-filter-btn ${dateRange === '90d' ? 'active' : ''}`}
          >
            90 дней
          </button>
        </div>
      </div>

      <div className="sessions-layout">
        <div className="sessions-list">
          <div className="sessions-list-header">
            <span>Всего сессий: {sessions.length}</span>
          </div>
          {sessions.map((session) => (
            <div
              key={session.sessionId}
              className={`session-card ${selectedSession?.sessionId === session.sessionId ? 'active' : ''}`}
              onClick={() => handleSessionClick(session)}
            >
              <div className="session-card__header">
                <span className="session-card__device">
                  {getDeviceIcon(session.device?.type)} {session.device?.os || 'Unknown OS'}
                </span>
                <span className="session-card__duration">{session.durationFormatted}</span>
              </div>
              <div className="session-card__info">
                <div className="session-card__row">
                  <span className="session-card__label">Браузер:</span>
                  <span className="session-card__value">{session.device?.browser || 'Unknown'}</span>
                </div>
                <div className="session-card__row">
                  <span className="session-card__label">IP:</span>
                  <span className="session-card__value">{session.ip || 'N/A'}</span>
                </div>
                <div className="session-card__row">
                  <span className="session-card__label">Локация:</span>
                  <span className="session-card__value">
                    {[session.country, session.city].filter(Boolean).join(', ') || 'N/A'}
                  </span>
                </div>
                <div className="session-card__row">
                  <span className="session-card__label">Источник:</span>
                  <span className="session-card__value">{getSourceLabel(session)}</span>
                </div>
                <div className="session-card__row">
                  <span className="session-card__label">Время:</span>
                  <span className="session-card__value">{formatDate(session.start)}</span>
                </div>
                <div className="session-card__row">
                  <span className="session-card__label">События:</span>
                  <span className="session-card__value">{session.eventsCount}</span>
                </div>
                <div className="session-card__row">
                  <span className="session-card__label">Страниц:</span>
                  <span className="session-card__value">{session.pagesCount}</span>
                </div>
              </div>
              {session.referrer && (
                <div className="session-card__referrer">
                  <span className="session-card__label">Откуда:</span>
                  <span className="session-card__referrer-url">{session.referrer}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="session-detail">
          {!selectedSession && (
            <div className="session-detail-empty">
              <p>Выберите сессию для просмотра деталей</p>
            </div>
          )}

          {selectedSession && detailLoading && (
            <div className="session-detail-loading">Загрузка деталей...</div>
          )}

          {selectedSession && !detailLoading && sessionDetail && (
            <div className="session-detail-content">
              <div className="session-detail-header">
                <h3 className="session-detail-title">Детали сессии</h3>
                <button
                  onClick={() => handleDeleteSession(sessionDetail.sessionId)}
                  className="session-detail-delete-btn"
                  title="Удалить сессию"
                >
                  <FaTrash /> Delete
                </button>
              </div>
              
              <div className="session-detail-section">
                <h4 className="session-detail-section-title">Общая информация</h4>
                <div className="session-detail-grid">
                  <div className="session-detail-item">
                    <span className="session-detail-label">Устройство:</span>
                    <span className="session-detail-value">
                      {getDeviceIcon(sessionDetail.device?.type)} {sessionDetail.device?.type}
                    </span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">ОС:</span>
                    <span className="session-detail-value">{sessionDetail.device?.os}</span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">Браузер:</span>
                    <span className="session-detail-value">{sessionDetail.device?.browser}</span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">Разрешение:</span>
                    <span className="session-detail-value">
                      {sessionDetail.device?.screenWidth} × {sessionDetail.device?.screenHeight}
                    </span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">IP:</span>
                    <span className="session-detail-value">{sessionDetail.ip || 'N/A'}</span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">Страна:</span>
                    <span className="session-detail-value">{sessionDetail.country || 'N/A'}</span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">Город:</span>
                    <span className="session-detail-value">{sessionDetail.city || 'N/A'}</span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">Локаль:</span>
                    <span className="session-detail-value">{sessionDetail.locale}</span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">Часовой пояс:</span>
                    <span className="session-detail-value">{sessionDetail.timezone}</span>
                  </div>
                  <div className="session-detail-item session-detail-item--full">
                    <span className="session-detail-label">Источник трафика:</span>
                    <span className="session-detail-value">{getSourceLabel(sessionDetail)}</span>
                  </div>
                  <div className="session-detail-item">
                    <span className="session-detail-label">Длительность:</span>
                    <span className="session-detail-value">{sessionDetail.durationFormatted}</span>
                  </div>
                </div>
                {getSourceUrl(sessionDetail) && (
                  <div className="session-detail-item session-detail-item--full">
                    <span className="session-detail-label">URL источника:</span>
                    <a 
                      href={getSourceUrl(sessionDetail)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="session-detail-link"
                    >
                      {getSourceUrl(sessionDetail)}
                    </a>
                  </div>
                )}
              </div>

              <div className="session-detail-section">
                <h4 className="session-detail-section-title">Посещенные страницы</h4>
                <ul className="session-detail-pages">
                  {sessionDetail.pages.map((page, idx) => (
                    <li key={idx} className="session-detail-page">{page}</li>
                  ))}
                </ul>
              </div>

              <div className="session-detail-section">
                <h4 className="session-detail-section-title">
                  События ({sessionDetail.events.length})
                </h4>
                <div className="session-detail-events">
                  {sessionDetail.events.map((event, idx) => (
                    <div key={idx} className="session-event">
                      <div className="session-event__header">
                        <span className="session-event__type">{event.type}</span>
                        <span className="session-event__time">
                          {new Date(event.timestamp).toLocaleTimeString('ru-RU')}
                        </span>
                      </div>
                      <div className="session-event__url">{event.url}</div>
                      {event.data && Object.keys(event.data).length > 0 && (
                        <div className="session-event__data">
                          <pre>{JSON.stringify(event.data, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionsView;
