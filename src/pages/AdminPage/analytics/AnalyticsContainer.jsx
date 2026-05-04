import { useState } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import SessionsView from './SessionsView';
import AnalyticsSettings from './AnalyticsSettings';
import './AnalyticsContainer.css';
import { MdOutlineAnalytics, MdMenu, MdClose } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const DEVICE_OPTIONS = ['desktop', 'mobile', 'tablet'];
const BROWSER_OPTIONS = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'];
const SOURCE_OPTIONS = ['direct', 'search', 'social', 'referral', 'internal'];

const AnalyticsContainer = ({ apiUrl, token }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    range: '7d',
    country: '',
    device: '',
    browser: '',
    source: '',
  });

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="analytics-container-wrapper">
      <div className="analytics-tabs-wrapper">
        <button
          className="analytics-mobile-burger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          <span className="analytics-mobile-burger__text">
            {activeTab === 'overview' && 'Overview'}
            {activeTab === 'sessions' && 'Sessions'}
            {activeTab === 'settings' && 'Settings'}
          </span>
        </button>

        <div className={`analytics-tabs ${mobileMenuOpen ? 'analytics-tabs--open' : ''}`}>
          <button
            className={`analytics-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <MdOutlineAnalytics /> Overview
          </button>
          <button
            className={`analytics-tab ${activeTab === 'sessions' ? 'active' : ''}`}
            onClick={() => handleTabChange('sessions')}
          >
            <FaUsers /> Users Sessions
          </button>
          <button
            className={`analytics-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabChange('settings')}
          >
            <IoMdSettings /> Settings
          </button>
        </div>
      </div>

      {activeTab !== 'settings' && (
        <div className="analytics-filter-bar">
          <div className="analytics-filter-bar__range">
            {[
              { value: '7d', label: '7 days' },
              { value: '30d', label: '30 days' },
              { value: '90d', label: '90 days' },
            ].map(({ value, label }) => (
              <button
                key={value}
                className={`analytics-filter-btn ${filters.range === value ? 'active' : ''}`}
                onClick={() => updateFilter('range', value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="analytics-filter-bar__segments">
            <input
              className="analytics-filter-bar__input"
              placeholder="Country..."
              value={filters.country}
              onChange={(e) => updateFilter('country', e.target.value)}
            />

            <select
              className="analytics-filter-bar__select"
              value={filters.device}
              onChange={(e) => updateFilter('device', e.target.value)}
            >
              <option value="">All devices</option>
              {DEVICE_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>

            <select
              className="analytics-filter-bar__select"
              value={filters.browser}
              onChange={(e) => updateFilter('browser', e.target.value)}
            >
              <option value="">All browsers</option>
              {BROWSER_OPTIONS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <select
              className="analytics-filter-bar__select"
              value={filters.source}
              onChange={(e) => updateFilter('source', e.target.value)}
            >
              <option value="">All sources</option>
              {SOURCE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            {(filters.country || filters.device || filters.browser || filters.source) && (
              <button
                className="analytics-filter-bar__clear"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    country: '',
                    device: '',
                    browser: '',
                    source: '',
                  }))
                }
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      <div className="analytics-content">
        {activeTab === 'overview' && (
          <AnalyticsDashboard apiUrl={apiUrl} token={token} filters={filters} />
        )}
        {activeTab === 'sessions' && (
          <SessionsView apiUrl={apiUrl} token={token} filters={filters} />
        )}
        {activeTab === 'settings' && (
          <AnalyticsSettings apiUrl={apiUrl} token={token} />
        )}
      </div>
    </div>
  );
};

export default AnalyticsContainer;
