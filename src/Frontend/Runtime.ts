export type ValueType = "null" | "number" | "boolean" | "string" | "array"

export interface RuntimeVal {
    type: ValueType,
    constant: boolean
}

export interface NullValue extends RuntimeVal {
    type: "null"
    value: "null"
}

export interface NumberValue extends RuntimeVal {
    type: "number"
    value: number
}

export interface BooleanValue extends RuntimeVal {
    type: "boolean"
    value: boolean
}

export interface StringValue extends RuntimeVal {
    type: "string",
    value: string
}

export interface ArrayValue extends RuntimeVal {
    type: "array",
    value: RuntimeVal[]
}