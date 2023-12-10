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

    setVar (name: string, value: RuntimeVal): RuntimeVal {
        if (!this.variables.has(name)) {
            throw "Variable does not exist"
        }

        if (this.variables.get(name)?.constant === true) {
            throw "This variable is constant"
        }

        this.variables.set(name, value)

        return value
    }
}