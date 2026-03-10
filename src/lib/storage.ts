import type { Enterprise } from "@/types/enterprise"

const STORAGE_KEY = "sctec-challenge"

export function getEnterprises(): Array<Enterprise> {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveEnterprises(items: Array<Enterprise>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addEnterprise(
  item: Omit<Enterprise, "id" | "createdAt" | "updatedAt">
): Enterprise {
  const items = getEnterprises()
  const now = new Date().toISOString()

  const newItem: Enterprise = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }

  items.push(newItem)

  saveEnterprises(items)

  return newItem
}

export function updateEnterprise(
  id: string,
  data: Partial<Enterprise>
): Enterprise | null {
  const items = getEnterprises()

  const index = items.findIndex((i) => i.id === id)

  if (index === -1) return null

  items[index] = {
    ...items[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  saveEnterprises(items)

  return items[index]
}

export function deleteEnterprise(id: string): boolean {
  const items = getEnterprises()

  const filtered = items.filter((i) => i.id !== id)

  if (filtered.length === items.length) return false

  saveEnterprises(filtered)

  return true
}
