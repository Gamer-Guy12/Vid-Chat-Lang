export enum NodeType {
    Identifier,
    BinaryExpression,
    NumericLiteral,
    StringLiteral,
    BoolLiteral,
    NullLiteral,
    Program
}

export interface Stmt {
    kind: NodeType
}

export interface Program extends Stmt {
    kind: NodeType.Program,
    code: Stmt[]
}

export interface Expr extends Stmt {}

export interface BinaryExpr extends Expr {
    kind: NodeType.BinaryExpression,
    left: Expr,
    right: Expr,
    operator: string
}

export interface Identifier extends Expr {
    kind: NodeType.Identifier,
    name: string
}

export interface NumericLiteral extends Expr {
    kind: NodeType.NumericLiteral,
    value: number
}


export interface StringLiteral extends Expr {
    kind: NodeType.StringLiteral,
    value: string
}


export interface BoolLiteral extends Expr {
    kind: NodeType.BoolLiteral,
    value: boolean
}


export interface NullLiteral extends Expr {
    kind: NodeType.NullLiteral,
    value: "null"
}