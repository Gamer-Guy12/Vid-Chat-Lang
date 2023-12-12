import { NodeType, NumericLiteral, BinaryExpr, UnaryExpr, ReturnStmt, ArrayDecleration, ArrayValExpr, StringLiteral, AssignmentExpr, FunctionCallExpr, VariableDecleration, WhileStmt, IfStmt, Program, Identifier, ObjectDecleration, ObjectValExpr } from "./Frontend/IAST";

export const ast: Program = {
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
            kind: NodeType.ObjectDecleration,
            selector: "obj",
            constant: false
        } as ObjectDecleration,
        {
            kind: NodeType.AssignmentExpr,
            selector: {
                kind: NodeType.ObjectValExpr,
                element: "obj",
                selector: "obj"
            } as ObjectValExpr,
            value: { kind: NodeType.StringLiteral, value: "Hello Object" } as StringLiteral
        } as AssignmentExpr,
        {
            kind: NodeType.FunctionCallExpr,
            name: "println",
            params: [
                {
                    name: "val",
                    value: {
                        kind: NodeType.ObjectValExpr,
                        selector: "obj",
                        element: "obj"
                    } as ObjectValExpr
                }
            ]
        } as FunctionCallExpr,
        {
            kind: NodeType.ArrayDecleration,
            selector: "arr",
            constant: false
        } as ArrayDecleration,
        {
            kind: NodeType.AssignmentExpr,
            selector: {
                kind: NodeType.ArrayValExpr,
                index: 0,
                name: "arr"
            } as ArrayValExpr,
            value: { kind: NodeType.StringLiteral, value: "Hello Array" } as StringLiteral
        } as AssignmentExpr,
        {
            kind: NodeType.FunctionCallExpr,
            name: "println",
            params: [
                {
                    name: "val",
                    value: {
                        kind: NodeType.ArrayValExpr,
                        index: 0,
                        name: "arr"
                    } as ArrayValExpr
                }
            ]
        } as FunctionCallExpr,
        {
            kind: NodeType.VariableDecleration,
            selector: "whiles",
            constant: false
        } as VariableDecleration,
        {
            kind: NodeType.AssignmentExpr,
            selector: {
                kind: NodeType.Identifier,
                selector: "whiles"
            } as Identifier,
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
                    selector: {
                        kind: NodeType.Identifier,
                        selector: "whiles"
                    } as Identifier,
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
            selector: {
                kind: NodeType.Identifier,
                selector: "y"
            } as Identifier,
            value: {
                kind: NodeType.StringLiteral,
                value: "Hello"
            } as StringLiteral
        } as AssignmentExpr,
        {
            kind: NodeType.AssignmentExpr,
            selector: {
                kind: NodeType.Identifier,
                selector: "y"
            } as Identifier,
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
            selector: {
                kind: NodeType.Identifier,
                selector: "x"
            } as Identifier,
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
                } as NumericLiteral, selector: {
                    kind: NodeType.Identifier,
                    selector: "x"
                } as Identifier } as AssignmentExpr,
                kind: NodeType.BinaryExpr
            } as BinaryExpr,
            right: { kind: NodeType.Identifier, selector: "x" } as Identifier,
            operator: "^"
        } as BinaryExpr
    ]
}