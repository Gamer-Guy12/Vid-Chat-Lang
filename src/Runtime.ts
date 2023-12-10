export type ValueType = "null" | "number" | "boolean"

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