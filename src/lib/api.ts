// In production, use the current host's /api prefix
// In development, use localhost:5050
// Override with VITE_API_BASE env var
const DEV_API = "http://localhost:5050"
const PROD_API = ""  // empty means same origin in production

export const API_BASE = import.meta.env.VITE_API_BASE 
  || (import.meta.env.PROD ? PROD_API : DEV_API)

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`
}

export async function apiFetch<T = any>(path: string, options?: RequestInit): Promise<T> {
  const isFormData = options?.body instanceof FormData

  // Build headers, skipping Content-Type for FormData (browser sets it with boundary)
  const headers: Record<string, string> = {}
  if (!isFormData) {
    headers["Content-Type"] = "application/json"
  }

  // Auto-inject auth token from localStorage if available
  const token = localStorage.getItem("xzy-token")
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  // Merge any custom headers from the caller (overrides our defaults)
  if (options?.headers) {
    const customHeaders = options.headers as Record<string, string>
    Object.assign(headers, customHeaders)
  }

  const res = await fetch(apiUrl(path), {
    ...options,
    headers,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
    throw new Error(err.detail || `Request failed: ${res.status}`)
  }

  return res.json()
}

// ============ ACTIVITY LOG ============

export async function logActivity(action: string, itemType: string, itemName: string, itemId?: number) {
  const token = localStorage.getItem("xzy-token")
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`
  await fetch(apiUrl("/api/activity/log"), {
    method: "POST",
    headers,
    body: JSON.stringify({ action, item_type: itemType, item_name: itemName, item_id: itemId }),
  }).catch(() => {})
}

export async function fetchActivities(limit = 50) {
  const res = await fetch(apiUrl(`/api/activity?limit=${limit}`))
  return res.json()
}

export async function clearActivities() {
  return apiFetch("/api/activity", { method: "DELETE" })
}

// ============ DASHBOARD & TRENDING ============

export async function fetchAdminDashboard() {
  return apiFetch("/api/admin/dashboard")
}

export async function fetchTrending() {
  return apiFetch("/api/trending")
}

export async function fetchLeaderboard() {
  return apiFetch("/api/leaderboard")
}

// ============ BADGES ============

export async function fetchUserBadges(userId: number) {
  return apiFetch(`/api/badges/${userId}`)
}

export async function fetchAllBadges() {
  return apiFetch("/api/badges/all")
}
