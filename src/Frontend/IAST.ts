export enum NodeType {
    NumericLiteral,
    Program,
    BinaryExpr,
    Identifier,
    VariableDecleration,
    AssignmentExpr,
    StringLiteral,
    FunctionCallExpr,
    ReturnStmt,
    UnaryExpr,
    ArrayValExpr,
    IfStmt,
    WhileStmt,
    ArrayDecleration,
    ObjectDecleration,
    ObjectValExpr,
    FunctionRef
}

export interface Stmt {
    kind: NodeType
}

export interface Program extends Stmt {
    kind: NodeType.Program,
    functions: { name: string, func: FunctionDecl }[],
    code: Stmt[]
}

export interface Expr extends Stmt {}

export type Operator = "+" | "-" | "*" | "/" | "%" | "^" | "==" | "!=" | "<" | ">" | "!"

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
    selector: Expr,
    value: Expr
}

export interface StringLiteral extends Expr {
    kind: NodeType.StringLiteral,
    value: string
}

export interface FunctionDecl {
    params: string[]
    code: Stmt[]
}

export interface FunctionCallExpr extends Expr {
    kind: NodeType.FunctionCallExpr,
    name: string,
    params: { name: string, value: Expr }[]
}

export interface ReturnStmt extends Stmt {
    kind: NodeType.ReturnStmt,
    value: Expr
}

export type UnaryOperator = "++" | "--" | "!"

export interface UnaryExpr extends Expr {
    kind: NodeType.UnaryExpr
    expr: Expr,
    operator: UnaryOperator
}

export interface ArrayValExpr extends Expr {
    kind: NodeType.ArrayValExpr,
    name: string,
    index: number
}

export interface IfStmt extends Stmt {
    kind: NodeType.IfStmt,
    condition: Expr,
    code: Stmt[]
}

export interface WhileStmt extends Stmt {
    kind: NodeType.WhileStmt
    condition: Expr
    code: Stmt[]
}

export interface ArrayDecleration extends Stmt {
    kind: NodeType.ArrayDecleration,
    selector: string
}

export interface ObjectDecleration extends Stmt {
    kind: NodeType.ObjectDecleration,
    selector: string
}

export interface ObjectValExpr extends Expr {
    kind: NodeType.ObjectValExpr,
    selector: string,
    element: string
}

export interface FunctionRef extends Expr {
    kind: NodeType.FunctionRef,
    func: FunctionCallExpr
}
