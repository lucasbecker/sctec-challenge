import { useCallback, useMemo, useState } from "react"
import { toast } from "sonner"

import {
  addEnterprise,
  deleteEnterprise,
  getEnterprises,
  updateEnterprise,
} from "@/lib/storage"
import type { Enterprise } from "@/types/enterprise"

const SEARCH_FIELDS: Array<keyof Enterprise> = [
  "name",
  "city",
  "entrepreneur",
  "email",
  "phone",
]

export function useEnterprise() {
  const [data, setData] = useState<Array<Enterprise>>(() => getEnterprises())

  const [search, setSearch] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [segment, setSegment] = useState<string>("")

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase()

    return data.filter((item) => {
      const matchSearch =
        !searchLower ||
        SEARCH_FIELDS.some((field) =>
          item[field]?.toLowerCase().includes(searchLower)
        )

      const matchSegment = segment === "" || item.segment === segment

      const matchStatus = status === "" || item.status === status

      return matchSearch && matchSegment && matchStatus
    })
  }, [data, search, segment, status])

  const hasFilters = Boolean(search || segment || status)

  const clearFilters = useCallback(() => {
    setSearch("")
    setStatus("")
    setSegment("")
  }, [])

  const handleAdd = useCallback(
    (formData: Omit<Enterprise, "id" | "createdAt" | "updatedAt">) => {
      const newEnterprise = addEnterprise(formData)

      setData((prev) => [...prev, newEnterprise])

      toast.success("Empreendimento cadastrado com sucesso!")
    },
    []
  )

  const handleUpdate = useCallback(
    (
      id: string,
      formData: Omit<Enterprise, "id" | "createdAt" | "updatedAt">
    ) => {
      const updated = updateEnterprise(id, formData)

      if (updated) {
        setData((prev) => prev.map((item) => (item.id === id ? updated : item)))
      }

      toast.success("Empreendimento atualizado com sucesso!")
    },
    []
  )

  const handleDelete = useCallback((id: string) => {
    const deleted = deleteEnterprise(id)

    if (deleted) {
      setData((prev) => prev.filter((item) => item.id !== id))
    }

    toast.success("Empreendimento excluído.")
  }, [])

  return {
    enterprises: data,
    filteredEnterprises: filtered,

    filters: {
      search,
      setSearch,
      status,
      setStatus,
      segment,
      setSegment,
      hasFilters,
      clearFilters,
    },

    actions: {
      add: handleAdd,
      update: handleUpdate,
      delete: handleDelete,
    },
  }
}
