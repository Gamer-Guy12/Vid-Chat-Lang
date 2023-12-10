import { BinaryExpr, NodeType, NumericLiteral, Program } from "./IAST";
import { evaluate } from "./Run";

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

console.log(evaluate(ast.code[0]))