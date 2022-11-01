declare module "react-syntax-highlighter" {
  import { ReactNode } from "react";
  export interface SyntaxHighlighterProps {
    language: string;
    style: any;
  }
  export class SyntaxHighlighter extends ReactNode<SyntaxHighlighterProps> {}
}
