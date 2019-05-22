import * as ts from 'typescript';

export function isClassProperty(node: ts.Node): boolean {
    return (node.kind === ts.SyntaxKind.PropertyDeclaration) && ((node as ts.PropertyDeclaration).name != null);
}
