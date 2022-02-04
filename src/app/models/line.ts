import { Token } from "./token";

export interface Line {
  indentations: number;
  tokens: Token[];
}