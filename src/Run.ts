import { BinaryExpr, NodeType, NumericLiteral, Operator, Stmt } from "./IAST";
import { NumberValue, RuntimeVal } from "./Runtime";

export function evaluate (stmt: Stmt): RuntimeVal {
    switch (stmt.kind) {
        case NodeType.NumericLiteral:
            let val = stmt as NumericLiteral
            return { type: "number", value: val.value } as NumberValue
        case NodeType.Program:
            throw "Program cannot be a node inside the ast and should have been handled if it was at the top"
        case NodeType.BinaryExpr:
            return evalBinExp(stmt as BinaryExpr)
        default:
            throw "Invalid Statement"
    }
}

export function evalBinExp (expr: BinaryExpr): RuntimeVal {
    let lhs = evaluate(expr.left)
    let rhs = evaluate(expr.right)

    if (lhs.type === "number" && rhs.type === "number") {
        return evaluate_num_bin_expr(lhs as NumberValue, rhs as NumberValue, expr.operator)
    }

    throw "Cannot evaluate Binary Expression"
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
            return { type: "number", value: lhs.value ^ rhs.value } as NumberValue
        default:
            throw "Invalid Operator"
    }
}