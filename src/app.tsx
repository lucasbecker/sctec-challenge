import { useState } from "react"
import { Filter, Plus, Search } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EnterpriseConfirm } from "@/components/enterprise-confirm"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatsCards } from "@/components/stats-cards"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EnterpriseForm } from "./components/enterprise-form"
import { EnterpriseTable } from "./components/enterprise-table"
import type { Enterprise } from "./types/enterprise"
import { STATUS } from "./constants/status"
import { SEGMENTS } from "./constants/segments"

export function App() {
  const [formOpen, setFormOpen] = useState(false)

  const [deleting, setDeleting] = useState<Enterprise | null>(null)
  const [updating, setUpdating] = useState<Enterprise | null>(null)

  const [data, setData] = useState<Array<Enterprise>>([
    {
      id: "1",
      name: "BCKR DEV",
      entrepreneur: "Lucas Becker",
      city: "Criciúma",
      segment: "Tecnologia",
      email: "lucas@bckr.dev",
      phone: "(48) 9 9999-9999",
      status: "Ativo",
      document: "99.999.999/9999-99",
      description: "Descrição",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ])

  function handleUpdate(item: Enterprise) {
    setUpdating(item)
    setFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 text-center backdrop-blur-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-display text-sm font-bold text-primary-foreground">
                SC
              </span>
            </div>

            <div>
              <h1 className="font-display text-left text-lg leading-none font-bold text-nowrap">
                SCTEC Challenge
              </h1>

              <p className="text-left text-xs text-nowrap text-muted-foreground">
                Gestão de Empreendimentos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button onClick={() => setFormOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Empreendimento
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-8 p-4 py-8">
        <StatsCards />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="relative col-span-2 flex-1 sm:col-span-3">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, empreendedor ou contato..."
              className="pl-10"
            />
          </div>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Segmento" />
            </SelectTrigger>
            <SelectContent>
              {SEGMENTS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {}}
            className="col-span-2 w-full gap-1 sm:col-span-1"
            disabled
          >
            <Filter className="h-3.5 w-3.5" />
            Limpar
          </Button>
        </div>

        <EnterpriseTable
          data={data}
          onEdit={handleUpdate}
          onDelete={setDeleting}
        />
      </main>

      <EnterpriseForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          setUpdating(null)
        }}
        data={updating}
        onSave={(item) =>
          setData((prev) => [
            ...prev,
            {
              ...item,
              id: `${prev.length + 1}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ])
        }
      />

      <EnterpriseConfirm
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        itemName={deleting?.name ?? ""}
        onConfirm={() => {}}
      />
    </div>
  )
}
