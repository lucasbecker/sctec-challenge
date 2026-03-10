import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"

type EnterpriseHeaderProps = {
  onAdd: () => void
}
export function EnterpriseHeader({ onAdd }: EnterpriseHeaderProps) {
  return (
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

          <Button onClick={onAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Empreendimento
          </Button>
        </div>
      </div>
    </header>
  )
}
