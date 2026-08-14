export interface PlotExpectation {
  minAxes?: number;
  minLines?: number;
  minBars?: number;
  minCollections?: number;
  minImages?: number;
  title?: string;
  titles?: string[];
  figureTitle?: string;
  xlabel?: string;
  ylabel?: string;
  legend?: boolean;
}

export interface OutputTestCase {
  type?: "output";
  input?: string | string[];
  output?: string;
  expected_output?: string;
  visible?: boolean;
  match?: "contains";
  contains?: string[];
  plot?: PlotExpectation;
}

export interface SourceTestCase {
  type: "ast";
  pattern: string;
  hint?: string;
}

export interface QualityTestCase {
  type: "quality";
  minStatements: number;
  requiredNodeTypes?: string[];
  requiredImports?: string[];
  requiredCalls?: string[];
  requiredDefinitions?: string[];
  hint?: string;
}

export type PracticeTestCase = OutputTestCase | SourceTestCase | QualityTestCase;

export interface PracticeTestRecord {
  id?: number;
  question_id?: number;
  tests?: PracticeTestCase[];
}

export interface PracticeTestsDocument {
  questions?: PracticeTestRecord[];
}

export interface Challenge {
  id: string;
  title: string;
  markdown: string;
  solution: string | null;
  tests: PracticeTestCase[];
  difficulty?: string;
  objective?: string;
  hintText?: string;
  explanation?: string;
}

export interface ManifestFile {
  id: string;
  title: string;
  type: "markdown" | "practice";
  total?: number;
}

export interface ManifestBatch {
  id: string;
  title: string;
  path: string;
  topic?: string;
  files: ManifestFile[];
}

export interface PracticeManifest {
  batches: ManifestBatch[];
}

export interface SourceAnalysis {
  syntaxValid: boolean;
  statementCount: number;
  nodeCounts: Record<string, number>;
  imports: string[];
  calls: string[];
  definitions: string[];
}

export interface PlotAxesMetadata {
  title: string;
  xlabel: string;
  ylabel: string;
  lines: number;
  bars: number;
  collections: number;
  images: number;
  hasLegend: boolean;
}

export interface PlotMetadata {
  axes: PlotAxesMetadata[];
  figureTitle?: string;
}

export interface CapturedRun {
  stdout: string;
  stderr: string;
  traceback?: string;
  status: number;
  plots?: string[];
  sourceAnalysis?: SourceAnalysis;
  plotMetadata?: PlotMetadata[];
}
