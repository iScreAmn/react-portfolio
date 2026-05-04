import { useCallback, useState } from 'react';
import { getApiBase } from '../../utils/apiBase';
import AnalyticsContainer from './analytics/AnalyticsContainer';
import './Admin.css';

const TOKEN_KEY = 'portfolio_analytics_admin_jwt';

function getStoredToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export default function Admin() {
  const apiUrl = getApiBase();
  const [token, setToken] = useState(() => getStoredToken());
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const tryAuth = useCallback(async () => {
    const l = login.trim();
    if (!l || !password) {
      setError('Введите логин и пароль');
      return;
    }
    if (import.meta.env.PROD && !apiUrl) {
      setError('Не задан VITE_API_URL для production. Логин на API невозможен.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: l, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      const t = body.token;
      if (!t) {
        throw new Error('Нет токена в ответе');
      }
      setToken(t);
      try {
        sessionStorage.setItem(TOKEN_KEY, t);
      } catch {
        /* ignore */
      }
      setPassword('');
    } catch (e) {
      setError(e.message || 'Ошибка');
    } finally {
      setSubmitting(false);
    }
  }, [apiUrl, login, password]);

  const logout = () => {
    setToken('');
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  };

  if (!token) {
    return (
      <div className="admin-gate">
        <div className="admin-gate__card">
          <h1 className="admin-gate__title">Аналитика</h1>
          <p className="admin-gate__hint">
            Вход по учётной записи администратора (сервер:{' '}
            <code>ADMIN_LOGIN</code>, <code>ADMIN_PASSWORD_HASH</code> или{' '}
            <code>ADMIN_PASSWORD</code>, <code>JWT_SECRET</code>).
          </p>
          <input
            type="text"
            className="admin-gate__input"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            className="admin-gate__input"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryAuth()}
            autoComplete="current-password"
          />
          {error && <p className="admin-gate__err">{error}</p>}
          <button
            type="button"
            className="admin-gate__btn"
            onClick={tryAuth}
            disabled={submitting}
          >
            {submitting ? 'Вход…' : 'Войти'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page__bar">
        <span className="admin-page__label">Конфигурация и аналитика</span>
        <button type="button" className="admin-page__logout" onClick={logout}>
          Выйти
        </button>
      </div>
      <AnalyticsContainer apiUrl={apiUrl} token={token} />
    </div>
  );
}
