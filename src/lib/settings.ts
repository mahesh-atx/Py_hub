export interface IdeSettings {
  theme: string;
  fontSize: number;
  tabSize: number;
  minimap: boolean;
  wordWrap: boolean;
  clearOnRun: boolean;
  timeoutMs: number;
}

export const DEFAULT_SETTINGS: IdeSettings = {
  theme: "vs-dark",
  fontSize: 14,
  tabSize: 4,
  minimap: true,
  wordWrap: false,
  clearOnRun: false,
  timeoutMs: 10000,
};
