import { Environment } from "./Frontend/Environment";
import { BinaryExpr, NodeType, NumericLiteral, Program, Identifier, AssignmentExpr, VariableDecleration, StringLiteral, FunctionCallExpr, ReturnStmt, UnaryExpr, IfStmt, WhileStmt, ArrayDecleration, ArrayValExpr } from "./Frontend/IAST";
import { evaluate, runProgram } from "./Frontend/Run";
import { BooleanValue, NullValue, NumberValue } from "./Frontend/Runtime";
import { ast } from "./testast";

const globalEnv = new Environment()

globalEnv.defineVar("null", { type: "null", value: "null", constant: true } as NullValue)
globalEnv.defineVar("true", { type: "boolean", value: true, constant: true } as BooleanValue)
globalEnv.defineVar("false", { type: "boolean", value: false, constant: true } as BooleanValue)

runProgram(ast, globalEnv)