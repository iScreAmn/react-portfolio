/**
 * Запросы для админки. Работают только у вошедшего пользователя,
 * у которого есть строка в public.profiles — иначе RLS вернёт пустоту.
 */
import { supabase } from './supabase'

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export const signOut = () => supabase.auth.signOut()

/** Сводка за период: тоталы, график по дням, топ страниц, источники, гео. */
export async function getSummary(from, to = new Date()) {
  const fromTs = from ?? new Date(Date.now() - 30 * 24 * 3600 * 1000)
  const { data, error } = await supabase.rpc('analytics_summary', {
    from_ts: new Date(fromTs).toISOString(),
    to_ts: new Date(to).toISOString(),
  })
  if (error) throw error
  return data
}

export async function getDaily(limit = 60) {
  const { data, error } = await supabase
    .from('analytics_daily')
    .select('*')
    .order('day', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

// Витрины отдают строки без гарантии порядка (внутренний order by в view
// PostgREST не сохраняет), поэтому сортировку задаём явно в каждом запросе.

export async function getTopPages(limit = 20) {
  const { data, error } = await supabase
    .from('analytics_pages')
    .select('*')
    .order('pageviews', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function getSources(limit = 20) {
  const { data, error } = await supabase
    .from('analytics_sources')
    .select('*')
    .order('sessions', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function getDevices(limit = 20) {
  const { data, error } = await supabase
    .from('analytics_devices')
    .select('*')
    .order('sessions', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function getGeo(limit = 50) {
  const { data, error } = await supabase
    .from('analytics_geo')
    .select('*')
    .order('sessions', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

/** Список визитов за период. Одна строка = одна сессия. */
export async function getSessionsList(from, to = new Date(), limit = 100) {
  const fromTs = from ?? new Date(Date.now() - 7 * 24 * 3600 * 1000)
  const { data, error } = await supabase
    .from('analytics_sessions')
    .select('*')
    .gte('started_at', new Date(fromTs).toISOString())
    .lte('started_at', new Date(to).toISOString())
    .order('started_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

/** Лента событий одной сессии — для раскрытия карточки визита. */
export async function getSessionEvents(sessionId, limit = 500) {
  const { data, error } = await supabase
    .from('analytics_events')
    .select('occurred_at, category, action, label, path, params')
    .eq('session_id', sessionId)
    .order('occurred_at', { ascending: true })
    .limit(limit)
  if (error) throw error
  return data
}

/** Профиль вошедшего админа. Пустой ответ = строки в profiles нет. */
export async function getMyProfile() {
  const { data: auth } = await supabase.auth.getUser()
  const userId = auth?.user?.id
  if (!userId) return null

  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  if (error) throw error
  return data
}

/** Смена собственного пароля — работает через Supabase Auth, без обращения к profiles. */
export async function changePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

/** Последние сырые события — для отладки трекера. */
export async function getRecentEvents(limit = 100) {
  const { data, error } = await supabase
    .from('analytics_events')
    .select('occurred_at, session_id, category, action, label, path, country, device_type, browser')
    .order('occurred_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

/** Живая лента событий через Realtime (включи репликацию таблицы в дашборде). */
export function subscribeToEvents(onEvent) {
  const channel = supabase
    .channel('analytics-live')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'analytics_events' },
      (payload) => onEvent(payload.new)
    )
    .subscribe()
  return () => supabase.removeChannel(channel)
}
