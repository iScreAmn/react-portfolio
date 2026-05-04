import { useState, useEffect } from 'react';
import './AnalyticsSettings.css';
import { IoRefresh } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";

const AnalyticsSettings = ({ apiUrl, token }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [showDeletePeriodDialog, setShowDeletePeriodDialog] = useState(false);
  const [periodDays, setPeriodDays] = useState(90);
  const [analyticsInfo, setAnalyticsInfo] = useState(null);

  const fetchAnalyticsInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/analytics/info`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAnalyticsInfo(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch analytics info:', err);
    }
  };

  useEffect(() => {
    fetchAnalyticsInfo();
  }, [apiUrl, token]);

  const handleDeleteAll = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`${apiUrl}/api/analytics/data/all`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        setShowDeleteAllConfirm(false);
        fetchAnalyticsInfo();
      } else {
        setMessage({ type: 'error', text: result.message || 'Ошибка удаления' });
      }
    } catch (err) {
      console.error('Failed to delete analytics:', err);
      setMessage({ type: 'error', text: 'Ошибка сети' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteByPeriod = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`${apiUrl}/api/analytics/data/period`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days: periodDays }),
      });
      const result = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        setShowDeletePeriodDialog(false);
        fetchAnalyticsInfo();
      } else {
        setMessage({ type: 'error', text: result.message || 'Ошибка удаления' });
      }
    } catch (err) {
      console.error('Failed to delete analytics by period:', err);
      setMessage({ type: 'error', text: 'Ошибка сети' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-settings">
      <div className="analytics-settings-header">
        <h2 className="analytics-settings-title">Управление данными</h2>
        <button 
          onClick={fetchAnalyticsInfo} 
          className="analytics-settings-refresh"
          disabled={loading}
        >
          <IoRefresh /> Refresh
        </button>
      </div>

      {message && (
        <div className={`analytics-settings-message analytics-settings-message--${message.type}`}>
          {message.text}
        </div>
      )}

      {analyticsInfo && (
        <div className="analytics-settings-info">
          <div className="analytics-settings-info-card">
            <div className="analytics-settings-info-label">Всего событий:</div>
            <div className="analytics-settings-info-value">{analyticsInfo.totalEvents.toLocaleString()}</div>
          </div>
          <div className="analytics-settings-info-card">
            <div className="analytics-settings-info-label">Примерный размер:</div>
            <div className="analytics-settings-info-value">{analyticsInfo.estimatedSize}</div>
          </div>
        </div>
      )}

      <div className="analytics-settings-section">
        <h3 className="analytics-settings-section-title">Удаление данных</h3>
        <p className="analytics-settings-section-desc">
          <CiWarning/> Внимание: удаленные данные невозможно восстановить
        </p>

        <div className="analytics-settings-actions">
          <div className="analytics-settings-action-card">
            <h4 className="analytics-settings-action-title">Удалить старые данные</h4>
            <p className="analytics-settings-action-desc">
              Удалить аналитику старше определенного периода
            </p>
            <button
              onClick={() => setShowDeletePeriodDialog(true)}
              className="analytics-settings-btn analytics-settings-btn--warning"
              disabled={loading}
            >
              Удалить по периоду
            </button>
          </div>

          <div className="analytics-settings-action-card">
            <h4 className="analytics-settings-action-title">Удалить всю аналитику</h4>
            <p className="analytics-settings-action-desc">
              Полная очистка всех данных аналитики из базы данных
            </p>
            <button
              onClick={() => setShowDeleteAllConfirm(true)}
              className="analytics-settings-btn analytics-settings-btn--danger"
              disabled={loading}
            >
              Удалить все данные
            </button>
          </div>
        </div>
      </div>

      {showDeleteAllConfirm && (
        <div className="analytics-settings-modal-overlay" onClick={() => setShowDeleteAllConfirm(false)}>
          <div className="analytics-settings-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="analytics-settings-modal-title">Подтверждение удаления</h3>
            <p className="analytics-settings-modal-text">
              Вы уверены, что хотите удалить ВСЮ аналитику?
              <br />
              Это действие нельзя отменить!
            </p>
            <div className="analytics-settings-modal-actions">
              <button
                onClick={() => setShowDeleteAllConfirm(false)}
                className="analytics-settings-modal-btn analytics-settings-modal-btn--cancel"
                disabled={loading}
              >
                Отмена
              </button>
              <button
                onClick={handleDeleteAll}
                className="analytics-settings-modal-btn analytics-settings-modal-btn--danger"
                disabled={loading}
              >
                {loading ? 'Удаление...' : 'Да, удалить все'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePeriodDialog && (
        <div className="analytics-settings-modal-overlay" onClick={() => setShowDeletePeriodDialog(false)}>
          <div className="analytics-settings-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="analytics-settings-modal-title">Удаление по периоду</h3>
            <p className="analytics-settings-modal-text">
              Удалить данные старше:
            </p>
            <div className="analytics-settings-modal-input-group">
              <input
                type="number"
                min="1"
                value={periodDays}
                onChange={(e) => setPeriodDays(parseInt(e.target.value, 10))}
                className="analytics-settings-modal-input"
              />
              <span className="analytics-settings-modal-input-label">дней</span>
            </div>
            <div className="analytics-settings-modal-actions">
              <button
                onClick={() => setShowDeletePeriodDialog(false)}
                className="analytics-settings-modal-btn analytics-settings-modal-btn--cancel"
                disabled={loading}
              >
                Отмена
              </button>
              <button
                onClick={handleDeleteByPeriod}
                className="analytics-settings-modal-btn analytics-settings-modal-btn--warning"
                disabled={loading}
              >
                {loading ? 'Удаление...' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsSettings;
