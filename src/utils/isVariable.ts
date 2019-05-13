import * as ts from 'typescript';

export function isVariable(node: ts.Node): boolean {
  return (node.kind === ts.SyntaxKind.VariableDeclaration) && ((node as ts.VariableDeclaration).name != null);
}
