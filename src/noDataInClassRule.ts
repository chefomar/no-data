import * as Lint from 'tslint';
import * as ts from 'typescript';
import { isClass } from './utils/isClass';

export class Rule extends Lint.Rules.AbstractRule {
  static readonly FAILURE_STRING = 'The word \"data\" is not allowed';
  static readonly DISALLOWED_WORD = 'data';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk);
  }
}

function walk(context: Lint.WalkContext) {
  ts.forEachChild(context.sourceFile, recur);

  function recur(node: ts.Node) {
    if (isClass(node)) {
      const classNameNode = (node as ts.ClassDeclaration).name;
      const className = classNameNode.getText();

      if (className.toLowerCase().includes(Rule.DISALLOWED_WORD)) {
        context.addFailureAtNode(classNameNode, Rule.FAILURE_STRING);
      }
    }

    ts.forEachChild(node, recur);
  }
}


