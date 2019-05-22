import * as ts from 'typescript';

export function isClass(node: ts.Node): boolean {
    return (node.kind === ts.SyntaxKind.ClassDeclaration) && ((node as ts.ClassDeclaration).name != null);
}
