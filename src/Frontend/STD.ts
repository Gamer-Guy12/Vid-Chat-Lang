import { StringLiteral } from "./IAST"
import { NullValue, RuntimeVal, StringValue } from "./Runtime"

export class STDFunc {
    func: (params: Map<string, RuntimeVal>) => RuntimeVal
    params: string[]

    constructor (func: (params: Map<string, RuntimeVal>) => RuntimeVal, params: string[]) {
        this.func = func
        this.params = params
    }

    execute(params: Map<string, RuntimeVal>) {
        this.func(params)
    }
}

let STDs = new Map<string, STDFunc>()

STDs.set("println", new STDFunc((params: Map<string, RuntimeVal>) => {
    let param = params.get("val")
    if (param?.value === undefined)
        return { value:"null", type: "null" } as NullValue
    console.log(param.value)
    return { value: "null", type: "null" } as NullValue
}, ["val"]))

export { STDs }