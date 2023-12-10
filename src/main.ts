import { Environment } from "./Environment";
import { BinaryExpr, NodeType, NumericLiteral, Program } from "./IAST";
import { evaluate } from "./Run";
import { BooleanValue, NullValue } from "./Runtime";

const ast: Program = {
    kind: NodeType.Program,
    code: [
        {
            kind: NodeType.BinaryExpr,
            left: { kind: NodeType.NumericLiteral, value: 10 } as NumericLiteral,
            right: { kind: NodeType.NumericLiteral, value: 5 } as NumericLiteral,
            operator: "+"
        } as BinaryExpr
    ]
}

const globalEnv = new Environment()

globalEnv.defineVar("null", { type: "null", value: "null" } as NullValue)
globalEnv.defineVar("true", { type: "boolean", value: true } as BooleanValue)
globalEnv.defineVar("false", { type: "boolean", value: false } as BooleanValue)

console.log(evaluate(ast.code[0]))