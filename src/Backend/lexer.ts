export enum TokenType {
    Let,
    Identifier,
    Equals,
    NumericLiteral,
    BinaryOperator
}

let core: Record<string, TokenType> = {
    "let": TokenType.Let
}

let schar: Record<string, TokenType> = {
    "=": TokenType.Equals,
    "+": TokenType.BinaryOperator,
    "*": TokenType.BinaryOperator,
    "/": TokenType.BinaryOperator,
    "-": TokenType.BinaryOperator,
    "%": TokenType.BinaryOperator,
    "^": TokenType.BinaryOperator
}

interface Token {
    type: TokenType
    value: string
}

export function ignore(str: string): boolean {
    return str === " " || str === "\t" || str === "\n" || str === "\r"
}

export function isint(code: string): boolean {
    if (code.search(/[a-zA-Z1-9\.]/) !== -1) {
        return true
    }
    else {
        return false
    }
}

export function isalpha(code: string): boolean {
    if (code.search(/[a-zA-Z]/) !== -1) {
        return true
    }
    else {
        return false
    }
}

export function tokenize(code: string): Token[] {
    let chars = code.split("")
    let tokens: Token[] = []

    while (chars.length > 0) {
        if (ignore(chars[0])) {
            continue;
        }

        if (schar[chars[0]] !== undefined) {
            tokens.push({type: schar[chars[0]], value: chars.shift() as string})
            continue
        }
        else {
            // Handle multichar token
            if (chars[0] === "-" || chars[0] === "+") {
                let num: string
                if (chars[0] === "-") {
                    num = chars.shift() as string
                }
                else {
                    num = ""
                }
                while (isint(chars[0])) {
                    num = num + chars.shift() as string
                }
                tokens.push({type: TokenType.NumericLiteral, value: num})
                continue
            }
            else {
                let str: string = ""
                while (isalpha(chars[0])) {
                    str = str + chars.shift() as string
                }
                if (core[str] !== undefined) {
                    tokens.push({type: core[str], value: str})
                    continue
                }
                else {
                    tokens.push({type: TokenType.Identifier, value: str})
                    continue
                }
            }
        }
    }

    return tokens
}