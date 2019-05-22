import * as Lint from 'tslint';
import * as ts from 'typescript';
import { isClass } from './utils/isClass';
import { isClassProperty } from './utils/isClassProperty';
import { containsWord } from './utils/containsWord';


const ALLOW_CLASS_NAME = 'allow-class-name';
const ALLOW_CLASS_PROPERTIES = 'allow-class-properties';

interface NoDataInClassOptions {
  allowClassProperties: boolean;
  allowClassName: boolean;
}

export class Rule extends Lint.Rules.AbstractRule {
  static readonly FAILURE_STRING = 'The word \"data\" is not allowed';
  static readonly DISALLOWED_WORD = 'data';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction<NoDataInClassOptions>(sourceFile, walk, {
      allowClassName: this.ruleArguments.includes(ALLOW_CLASS_NAME),
      allowClassProperties: this.ruleArguments.includes(ALLOW_CLASS_PROPERTIES),
    });
  }
}

function walk(context: Lint.WalkContext<NoDataInClassOptions>) {
  ts.forEachChild(context.sourceFile, recur);

  function recur(node: ts.Node) {
    if (!context.options.allowClassName && isClass(node)) {
      validateClassName(node as ts.ClassDeclaration, context);
    }

    if (!context.options.allowClassProperties && isClassProperty(node)) {
      validatePropertyName(node as ts.PropertyDeclaration, context);
    }

    ts.forEachChild(node, recur);
  }
}

function validateClassName(classDeclaration: ts.ClassDeclaration, context: Lint.WalkContext<NoDataInClassOptions>): void {
  const classNameNode = classDeclaration.name;
  const className = classNameNode.getText();

  if (containsWord(className, Rule.DISALLOWED_WORD)) {
    context.addFailureAtNode(classNameNode, Rule.FAILURE_STRING);
  }
}

function validatePropertyName(propertyDeclaration: ts.PropertyDeclaration, context: Lint.WalkContext<NoDataInClassOptions>): void {
  const propertyNameNode = propertyDeclaration.name;
  const propertyName = propertyNameNode.getText();

  if (containsWord(propertyName, Rule.DISALLOWED_WORD)) {
    context.addFailureAtNode(propertyNameNode, Rule.FAILURE_STRING);
  }
}
