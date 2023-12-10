import { Environment } from "./Environment";
import { BinaryExpr, NodeType, NumericLiteral, Program, Identifier, AssignmentExpr, VariableDecleration, StringLiteral } from "./IAST";
import { evaluate, runProgram } from "./Run";
import { BooleanValue, NullValue, NumberValue } from "./Runtime";

const ast: Program = {
    kind: NodeType.Program,
    code: [
        {
            kind: NodeType.VariableDecleration,
            selector: "y",
            constant: false
        } as VariableDecleration,
        {
            kind: NodeType.AssignmentExpr,
            selector: "y",
            value: {
                kind: NodeType.StringLiteral,
                value: "Hello"
            } as StringLiteral
        } as AssignmentExpr,
        {
            kind: NodeType.AssignmentExpr,
            selector: "y",
            value: {
                kind: NodeType.BinaryExpr,
                operator: "+",
                left: {
                    kind: NodeType.Identifier,
                    selector: "y"
                } as Identifier,
                right: {
                    kind: NodeType.StringLiteral,
                    value: " There"
                } as StringLiteral
            } as BinaryExpr
        } as AssignmentExpr,
        {
            kind: NodeType.VariableDecleration,
            selector: "x",
            constant: false
        } as VariableDecleration,
        {
            kind: NodeType.AssignmentExpr,
            selector: "x",
            value: { kind: NodeType.NumericLiteral, value: 10 } as NumericLiteral
        } as AssignmentExpr,
        {
            kind: NodeType.BinaryExpr,
            left: { 
                operator: "+",
                left: { kind: NodeType.NumericLiteral, value: 2 } as NumericLiteral,
                right: { kind: NodeType.AssignmentExpr, value: {
                    kind: NodeType.NumericLiteral,
                    value: 3
                } as NumericLiteral, selector: "x" } as AssignmentExpr,
                kind: NodeType.BinaryExpr
            } as BinaryExpr,
            right: { kind: NodeType.Identifier, selector: "x" } as Identifier,
            operator: "^"
        } as BinaryExpr
    ]
}

const globalEnv = new Environment()

globalEnv.defineVar("null", { type: "null", value: "null", constant: true } as NullValue)
globalEnv.defineVar("true", { type: "boolean", value: true, constant: true } as BooleanValue)
globalEnv.defineVar("false", { type: "boolean", value: false, constant: true } as BooleanValue)

runProgram(ast, globalEnv)