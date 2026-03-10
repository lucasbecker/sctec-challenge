import { Filter, Search } from "lucide-react"

import type { useEnterprise } from "@/hooks/use-enterprise"
import { SEGMENTS } from "@/constants/segments"
import { STATUS } from "@/constants/status"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type EnterpriseFiltersProps = {
  filters: ReturnType<typeof useEnterprise>["filters"]
}

export function EnterpriseFilters({ filters }: EnterpriseFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <div className="relative col-span-2 flex-1 sm:col-span-3">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => filters.setSearch(e.target.value)}
          className="pl-10"
          placeholder="Buscar por nome, empreendedor, cidade ou contato..."
        />
      </div>

      <Select value={filters.segment} onValueChange={filters.setSegment}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Segmento" />
        </SelectTrigger>
        <SelectContent>
          {SEGMENTS.map((segment) => (
            <SelectItem key={segment} value={segment}>
              {segment}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={filters.setStatus}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={filters.clearFilters}
        disabled={!filters.hasFilters}
        className="col-span-2 w-full gap-1 sm:col-span-1"
      >
        <Filter className="h-3.5 w-3.5" />
        Limpar
      </Button>
    </div>
  )
}
