import { Environment } from "./Environment";
import { BinaryExpr, NodeType, NumericLiteral, Operator, Stmt, Identifier, VariableDecleration, AssignmentExpr, Program, StringLiteral } from "./IAST";
import { NullValue, NumberValue, RuntimeVal, StringValue } from "./Runtime";

export function runProgram (code: Program, globalEnv: Environment) {
    runBlock(code.code, globalEnv)
}

export function runBlock (code: Stmt[], env: Environment) {
    for (let stmt of code) {
        console.log(evaluate(stmt, env))
    }
}

export function evaluate (stmt: Stmt, env: Environment): RuntimeVal {
    switch (stmt.kind) {
        case NodeType.NumericLiteral:
            let val = stmt as NumericLiteral
            return { type: "number", value: val.value } as NumberValue
        case NodeType.Program:
            throw "Program cannot be a node inside the ast and should have been handled if it was at the top"
        case NodeType.BinaryExpr:
            return evalBinExp(stmt as BinaryExpr, env)
        case NodeType.Identifier:
            let ident = stmt as Identifier
            return env.findVar(ident.selector)
        case NodeType.VariableDecleration:
            let variable = stmt as VariableDecleration
            return env.defineVar(variable.selector, { type: "null", constant: variable.constant, value: "null" } as NullValue)
        case NodeType.AssignmentExpr:
            let expr = stmt as AssignmentExpr
            let value = evaluate(expr.value, env)
            return env.setVar(expr.selector, value)
        case NodeType.StringLiteral:
            let str = stmt as StringLiteral
            return { type: "string", value: str.value } as StringValue
        default:
            throw "Invalid Statement"
    }
}

export function evalBinExp (expr: BinaryExpr, env: Environment): RuntimeVal {
    let lhs = evaluate(expr.left, env)
    let rhs = evaluate(expr.right, env)

    if (lhs.type === "number" && rhs.type === "number") {
        return evaluate_num_bin_expr(lhs as NumberValue, rhs as NumberValue, expr.operator)
    }

    if (lhs.type === "string" && rhs.type === "string") {
        return evaluate_str_bin_expr(lhs as StringValue, rhs as StringValue, expr.operator)
    }

    throw "Cannot evaluate Binary Expression"
}

export function evaluate_str_bin_expr(lhs: StringValue, rhs: StringValue, operator: Operator): StringValue {
    switch (operator) {
        case "+":
            return { type: "string", value: lhs.value + rhs.value } as StringValue
        default:
            throw "Invalid Operator"
    }
}

export function evaluate_num_bin_expr(lhs: NumberValue, rhs: NumberValue, operator: Operator): NumberValue {
    switch (operator) {
        case "+":
            return { type: "number", value: lhs.value + rhs.value } as NumberValue
        case "-":
            return { type: "number", value: lhs.value - rhs.value } as NumberValue
        case "*":
            return { type: "number", value: lhs.value * rhs.value } as NumberValue
        case "/":
            return { type: "number", value: lhs.value / rhs.value } as NumberValue
        case "%":
            return { type: "number", value: lhs.value % rhs.value } as NumberValue
        case "^":
            return { type: "number", value: lhs.value ** rhs.value } as NumberValue
        default:
            throw "Invalid Operator"
    }
}