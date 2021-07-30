import nearley from "nearley"
import grammar from "./parser"

function parse(code: string): string {
    // const code = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(code);
    // console.log("parser:")
    // console.log(parser)
    if (parser.results.length > 1) {
        console.error("Error: ambigous grammar detected \n\n" + parser.results[0].join(""));
        // throw new Error("Error: ambigous grammar detected")
        return parser.results[0].join("")
        // for (let i = 0; i < parser.results.length; i++) {
        //     const ast = parser.results[i];
        //     return ast
        // }
    } else if (parser.results.length == 1) {
        const ast = parser.results[0].join("");
        // const outputFilename = filename.replace(".small", ".ast");
        // await fs.writeFile(outputFilename, JSON.stringify(ast, null, "  "));
        // console.log(`Wrote ${outputFilename}.`);
        return ast
    } else {
        console.log("Error: no parse found.");
        console.log("when no parse was found, parser was", parser)
        throw new Error("no parse found")
        return "Error: no parse found."
    }
}
export const runParser = (parserInput: string, context: Context = { bro: 10 }): string => {
    // console.log()
    try {
        const test =
            `${Object.keys(context).map(key => `{${key}=${context[key]}}`).join("\n")}
${parserInput}`
        console.log("test", test)
        const parsing = parse(test)
        // console.log("parsing:")
        // console.log(parsing)
        // const evalled = evalStatments(parsing)
        // console.log("evalled:")
        // console.log(evalled)
        return parsing
    } catch (e) {
        return e.toString();
    }
}
export type Context = {
    [name: string]: any;
}

export function runStatmentWithContext(statement: string, context: Context = { bruh: 10 }) {
    return runParser(`{${statement}}`, context).trim()
}