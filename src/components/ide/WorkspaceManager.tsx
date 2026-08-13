import { useState, useRef, useEffect } from "react";
import { Plus, Check, FolderKanban, Trash2, Pencil } from "lucide-react";

interface WorkspaceManagerProps {
  workspaces: { id: string; name: string }[];
  currentWorkspaceId: string;
  onSwitchWorkspace: (id: string) => void;
  onCreateWorkspace: (name: string) => void;
  onDeleteWorkspace?: (id: string) => void;
  onRenameWorkspace?: (id: string, name: string) => void;
}

export function WorkspaceManager({
  workspaces,
  currentWorkspaceId,
  onSwitchWorkspace,
  onCreateWorkspace,
  onDeleteWorkspace = () => {},
  onRenameWorkspace = () => {},
}: WorkspaceManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateWorkspace(newName.trim());
      setNewName("");
      setIsCreating(false);
    }
  };

  const handleRenameSubmit = (id: string) => {
    if (editName.trim()) {
      onRenameWorkspace(id, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto px-2 py-3">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            className={`group flex w-full flex-col border border-transparent transition-colors ${
              ws.id === currentWorkspaceId ? "bg-[var(--vscode-hover)] text-[var(--vscode-text)] border-[var(--vscode-border)]" : "hover:bg-[var(--vscode-hover)] text-[var(--vscode-text)]"
            }`}
          >
            {deleteConfirmId === ws.id ? (
              <div className="flex flex-col gap-2 p-2 bg-rose-500/10">
                <span className="text-xs text-rose-200">Delete &quot;{ws.name}&quot;?</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteWorkspace(ws.id);
                      setDeleteConfirmId(null);
                    }}
                    className="flex-1 rounded bg-rose-600 py-1 text-xs font-medium text-white hover:bg-rose-500 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(null);
                    }}
                    className="flex-1 rounded bg-slate-700 py-1 text-xs font-medium text-white hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="flex items-center justify-between px-2 py-1 min-h-[28px] cursor-pointer"
                onClick={() => {
                  if (editingId !== ws.id) onSwitchWorkspace(ws.id);
                }}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FolderKanban className={`h-4 w-4 shrink-0 ${ws.id === currentWorkspaceId ? "text-[var(--vscode-text)]" : "text-[var(--vscode-text-muted)]"}`} />
                  {editingId === ws.id ? (
                    <input
                      ref={editInputRef}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => handleRenameSubmit(ws.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameSubmit(ws.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      className="w-full bg-[var(--vscode-input-background)] text-xs text-[var(--vscode-input-foreground)] px-1.5 py-0.5 rounded outline-none border border-[var(--vscode-focusBorder)] focus:ring-1 focus:ring-[var(--vscode-focusBorder)] transition-all"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className={`truncate text-xs tracking-wide ${ws.id === currentWorkspaceId ? "text-[var(--vscode-text)] font-semibold" : "text-[var(--vscode-text-muted)]"}`}>
                      {ws.name}
                    </span>
                  )}
                </div>
                
                {!editingId && (
                  <div className="flex items-center shrink-0 ml-2">
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 mr-1 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(ws.id);
                          setEditName(ws.name);
                        }}
                        className="p-1 rounded text-[var(--vscode-icon-foreground)] hover:bg-[var(--vscode-toolbar-hoverBackground)] hover:text-[var(--vscode-toolbar-hoverOutline)] transition-colors"
                        title="Rename"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      {workspaces.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(ws.id);
                          }}
                          className="p-1 rounded text-[var(--vscode-icon-foreground)] hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    {ws.id === currentWorkspaceId && (
                      <Check className="h-3.5 w-3.5 text-[var(--vscode-text)] shrink-0 shadow-sm" strokeWidth={3} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
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
