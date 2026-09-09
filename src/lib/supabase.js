import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY не заданы — аналитика и админка работать не будут.'
  )
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // портфолио на GitHub Pages — редиректы OAuth не используются
    detectSessionInUrl: false,
  },
})

export const SUPABASE_URL = url
export const SUPABASE_ANON_KEY = anonKey
