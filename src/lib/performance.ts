export type PerformanceMode = "high" | "medium" | "low"

export function detectPerformanceMode(): PerformanceMode {
  if (typeof window === "undefined") return "high"

  const memory = (navigator as any).deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  const isMobile = window.matchMedia("(max-width: 768px)").matches
  const saveData = (navigator as any).connection?.saveData
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Low mode conditions
  if (
    reducedMotion ||
    saveData ||
    (memory <= 2 && cores <= 4) ||
    (isMobile && memory <= 2)
  ) {
    return "low"
  }

  // Medium mode conditions
  if (
    isMobile ||
    memory <= 4 ||
    cores <= 4
  ) {
    return "medium"
  }

  // High mode (desktop with good specs)
  return "high"
}

export function getPerformanceClass(mode: PerformanceMode): string {
  return `perf-${mode}`
}