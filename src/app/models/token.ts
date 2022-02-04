export interface Token {
  text: string;
  type?: string | undefined;
  value?: string[] | undefined;
}

export enum TokenType {
  USERVAR = "user-defined-variable",
  OP = "operator",
  NUM = "number",
  KEY = "keyword",
  FUNC = "built-in-function"
}