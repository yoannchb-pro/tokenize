import Tokenizer from "../dist";

/**
 * Tokens for JSON
 */
const tokens = {
  STRING: /(")(?<content>(?:\\\1|.)*?)\1/,
  NUMBER: /\d+(?:\.\d+)?/,
  WHITE_SPACE: /\s+/,
  COMA: /,/,
  COLON: /:/,
  TRUE_BOOLEAN: /true/,
  FALSE_BOOLEAN: /false/,
  NULL: /null/,
  START_BRACKET: /\[/,
  END_BRACKET: /\]/,
  START_BRACE: /\{/,
  END_BRACE: /\}/,
} as const;
const tokenizer = new Tokenizer({
  tokens,
  callback: (tk, prevTk) => {
    switch (tk.type) {
      case "WHITE_SPACE":
        return null; // Remove white spaces
      case "UNKNOWN":
        throw new Error(
          `Invalide JSON: "${tk.value}"\nAt line: ${tk.startLine}, column: ${tk.startColumn}\nTo line: ${tk.endLine}, column: ${tk.endColumn}`
        );
    }
    return tk;
  },
});
const json = `{ "greeting": "Hello World !", "error": false, "note": 20, "bool": "false" }`;
const result = tokenizer.tokenize(json);
console.log(result);
