import { useState } from "react"

import { EnterpriseConfirm } from "@/components/enterprise-confirm"
import { EnterpriseFilters } from "@/components/enterprise-filters"
import { EnterpriseHeader } from "@/components/enterprise-header"
import { EnterpriseStats } from "@/components/enterprise-stats"
import { EnterpriseTable } from "@/components/enterprise-table"
import { EnterpriseForm } from "@/components/enterprise-form"
import { useEnterprise } from "@/hooks/use-enterprise"

import type { Enterprise } from "@/types/enterprise"

export function App() {
  const { enterprises, filteredEnterprises, actions, filters } = useEnterprise()

  const [openForm, setOpenForm] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<Enterprise | null>(null)
  const [updating, setUpdating] = useState<Enterprise | null>(null)

  function handleSave(
    formData: Omit<Enterprise, "id" | "createdAt" | "updatedAt">
  ): void {
    if (updating) {
      actions.update(updating.id, formData)
    } else {
      actions.add(formData)
    }

    setUpdating(null)
  }

  function handleAdd(): void {
    setUpdating(null)
    setOpenForm(true)
  }

  function handleUpdate(item: Enterprise): void {
    setUpdating(item)
    setOpenForm(true)
  }

  function handleDelete(): void {
    if (deleting) {
      actions.delete(deleting.id)
      setDeleting(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <EnterpriseHeader onAdd={handleAdd} />

      <main className="container mx-auto space-y-8 p-4 py-8">
        <EnterpriseStats data={enterprises} />

        <EnterpriseFilters filters={filters} />

        <EnterpriseTable
          data={filteredEnterprises}
          onEdit={handleUpdate}
          onDelete={setDeleting}
        />
      </main>

      <EnterpriseForm
        open={openForm}
        onOpenChange={(open) => {
          setOpenForm(open)
          if (open) setUpdating(null)
        }}
        data={updating}
        onSave={handleSave}
      />

      <EnterpriseConfirm
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        data={deleting}
        onConfirm={handleDelete}
      />
    </div>
  )
}
