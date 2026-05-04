import { useState } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import SessionsView from './SessionsView';
import AnalyticsSettings from './AnalyticsSettings';
import './AnalyticsContainer.css';

const AnalyticsContainer = ({ apiUrl, token }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="analytics-container-wrapper">
      <div className="analytics-tabs">
        <button
          className={`analytics-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Обзор
        </button>
        <button
          className={`analytics-tab ${activeTab === 'sessions' ? 'active' : ''}`}
          onClick={() => setActiveTab('sessions')}
        >
          👥 Сессии пользователей
        </button>
        <button
          className={`analytics-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Настройки
        </button>
      </div>

      <div className="analytics-content">
        {activeTab === 'overview' && <AnalyticsDashboard apiUrl={apiUrl} token={token} />}
        {activeTab === 'sessions' && <SessionsView apiUrl={apiUrl} token={token} />}
        {activeTab === 'settings' && <AnalyticsSettings apiUrl={apiUrl} token={token} />}
      </div>
    </div>
  );
};

export default AnalyticsContainer;
