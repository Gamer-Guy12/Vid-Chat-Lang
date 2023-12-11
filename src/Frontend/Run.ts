import { Environment } from "./Environment";
import { BinaryExpr, NodeType, NumericLiteral, Operator, Stmt, Identifier, VariableDecleration, AssignmentExpr, Program, StringLiteral, FunctionCallExpr, ReturnStmt, UnaryExpr } from "./IAST";
import { BooleanValue, NullValue, NumberValue, RuntimeVal, StringValue } from "./Runtime";
import { STDs } from "./STD";

let program: Program;

export function runProgram (code: Program, globalEnv: Environment) {
    program = code
    runBlock(code.code, globalEnv)
}

export function runBlock (code: Stmt[], env: Environment): RuntimeVal {
    for (let stmt of code) {
        if (stmt.kind === NodeType.ReturnStmt) {
            let ret = stmt as ReturnStmt
            return evaluate(ret.value, env)
        }
        console.log(evaluate(stmt, env))
    }

    return { type: "null", value: "null" } as NullValue
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
        case NodeType.FunctionCallExpr: 
            let func = stmt as FunctionCallExpr
            return call_func(func, env)
        case NodeType.UnaryExpr:
            let unaryExpr = stmt as UnaryExpr
            return evalUnaryExp(unaryExpr, env)
        default:
            throw "Invalid Statement"
    }
}

export function evalUnaryExp (expr: UnaryExpr, env: Environment): RuntimeVal {
    let val = evaluate(expr.expr, env)

    if (val.type === "number") {
        let num = val as NumberValue

        if (expr.operator === "++") {
            return { value: num.value + 1, constant: false, type: "number" } as NumberValue
        }
        else if (expr.operator === "--") {
            return { value: num.value - 1, constant: false, type: "number" } as NumberValue
        }
        else {
            throw "Invalid Operator"
        }
    }
    else if (val.type === "boolean") {
        let bool = val as BooleanValue

        if (expr.operator === "!") {
            return { type: "boolean", constant: false, value: !bool.value } as BooleanValue
        }

        throw "Invalid Operator"

    }

    throw "Cannot resolve UnaryExpr"
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

export function call_func (func: FunctionCallExpr, env: Environment): RuntimeVal {
    let funcEnv = new Environment(env)

    let callable: Stmt[] = []

    program.functions.forEach((value) => {
        if (value.name === func.name) {
            callable = value.func.code
        }
    })

    if (callable[0] === undefined) {
        let std = STDs.get(func.name)

        if (std !== null) {
            let params = new Map<string, RuntimeVal>()
            func.params.forEach(value => {
                params.set(value.name, evaluate(value.value, env))
            })
            std?.execute(params)
        }
    }

    func.params.forEach((value) => {
        funcEnv.defineVar(value.name, evaluate(value.value, env))
    })

    return runBlock(callable, funcEnv)
}