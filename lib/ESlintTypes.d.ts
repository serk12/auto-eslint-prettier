export interface LintMessage {
  column: number;
  line: number;
  endColumn?: number | undefined;
  endLine?: number | undefined;
  ruleId: string | null;
  message: string;
  messageId?: string | undefined;
  nodeType?: string | undefined;
  fatal?: true | undefined;
  // severity: Severity;
  // fix?: Rule.Fix | undefined;
  /** @deprecated Use `linter.getSourceCode()` */
  source?: string | null | undefined;
  // suggestions?: LintSuggestion[] | undefined;
}

export interface LintResult {
  filePath: string;
  messages: LintMessage[];
  // suppressedMessages: Linter.SuppressedLintMessage[];
  errorCount: number;
  fatalErrorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  output?: string | undefined;
  source?: string | undefined;
  // usedDeprecatedRules: DeprecatedRuleUse[];
}
