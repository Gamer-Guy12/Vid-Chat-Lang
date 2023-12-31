import { Environment } from "./Environment";
import { BinaryExpr, NodeType, NumericLiteral, Operator, Stmt, Identifier, VariableDecleration, AssignmentExpr, Program, StringLiteral, FunctionCallExpr, ReturnStmt, UnaryExpr, ArrayValExpr, IfStmt, WhileStmt, ArrayDecleration, ObjectDecleration, ObjectValExpr, FunctionRef } from "./IAST";
import { ArrayValue, BooleanValue, FuncRefValue, NullValue, NumberValue, ObjectValue, RuntimeVal, StringValue } from "./Runtime";
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
        evaluate(stmt, env)
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
        case NodeType.IfStmt:
            let ifEnv = new Environment(env)
            let ifstmt = stmt as IfStmt
            return evaluate_if(ifstmt, ifEnv)
        case NodeType.WhileStmt:
            let whileStmt = stmt as WhileStmt
            return evaluate_while(whileStmt, env)
        case NodeType.ArrayValExpr:
            let arr = stmt as ArrayValExpr
            return evaluate_array(arr, env)
        case NodeType.ArrayDecleration:
            let array = stmt as ArrayDecleration
            return env.defineVar(array.selector, { type: "array", constant: false, value: [] } as ArrayValue)
        case NodeType.ObjectDecleration:
            let obj = stmt as ObjectDecleration
            return env.defineVar(obj.selector, { type: "object", constant: false, value: [] } as ObjectValue)
        case NodeType.ObjectValExpr:
            let object = stmt as ObjectValExpr
            return evaluate_object(object, env)
        case NodeType.FunctionRef:
            let fref = stmt as FunctionRef
            return { type: "funcref", value: fref.func } as FuncRefValue
        default:
            throw "Invalid Statement"
    }
}

export function evaluate_object(object: ObjectValExpr, env: Environment): RuntimeVal {
    let obj = env.findVar(object.selector) as ObjectValue
    let val: RuntimeVal = { type: "null", value: "null" } as NullValue

    obj.value.forEach((value) => {
        if (value.key === object.element) {
            val = value.value
        }
    })

    return val
}

export function evaluate_array(arr: ArrayValExpr, env: Environment): RuntimeVal {
    return env.findVar(arr.name).value[arr.index]
}

export function evaluate_while(whileStmt: WhileStmt, env: Environment): RuntimeVal {
    let whileEnv = new Environment(env)
    let condition = evaluate(whileStmt.condition, whileEnv) as BooleanValue

    if (condition.value === true) {
        runBlock(whileStmt.code, whileEnv)

        return evaluate_while(whileStmt, whileEnv)
    }

    return { type: "null", value: "null" } as NullValue
}

export function evaluate_if(ifstmt: IfStmt, env: Environment): RuntimeVal {
    let condition = evaluate(ifstmt.condition, env) as BooleanValue

    if (condition.value === true) {
        return runBlock(ifstmt.code, env)
    }

    return { type: "null", value: "null" } as NullValue
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

    if (expr.operator === "==") {
        if (lhs.value === rhs.value) {
            return { type: "boolean", value: true, constant: false } as BooleanValue
        }
        else {
            return { type: "boolean", value: false, constant: false } as BooleanValue
        }
    }
    else if (expr.operator === "!=") {
        if (lhs.value !== rhs.value) {
            return { type: "boolean", value: true, constant: false } as BooleanValue
        }
        else {
            return { type: "boolean", value: false, constant: false } as BooleanValue
        }
    }
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

export function evaluate_num_bin_expr(lhs: NumberValue, rhs: NumberValue, operator: Operator): RuntimeVal {
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
        case "<":
            return { type: "boolean", constant: false, value: lhs.value < rhs.value } as BooleanValue
        case ">":
            return { type: "boolean", constant: false, value: lhs.value > rhs.value } as BooleanValue
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
            std?.execute(params, env)
        }
    }

    func.params.forEach((value) => {
        funcEnv.defineVar(value.name, evaluate(value.value, env))
    })

    return runBlock(callable, funcEnv)
}