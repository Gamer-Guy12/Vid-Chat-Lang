export enum NodeType {
    NumericLiteral,
    Program,
    BinaryExpr,
    Identifier,
    VariableDecleration,
    AssignmentExpr,
    StringLiteral
}

export interface Stmt {
    kind: NodeType
}

export interface Program extends Stmt {
    kind: NodeType.Program,
    code: Stmt[]
}

export interface Expr extends Stmt {}

export type Operator = "+" | "-" | "*" | "/" | "%" | "^"

export interface BinaryExpr extends Expr {
    kind: NodeType.BinaryExpr
    left: Expr,
    right: Expr,
    operator: Operator
}

export interface NumericLiteral extends Expr {
    kind: NodeType.NumericLiteral,
    value: number
}

export interface Identifier extends Expr {
    kind: NodeType.Identifier,
    selector: string
}

export interface VariableDecleration extends Stmt {
    kind: NodeType.VariableDecleration,
    selector: string,
    constant: boolean
}

export interface AssignmentExpr extends Expr {
    kind: NodeType.AssignmentExpr,
    selector: string,
    value: Expr
}

export interface StringLiteral extends Expr {
    kind: NodeType.StringLiteral,
    value: string
}