export interface IdeSettings {
  theme: string;
  uiFont: string;
  editorFont: string;
  iconStyle: string;
  fontSize: number;
  tabSize: number;
  minimap: boolean;
  wordWrap: boolean;
  clearOnRun: boolean;
  timeoutMs: number;
}

export const DEFAULT_SETTINGS: IdeSettings = {
  theme: "pylab-accessible-dark",
  uiFont: "system",
  editorFont: "system",
  iconStyle: "lucide",
  fontSize: 14,
  tabSize: 4,
  minimap: true,
  wordWrap: false,
  clearOnRun: false,
  timeoutMs: 10000,
};
