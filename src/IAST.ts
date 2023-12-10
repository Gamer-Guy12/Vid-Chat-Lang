export enum NodeType {
    NumericLiteral,
    Program,
    BinaryExpr,
    Identifier
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