export enum TokenType {
    Let,
    Identifier,
    Equals,
    NumericLiteral
}

let core: Record<string, TokenType> = {
    "let": TokenType.Let
}

interface Token {
    type: TokenType
    value: string
}

export function ignore(str: string): boolean {
    return str === " " || str === "\t" || str === "\n" || str === "\r"
}

export function isint(code: string): boolean {
    let bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)]

    if (code.charCodeAt(0) >= bounds[0] && code.charCodeAt(0) <= bounds[1]) {
        return true
    }
    else if (code === ".") {
        return true
    }
    else return false
}

export function tokenize(code: string): Token[] {
    let chars = code.split("")
    let tokens: Token[] = []

    while (chars.length > 0) {
        if (ignore(chars[0])) {
            continue;
        }

        if (chars[0] === "=") {
            tokens.push({type: TokenType.Equals, value: chars.shift() as string})
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
                
            }
        }
    }

    return tokens
}