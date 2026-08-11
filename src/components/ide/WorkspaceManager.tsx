import { useState } from "react";
import { Plus, Check, FolderKanban } from "lucide-react";

interface WorkspaceManagerProps {
  workspaces: { id: string; name: string }[];
  currentWorkspaceId: string;
  onSwitchWorkspace: (id: string) => void;
  onCreateWorkspace: (name: string) => void;
}

export function WorkspaceManager({
  workspaces,
  currentWorkspaceId,
  onSwitchWorkspace,
  onCreateWorkspace,
}: WorkspaceManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateWorkspace(newName.trim());
      setNewName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto px-2 py-3">
        {workspaces.map((ws) => (
          <button
            key={ws.id}
            onClick={() => onSwitchWorkspace(ws.id)}
            className={`flex w-full items-center justify-between rounded px-2 py-2 text-left hover:bg-white/5 ${
              ws.id === currentWorkspaceId ? "bg-white/5" : ""
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <FolderKanban className="h-4 w-4 shrink-0 text-slate-500" />
              <span className={`truncate text-xs ${ws.id === currentWorkspaceId ? "text-sky-400 font-medium" : "text-slate-300"}`}>
                {ws.name}
              </span>
            </div>
            {ws.id === currentWorkspaceId && (
              <Check className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-[var(--vscode-input)] p-3">
        {isCreating ? (
          <div className="flex flex-col gap-2">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
                if (e.key === "Escape") setIsCreating(false);
              }}
              placeholder="Workspace name..."
              className="w-full rounded border border-[var(--vscode-input)] bg-[var(--vscode-bg)] px-2 py-1.5 text-xs text-slate-200 outline-none focus:border-sky-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="flex-1 rounded bg-sky-600 py-1 text-xs font-medium text-white hover:bg-sky-500"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 rounded bg-[var(--vscode-hover)] py-1 text-xs font-medium text-white hover:bg-[#444444]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="flex w-full items-center justify-center gap-1.5 rounded border border-[var(--vscode-input)] bg-transparent py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5"
          >
            <Plus className="h-3.5 w-3.5" /> New Workspace
          </button>
        )}
      </div>
    </div>
  );
}
