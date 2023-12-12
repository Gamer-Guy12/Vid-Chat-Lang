import { Expr, NodeType, Identifier } from "./IAST"
import { RuntimeVal } from "./Runtime"

export class Environment {
    private parent?: Environment
    private variables: Map<string, RuntimeVal>

    constructor (parent?: Environment) {
        this.parent = parent
        this.variables = new Map<string, RuntimeVal>()
    }

    defineVar(name: string, value: RuntimeVal): RuntimeVal {
        if (this.variables.has(name)) {
            throw "Variable already exists"
        }

        this.variables.set(name, value)
        
        return value
    }

    findVar(name: string): RuntimeVal {
        if (this.variables.has(name)) {
            return this.variables.get(name) as RuntimeVal
        }
        else {
            if (this.parent) {
                return this.parent.findVar(name)
            }
            else {
                throw "Variable does not exist"
            }
        }
    }

    setVar (name: Expr, value: RuntimeVal): RuntimeVal {

        if (name.kind === NodeType.Identifier) {

            let val = name as Identifier
            
            if (this.parent) {
                if (!this.variables.has(val.selector)) {
                    return this.parent.setVar(name, value)
                }
            }
            else {
                if (!this.variables.has(val.selector)) {
                    throw "This variable does not exist"
                }
            }

            if (this.variables.get(val.selector)?.constant === true) {
                throw "This variable is constant"
            }

            this.variables.set(val.selector, value)
        }

        return value
    }
}