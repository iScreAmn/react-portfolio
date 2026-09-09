import { createContext, useContext, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initAnalytics,
  trackEvent,
  trackPageview,
  flushAnalytics,
  setAnalyticsEnabled,
} from '../lib/analytics'

const AnalyticsContext = createContext({
  track: trackEvent,
  flush: flushAnalytics,
  setEnabled: setAnalyticsEnabled,
})

/**
 * Оборачивает приложение ВНУТРИ роутера:
 *
 *   <BrowserRouter>
 *     <AnalyticsProvider>
 *       <App />
 *     </AnalyticsProvider>
 *   </BrowserRouter>
 */
export function AnalyticsProvider({ children }) {
  const location = useLocation()
  const lastPath = useRef(null)

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    const path = location.pathname + location.search
    if (lastPath.current === path) return // StrictMode в dev монтирует дважды
    lastPath.current = path
    trackPageview(path)
  }, [location.pathname, location.search])

  return (
    <AnalyticsContext.Provider
      value={{ track: trackEvent, flush: flushAnalytics, setEnabled: setAnalyticsEnabled }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

/**
 * Хук для событий из компонентов:
 *   const { track } = useAnalytics()
 *   <button onClick={() => track('cta', 'click', 'hire-me', { block: 'hero' })}>
 */
export function useAnalytics() {
  return useContext(AnalyticsContext)
}

/**
 * Отмечает, что блок реально доскроллили и увидели.
 *   const ref = useTrackVisible('projects')
 *   <section ref={ref}>…</section>
 */
export function useTrackVisible(sectionName, threshold = 0.4) {
  const ref = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || fired.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          trackEvent('section', 'view', sectionName)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [sectionName, threshold])

  return ref
}
