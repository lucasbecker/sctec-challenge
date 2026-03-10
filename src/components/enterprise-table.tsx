import { useState, useMemo } from "react"
import {
  Pencil,
  Trash2,
  Mail,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Phone,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Enterprise } from "@/types/enterprise"

type SortField = keyof Enterprise
type SortDir = "asc" | "desc"

type EnterpriseTableProps = {
  data: Array<Enterprise>
  onEdit: (item: Enterprise) => void
  onDelete: (item: Enterprise) => void
}

export function EnterpriseTable({
  data,
  onEdit,
  onDelete,
}: EnterpriseTableProps) {
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [sortField, setSortField] = useState<SortField>("name")

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const valA = a[sortField]?.toLowerCase() ?? ""
      const valB = b[sortField]?.toLowerCase() ?? ""

      return sortDir === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    })
  }, [data, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-40" />
    return sortDir === "asc" ? (
      <ArrowUp className="ml-1 h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="ml-1 h-3.5 w-3.5" />
    )
  }

  if (data.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="font-display text-lg">Nenhum empreendimento encontrado</p>
        <p className="mt-1 text-sm">
          Cadastre um novo empreendimento ou limpe os filtros para começar.
        </p>
      </div>
    )
  }

  const sortableHeaders: { field: SortField; label: string }[] = [
    { field: "name", label: "Empreendimento" },
    { field: "entrepreneur", label: "Empreendedor(a)" },
    { field: "city", label: "Município" },
    { field: "segment", label: "Segmento" },
    { field: "email", label: "E-mail" },
    { field: "phone", label: "Telefone" },
    { field: "status", label: "Status" },
  ]

  return (
    <div className="animate-fade-in space-y-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {sortableHeaders.map(({ field, label }) => (
                <TableHead key={field}>
                  <button
                    className="font-display flex cursor-pointer items-center font-semibold transition-colors hover:text-foreground"
                    onClick={() => toggleSort(field)}
                  >
                    {label}
                    <SortIcon field={field} />
                  </button>
                </TableHead>
              ))}

              <TableHead className="font-display text-right font-semibold">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sorted.map((item) => (
              <TableRow key={item.id} className="group">
                <TableCell className="font-medium">{item.name}</TableCell>

                <TableCell>{item.entrepreneur}</TableCell>

                <TableCell>{item.city}</TableCell>

                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {item.segment}
                  </Badge>
                </TableCell>

                <TableCell>
                  <span className="text-normal flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    {item.email}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-normal flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    {item.phone}
                  </span>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      item.status === "Ativo"
                        ? "bg-primary/10 text-primary focus-visible:ring-primary/20 dark:bg-primary/20 dark:text-primary dark:focus-visible:ring-primary/40 [a]:hover:bg-primary/20"
                        : "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item)}
                      aria-label="Excluir"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
