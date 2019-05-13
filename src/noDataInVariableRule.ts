import * as Lint from 'tslint';
import * as ts from 'typescript';
import { isVariable } from './utils/isVariable';


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
    if (isVariable(node)) {
      const variableNameNode = node.getFirstToken(context.sourceFile);
      const variableName = variableNameNode.getFullText(context.sourceFile);

      if (variableName.toLowerCase().includes(Rule.DISALLOWED_WORD)) {
        context.addFailureAtNode(variableNameNode, Rule.FAILURE_STRING);
      }
    }

    ts.forEachChild(node, recur);
  }
}


