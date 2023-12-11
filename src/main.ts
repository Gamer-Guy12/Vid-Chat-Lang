import { Environment } from "./Frontend/Environment";
import { BinaryExpr, NodeType, NumericLiteral, Program, Identifier, AssignmentExpr, VariableDecleration, StringLiteral, FunctionCallExpr, ReturnStmt, UnaryExpr, IfStmt, WhileStmt } from "./Frontend/IAST";
import { evaluate, runProgram } from "./Frontend/Run";
import { BooleanValue, NullValue, NumberValue } from "./Frontend/Runtime";

// TODO: finish arrays
const ast: Program = {
    kind: NodeType.Program,
    functions: [
        {
            name: "test",
            func: {
                params: ["z"],
                code: [
                    {
                        kind: NodeType.BinaryExpr,
                        left: { 
                            operator: "+",
                            left: { kind: NodeType.NumericLiteral, value: 2 } as NumericLiteral,
                            right: { kind: NodeType.NumericLiteral, value: 4 } as NumericLiteral,
                            kind: NodeType.BinaryExpr
                        } as BinaryExpr,
                        right: { kind: NodeType.NumericLiteral, value: 3 } as NumericLiteral,
                        operator: "^"
                    } as BinaryExpr,
                    {
                        kind: NodeType.ReturnStmt,
                        value: {
                            kind: NodeType.UnaryExpr,
                            expr: { kind: NodeType.Identifier, selector: "z" } as Identifier,
                            operator: "++"
                        } as UnaryExpr
                    } as ReturnStmt
                ]
            }
        }
    ],
    code: [
        {
            kind: NodeType.VariableDecleration,
            selector: "whiles",
            constant: false
        } as VariableDecleration,
        {
            kind: NodeType.AssignmentExpr,
            selector: "whiles",
            value: { kind: NodeType.NumericLiteral, value: 5 } as NumericLiteral
        } as AssignmentExpr,
        {
            kind: NodeType.WhileStmt,
            condition: {
                kind: NodeType.BinaryExpr,
                left: { kind: NodeType.Identifier, selector: "whiles" } as Identifier,
                right: { kind: NodeType.NumericLiteral, value: 0 } as NumericLiteral,
                operator: ">"
            } as BinaryExpr,
            code: [
                {
                    kind: NodeType.FunctionCallExpr,
                    name: "println",
                    params: [
                        {
                            name: "val",
                            value: {
                                kind: NodeType.StringLiteral,
                                value: "Hello from while loop"
                            } as StringLiteral
                        }
                    ]
                } as FunctionCallExpr,
                {
                    kind: NodeType.AssignmentExpr,
                    selector: "whiles",
                    value: 
                    {
                        kind: NodeType.BinaryExpr,
                        left: {
                            kind: NodeType.Identifier,
                            selector: "whiles"
                        } as Identifier,
                        right: {
                            kind: NodeType.NumericLiteral,
                            value: 1
                        } as NumericLiteral,
                        operator: "-"
                    } as BinaryExpr
                } as AssignmentExpr
            ]
        } as WhileStmt,
        {
            kind: NodeType.IfStmt,
            condition: { kind: NodeType.Identifier, selector: "true" } as Identifier,
            code: [
                {
                    kind: NodeType.FunctionCallExpr,
                    name: "println",
                    params: [
                        {
                            name: "val",
                            value: {
                                kind: NodeType.StringLiteral,
                                value: "Hello World from if"
                            } as StringLiteral
                        }
                    ]
                } as FunctionCallExpr
            ]
        } as IfStmt,
        {
            kind: NodeType.FunctionCallExpr,
            name: "println",
            params: [
                {
                    name: "val",
                    value: {
                        kind: NodeType.StringLiteral,
                        value: "Hello World"
                    } as StringLiteral
                }
            ]
        } as FunctionCallExpr,
        {
            kind: NodeType.BinaryExpr,
            operator: "^",
            left: { kind: NodeType.NumericLiteral, value: 10 } as NumericLiteral,
            right: {
                kind: NodeType.FunctionCallExpr,
                name: "test",
                params: [{ name: "z", value: { kind: NodeType.NumericLiteral, value: 3 } as NumericLiteral }]
            } as FunctionCallExpr
        } as BinaryExpr,
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