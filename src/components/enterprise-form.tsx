import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { Enterprise } from "@/types/enterprise"
import { SEGMENTS } from "@/constants/segments"
import { STATUS } from "@/constants/status"

interface EnterpriseFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Enterprise | null
  onSave: (data: Omit<Enterprise, "id" | "createdAt" | "updatedAt">) => void
}

const EMPTY_FORM: Enterprise = {
  id: "",
  name: "",
  entrepreneur: "",
  city: "",
  segment: "Tecnologia",
  email: "",
  phone: "",
  status: "Ativo",
  document: "",
  description: "",
  createdAt: "",
  updatedAt: "",
}

export function EnterpriseForm({
  open,
  onOpenChange,
  data,
  onSave,
}: EnterpriseFormProps) {
  const [form, setForm] = useState<Enterprise>(EMPTY_FORM)
  const isEditing = !!data

  useEffect(() => {
    if (data) {
      setForm({
        id: data.id,
        name: data.name,
        entrepreneur: data.entrepreneur,
        city: data.city,
        segment: data.segment,
        email: data.email,
        status: data.status,
        phone: data.phone,
        document: data.document || "",
        description: data.description || "",
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [data, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !form.name ||
      !form.entrepreneur ||
      !form.city ||
      !form.segment ||
      !form.email ||
      !form.phone
    ) {
      toast.error("Preencha todos os campos obrigatórios.")
      return
    }
    onSave(form)
    onOpenChange(false)
  }

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-lg">
        <SheetHeader className="p-4">
          <SheetTitle className="font-display text-xl">
            {isEditing ? "Editar Empreendimento" : "Novo Empreendimento"}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Atualize as informações do empreendimento."
              : "Cadastre um novo empreendimento catarinense."}
          </SheetDescription>
        </SheetHeader>
        <hr />

        <div className="no-scrollbar overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5 p-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Empreendimento *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ex: Tech Solutions SC"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entrepreneur">
                Empreendedor(a) Responsável *
              </Label>
              <Input
                id="entrepreneur"
                value={form.entrepreneur}
                onChange={(e) => update("entrepreneur", e.target.value)}
                placeholder="Nome completo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Município *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Criciúma"
                />
              </div>
              <div className="space-y-2">
                <Label>Segmento *</Label>
                <Select
                  value={form.segment}
                  onValueChange={(v) => update("segment", v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEGMENTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone*</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(48) 9 8888-8888"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select
                value={form.status}
                onValueChange={(v) => update("status", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={form.document}
                onChange={(e) => update("document", e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Breve descrição do empreendimento..."
                rows={3}
              />
            </div>
          </form>
        </div>

        <hr />

        <SheetFooter className="p-4">
          <Button type="submit" onClick={handleSubmit}>
            {isEditing ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
