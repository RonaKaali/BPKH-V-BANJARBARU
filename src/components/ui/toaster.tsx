"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts, removeToast } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, message, type }) {
        return (
          <Toast key={id} variant={type === 'error' ? 'destructive' : 'default'}>
            <div className="grid gap-1">
              <ToastTitle>{message}</ToastTitle>
            </div>
            <ToastClose onClick={() => removeToast(id)} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
