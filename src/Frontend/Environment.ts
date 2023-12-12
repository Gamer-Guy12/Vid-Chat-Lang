import { Expr, NodeType, Identifier, ArrayValExpr, ObjectValExpr } from "./IAST"
import { ArrayValue, ObjectValue, RuntimeVal } from "./Runtime"

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
            if (this.parent !== undefined) {
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
            
            if (this.parent !== undefined) {
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

        else if (name.kind === NodeType.ArrayValExpr) {

            let val = name as ArrayValExpr
            
            if (this.parent) {
                if (!this.variables.has(val.name)) {
                    return this.parent.setVar(name, value)
                }
            }
            else {
                if (!this.variables.has(val.name)) {
                    throw "This variable does not exist"
                }
            }

            if (this.variables.get(val.name)?.constant === true) {
                throw "This variable is constant"
            }

            let expr = name as ArrayValExpr
            let arr = this.findVar(expr.name)
            arr.value[expr.index] = value

            this.variables.set(expr.name, arr)
        }

        else if (name.kind === NodeType.ObjectValExpr) {

            let val = name as ObjectValExpr
            
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

            let obj = this.findVar(val.selector) as ObjectValue
            let set = false
            
            obj.value.forEach((value, index) => {
                if (value.key === val.element) {
                    obj.value[index] = value
                    set = true
                }
            })

            if (!set) {
                obj.value.push({key: val.selector, value})
            }

            this.variables.set(val.selector, obj)
        }

        return value
    }
}