import { Building2, CheckCircle2, XCircle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Enterprise } from "@/types/enterprise"

type EnterpriseStatsProps = {
  data: Array<Enterprise>
}

export function EnterpriseStats({ data }: EnterpriseStatsProps) {
  const total = data.length
  const actives = data.filter((d) => d.status === "Ativo").length
  const inactives = data.filter((d) => d.status === "Inativo").length
  const segments = new Set(data.map((d) => d.segment)).size

  const stats = [
    { label: "Total", value: total, icon: Building2, color: "text-foreground" },
    {
      label: "Ativos",
      value: actives,
      icon: CheckCircle2,
      color: "text-primary",
    },
    {
      label: "Inativos",
      value: inactives,
      icon: XCircle,
      color: "text-destructive",
    },
    {
      label: "Segmentos",
      value: segments,
      icon: TrendingUp,
      color: "text-foreground",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="animate-fade-in p-0">
          <CardContent className="flex items-center gap-4 py-4">
            <div className={`rounded-lg bg-muted p-4 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="flex w-full flex-col items-end">
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
