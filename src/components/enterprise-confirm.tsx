import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Enterprise } from "@/types/enterprise"

interface EnterpriseConfirmProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: Enterprise | null
  onConfirm: () => void
}

export function EnterpriseConfirm({
  open,
  onOpenChange,
  data,
  onConfirm,
}: EnterpriseConfirmProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">
            Confirmar exclusão
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir <strong>{data?.name}</strong>? Esta
            ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost" className="flex-1">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            variant="destructive"
            className="flex-1"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
