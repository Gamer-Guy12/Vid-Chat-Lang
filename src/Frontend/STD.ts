import { Environment } from "./Environment"
import { StringLiteral } from "./IAST"
import { evaluate } from "./Run"
import { FuncRefValue, NullValue, RuntimeVal, StringValue } from "./Runtime"

export class STDFunc {
    func: (params: Map<string, RuntimeVal>, env: Environment) => RuntimeVal
    params: string[]

    constructor (func: (params: Map<string, RuntimeVal>, env: Environment) => RuntimeVal, params: string[]) {
        this.func = func
        this.params = params
    }

    execute(params: Map<string, RuntimeVal>, env: Environment) {
        this.func(params, env)
    }
}

let STDs = new Map<string, STDFunc>()

STDs.set("println", new STDFunc((params: Map<string, RuntimeVal>) => {
    let param = params.get("val")
    
    console.log(param?.value)
    return { value: "null", type: "null" } as NullValue
}, ["val"]))

STDs.set("execute", new STDFunc((params: Map<string, RuntimeVal>, env: Environment) => {
    let param = params.get("func") as FuncRefValue

    return evaluate(param.value, env)
}, ["func"]))

export { STDs }