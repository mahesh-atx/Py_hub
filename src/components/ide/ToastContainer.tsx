import { useEffect, useState } from "react";
import { X, Info, AlertTriangle, AlertCircle } from "lucide-react";

export type ToastType = "info" | "warning" | "error";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

let toastId = 0;
type Listener = (toast: ToastMessage) => void;
const listeners = new Set<Listener>();

export const toast = {
  show: (type: ToastType, message: string, action?: { label: string; onClick: () => void }) => {
    const t: ToastMessage = { id: String(++toastId), type, message, action };
    listeners.forEach((l) => l(t));
  },
  info: (message: string, action?: { label: string; onClick: () => void }) => toast.show("info", message, action),
  warn: (message: string, action?: { label: string; onClick: () => void }) => toast.show("warning", message, action),
  error: (message: string, action?: { label: string; onClick: () => void }) => toast.show("error", message, action),
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const l: Listener = (t) => {
      setToasts((prev) => [...prev, t]);
      // Auto-remove after 5s if not error
      if (t.type !== "error") {
        setTimeout(() => {
          setToasts((prev) => prev.filter((x) => x.id !== t.id));
        }, 5000);
      }
    };
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const remove = (id: string) => setToasts((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="fixed bottom-8 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex w-[350px] bg-[var(--vscode-sidebar-bg)] shadow-xl border-l-[3px] border border-[var(--vscode-input)] overflow-hidden"
          style={{
            borderLeftColor: t.type === "error" ? "#f14c4c" : t.type === "warning" ? "#cca700" : "#3794ff"
          }}
        >
          <div className="p-3 flex items-start gap-3 w-full">
            {t.type === "info" && <Info className="h-5 w-5 shrink-0 text-[#3794ff]" strokeWidth={1.5} />}
            {t.type === "warning" && <AlertTriangle className="h-5 w-5 shrink-0 text-[#cca700]" strokeWidth={1.5} />}
            {t.type === "error" && <AlertCircle className="h-5 w-5 shrink-0 text-[#f14c4c]" strokeWidth={1.5} />}
            <div className="flex-1 flex flex-col pt-[1px]">
              <span className="text-sm text-[var(--vscode-text)] leading-snug break-words pr-4">{t.message}</span>
              {t.action && (
                <button
                  onClick={() => { t.action!.onClick(); remove(t.id); }}
                  className="mt-3 self-start rounded bg-sky-600 px-3 py-1 text-xs text-white hover:bg-sky-500"
                >
                  {t.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => remove(t.id)}
              className="absolute top-2 right-2 text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
